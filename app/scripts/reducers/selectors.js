const getTaskId = (state,analysisType,trait) => {
    switch (analysisType) {
        case 'imputation':
          return state.imputationStep.taskId;
        case 'ancestry':
          return state.ancestryStep.taskId;
        case 'riskprediction':
          try {
            return state.riskPredictionStep.runningAnalysis[trait].taskId;
          }catch (Error) {
               console.log('Trait not found');
          } 
          return null;
        default: throw Error('Analysis ' + analysisType + ' unknown');
    }
}
const getGenotypeId = (state) => state.genotypeStep.uploadState.genotypeId;


const getAccessToken = (state,provider) => state.genotypeStep.cloudUpload.selectedProviders[provider].accessToken;