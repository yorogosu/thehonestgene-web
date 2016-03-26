const effects = ReduxSaga.effects;

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const wrapper = {
  client: null,

  connect(url) {
    var wr = this;
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      const ws = new SockJS('http://127.0.0.1:15674/stomp');
      wr.client = Stomp.over(ws);
      wr.client.heartbeat.outgoing = 0;
      wr.client.heartbeat.incoming = 0;
      wr.client.connect('guest', 'guest', function() {
        resolve();
      }, function() {
        reject(new Error('could not connect'));
      }, '/');
    });
  },
  subscribe(id) {
    var wr = this;
    return {
      subscription: null,
      on(cb) {
        let headers = {id: id,durable: false,'auto-delete': true, exclusive: true,'x-expires': 86400000}; 
        let dest = '/queue/updates_' + id;
        this.subscription = wr.client.subscribe(dest, cb, headers);
      }
    };
  }
};

function* connectToStomp() {
  const action = yield take('GENOTYPE_UPLOAD_FINISHED');
  const msgSource = yield call(createSource, '/myurl');
  yield fork(watchMessages, msgSource)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText)
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function uploadGeno(file) {
  var data = new FormData();
  data.append('file', file);
  return fetch('/api/genotype',
    {method: 'POST', body: data}
  ).then(checkStatus)
    .then(parseJSON);
}

function startPrediction(id, trait) {
  return fetch('/api/riskprediction/' + id + '/' + trait,
    {method: 'POST'}
  ).then(checkStatus)
    .then(parseJSON);
}

function transferGenotypeFromProvider(provider, id, accessToken) {
  return fetch('/api/cloud/' + provider + '/genome/' + id,
    {method: 'POST', headers: {'ACCESS_TOKEN': accessToken}}
  ).then(checkStatus)
    .then(parseJSON);
}

function startImputation(id) {
  return fetch('/api/imputation?id=' + id,
    {method: 'POST'})
    .then(checkStatus)
    .then(parseJSON);
}

function startAncestry(id) {
  return fetch('/api/ancestry?id=' + id,
    {method: 'POST'})
    .then(checkStatus)
    .then(parseJSON);
}

function startRiskprediction(id) {
  return fetch('/api/riskprediction?id=' + id,
    {method: 'POST'})
    .then(checkStatus)
    .then(parseJSON);
}

function loadImputationData(taskid) {
  return fetch('/api/imputation?task_id=' + taskid+'&wait=1', {headers: headers})
    .then(checkStatus)
    .then(parseJSON);
}

function loadRiskData(taskid) {
  return fetch('/api/riskprediction?task_id=' + taskid+'&wait=1', {headers: headers})
    .then(checkStatus)
    .then(parseJSON);
}

function loadAncestryData(taskid) {
  return fetch('/api/ancestry?task_id=' + taskid+'&wait=1', {headers: headers})
    .then(checkStatus)
    .then(parseJSON);
}

function retrieveCloudGenotypes(provider, code) {
  return fetch('/api/cloud/' + provider + '/token', {method: 'POST', headers: {CODE: code}})
    .then(checkStatus)
    .then(parseJSON);
}

function loadTraits() {
  return fetch('/api/traits', {headers: headers}).then(checkStatus).then(parseJSON);
}

function loadAvailableProviders() {
  return fetch('/api/cloud', {headers: headers}).then(checkStatus).then(parseJSON);
}

function loadAvailableTraits() {
  return fetch('/api/traits', {headers: headers}).then(checkStatus).then(parseJSON);
}

function* uploadGenotype(action) {
  try {
    yield effects.put(startGenotypeUpload());
    const response = yield effects.call(uploadGeno, action.file);
    yield effects.put(uploadGenotypeFinished(response.genotype, response.data));
  } catch (error) {
    console.log(error);
    yield effects.put(genotypeUploadFailed(error));
  }
}

function* watchUploadGenotype() {
  yield* ReduxSaga.takeEvery('UPLOAD_GENOTYPE', uploadGenotype);
}

function* monitorStompEvents(channel) {
  while (true) {
    const message = yield effects.call(channel.take);
    var body = JSON.parse(message.body);
    switch (body.state) {
      case 'FINISHED':
        yield effects.put(analysisFinished(body));
        break;
      case 'ERROR':
        yield effects.put(analysisFailed(body));
      default:
        yield effects.put(messageReceived(body));
    }
  }
}

function* watchWebSocket() {
  while (true) {
    const action = yield effects.take('GENOTYPE_UPLOAD_FINISHED');
    try {
      yield effects.apply(wrapper, wrapper.connect);
      const subscription = wrapper.subscribe(action.id);
      if (subscription) {
        yield effects.put(startAnalysis('imputation'));
        yield effects.call(monitorStompEvents, createStompChannel(subscription))
      }
    }
    catch (error) {
      console.log(error);
      yield effects.put(subscribeToUpdatesFailed(error));
    }
  }
}

function* startRetrieveAnalysisData(analysisType,body) {
    const id = yield effects.select(getTaskId, analysisType, body.data);
    var loadDataFunc = null;
    switch (analysisType) {
      case 'imputation':
        loadDataFunc = loadImputationData;
        break;
      case 'ancestry':
        loadDataFunc = loadAncestryData;
        break;
      case 'riskprediction':
        loadDataFunc = loadRiskData;
        break;
      default:
        loadDataFunc = null;
    }
    if (loadDataFunc !== null) {
      try {
        const response = yield effects.call(loadDataFunc, id);
        if (response.state != 'SUCCESS') {
          throw new Error(analysisType + ' failed');
        }
        yield effects.put(displayAnalysisData(analysisType, response.data));
        if (analysisType == 'imputation') {
          yield effects.put(startAnalysis('ancestry'));
        }
        else if (analysisType == 'ancestry') {
          const response = yield effects.call(loadTraits)
          yield effects.put(displayTraitsData(response));
        }
      }
      catch (error) {
        yield effects.put(loadAnalysisDataFailed(analysisType, error));
      }
    }
}

function* watchAnalysisDataReturned() {
    
}

function* watchFinishAnalysis() {
  while (true) {
    const {analysisType, body} = yield effects.take('RUN_ANALYSIS_FINISHED');
    yield effects.fork(startRetrieveAnalysisData,analysisType,body);
  }
}

function* watchRetrieveOAuthToken() {
  while (true) {
    const {provider, code} = yield effects.take('RETRIEVE_CLOUD_GENOTYPES');
    const response = yield effects.call(retrieveCloudGenotypes, provider, code);
    yield effects.put(displayCloudGenotypes(provider, response.access_token, response.refresh_token, code, response.genotypes));
  }
}

function* watchStartAnalysis() {
  while (true) {
    const action = yield effects.take('RUN_ANALYSIS');
    const id = yield effects.select(getGenotypeId);
    var analysisFunc = null;
    switch (action.analysisType) {
      case 'imputation':
        analysisFunc = startImputation;
        break;
      case 'ancestry':
        analysisFunc = startAncestry;
        break;
      case 'riskprediction':
        analysisFunc = startRiskprediction;
        break;
      default:
        analysisFunc = null;
    }
    if (analysisFunc !== null) {
      try {
        const response = yield effects.call(analysisFunc, id);
        yield effects.put(analysisStarted(response.id, action.analysisType));
      }
      catch (error) {
        yield effects.put(analysisFailed({error: error, analysisType: action.analysisType}));
      }
    }
  }
}

function* watchStartPrediction() {
  while (true) {
    const {traits} = yield effects.take('START_PREDICTION');
    const id = yield effects.select(getGenotypeId);
    for (let i = 0; i < traits.length; i++) {
      let trait = traits[i];
      try {
        const response = yield effects.call(startPrediction, id, trait);
        yield effects.put(analysisStarted(response.id, 'riskprediction', trait));
      }
      catch (error) {
        console.log(error);
        yield effects.put(analysisFailed({error: error, analysisType: 'riskprediction', trait: trait}));
      }
    }
  }
}

function* watchTransferGentoypeFromProvider() {
  while (true) {
    const {provider, id} = yield effects.take('TRANSFER_GENOTYPE_FROM_PROVIDER');
    try {
      const accessToken = yield effects.select(getAccessToken, provider);
      yield effects.put(startGenotypeUpload());
      const response = yield effects.call(transferGenotypeFromProvider, provider, id, accessToken);
      yield effects.put(uploadGenotypeFinished(response.genotype, response.data));
    } catch (error) {
      console.log(error);
      yield effects.put(genotypeUploadFailed(error));
    }
  }
}

function* watchLoadAvailableProviders() {
  const response = yield effects.call(loadAvailableProviders);
  yield effects.put(saveAailableProviders(response));
}

function* watchLoadAvailableTraits() {
  const response = yield effects.call(loadAvailableTraits);
  yield effects.put(saveAvailableTraits(response));
}

function createStompChannel(subscription) {
  const channel = createChannel();
  // every change event will call put on the channel
  subscription.on(channel.put);
  return channel;
}

function* rootSaga() {
   yield [
    effects.fork(watchUploadGenotype),
    effects.fork(watchWebSocket),
    effects.fork(watchFinishAnalysis),
    effects.fork(watchStartAnalysis),
    effects.fork(watchLoadAvailableProviders),
    effects.fork(watchRetrieveOAuthToken),
    effects.fork(watchTransferGentoypeFromProvider),
    effects.fork(watchLoadAvailableTraits),
    effects.fork(watchStartPrediction),
  ];
}