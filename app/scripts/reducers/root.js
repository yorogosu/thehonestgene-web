const steps = ['genotype','imputation','ancestry','predictions'];

var genotypeSubStep = function(state, action) {
    state = state || 'list';
    switch (action.type) {
        case 'CHANGE_UPLOAD_PAGE':
            return action.page;
        case 'GENOTYPE_UPLOAD_STARTED':
        case 'GENOTYPE_UPLOAD_FINISHED':
            return 'info';
        default:
            return state;
    }
};



var currentStep = function(state, action) {
    state = state || 'genotype';
    switch (action.type) {
        case 'CHANGE_CURRENT_STEP':
            return action.step;
        case 'CHANGE_STEP':
           var currentIndex = steps.indexOf(state);
           if ((currentIndex == 0 && action.backward) || (currentIndex == 4 && !action.backward))
              return state;
           return steps[action.backward ? --currentIndex : ++currentIndex];
            
        default:
            return state;
    }
};

var genotypeFile = function(state, action) {
    state = state || null;
    switch (action.type) {
        case 'SELECT_FILE_TO_UPLOAD':
            return action.file;
        default:
            return state;
    }
};


var fileUpload =  Redux.combineReducers({
    genotypeFile: genotypeFile,
});


var displayGenotypeData = function(state,action) {
    state = state || null;
    switch (action.type) {
        case 'GENOTYPE_UPLOAD_FINISHED':
            return action.data;
        default: 
          return state;
    }
}

var availableProviders = function(state,action) {
    state = state || [];
    switch (action.type) {
        case 'LOAD_AVAILABLE_PROVIDERS':
            return action.data;
        default:
            return state;
    }
}

var selectedProviders = function(state,action) {
    state = state || {};
    switch (action.type) {
        case 'RETRIEVE_CLOUD_GENOTYPES':
            var provider = action.provider;
            state = {};
            state[provider] = {code:action.code};
            return state;
        case 'DISPLAY_CLOUD_GENOTYPES':
            state = Object.assign({},state);
            var provider = action.provider;
            state[provider] = {};
            state[provider].code = action.code;
            state[provider].accessToken = action.accessToken;
            state[provider].refreshToken = action.refreshToken;
            state[provider].genotypes = action.genotypes;
            return state;
        default:
          return state;
    }
}

var currentProvider = function(state,action) {
    state = state || null;
    switch (action.type) {
        case 'SELECT_PROVIDER':
        case 'DISPLAY_CLOUD_GENOTYPES':
            return action.provider;
        default:
            return state;
    }
}

var cloudUpload = Redux.combineReducers({
    availableProviders: availableProviders,
    selectedProviders: selectedProviders,
    currentProvider: currentProvider  
});


var uploadState = function(state, action) {
    state = state || {state:null,progress:0,error:null,genotypeId:null}
    switch (action.type ){
       case 'GENOTYPE_UPLOAD_FINISHED':
           return {state:'FINISHED',progress:100,error:null,genotypeId:action.id}
       case 'GENOTYPE_UPLOAD_STARTED':
           return {state:'UPLOADING',progress:1,error:null,genotypeId:null}
       case 'GENOTYPE_UPLOAD_FAILED':
           return {state:'ERROR',progress:1,error:action.error.message,genotypeId:null}
       default:
           return state;
    }
}



var genotypeStep = Redux.combineReducers({
    step:genotypeSubStep,
    fileUpload: fileUpload,
    cloudUpload: cloudUpload,
    uploadState: uploadState,
    data: displayGenotypeData
});

var predictionData = function(state,action) {
    switch (action.type) {
        case 'DISPLAY_PREDICTION_DATA':
            return action.data;
        default:
            return state;
    }
}

var imputationData = function(state, action) {
    switch (action.type) {
        case 'DISPLAY_IMPUTATION_DATA':
            return action.data;
        default:
            return state;
    }
};

var runAnalysis = function(state, action, analysisType) {
    switch (action.type) {
        case 'RUN_ANALYSIS_STARTED':
            if (analysisType == action.analysisType) {
                return action.taskId;
            }
        default:
            return state;
    }
};

var ancestryData = function(state, action) {
    switch (action.type) {
        case 'DISPLAY_ANCESTRY_DATA':
            return action.data;
        default:
            return state;
    }
};

var riskpredictionData = function(state, action) {
    switch (action.type) {
        case 'DISPLAY_PREDICTION_DATA':
            return action.data;
        default:
            return state;
    }
};

var imputationStep = function(state, action) {
    return analysis(state, action, imputationData, 'imputation');
};

var ancestryStep = function(state, action) {
    return analysis(state, action, ancestryData, 'ancestry');
};


var traitData = function(state,action) {
    switch (action.type) {
        case 'LOAD_TRAITS_DATA':
          return action.traits;
        default:
          return state;
    }
}

var traitLoaded  = function(state,action) {
    switch (action.type) {
         case 'LOAD_TRAITS_DATA':
          return true;
        default:
          return state;
    }
}

var selectedTraits = function(state,action) {
    switch (action.type) {
        case 'SELECT_TRAIT':
            state = Object.assign({},state);
            if (action.isChecked) {
                state[action.name] = {};
            }
            else {
                delete state[action.name];
            }
            return state;
        case 'START_PREDICTION':
            state = Object.assign({},state);
            for (let i=0;i<action.traits.length;i++) {
                let trait = action.traits[i];
                delete state[trait]; 
            }
            return state;
        case 'RUN_ANALYSIS_STARTED':
            if (action.analysisType === 'riskprediction') { 
                state = Object.assign({},state);
                if (action.trait in state) {
                    delete state[action.trait];
                }
            }
            return state;
        default:
            return state;
            
    }
}

var runningSingleAnalysis = function(state,action) {
    
}

var runningAnalysis= function(state,action) {
    if ((action.analysisType && action.analysisType === 'riskprediction') || action.type === 'DISPLAY_PREDICTION_DATA' ) {
        state = Object.assign({},state);
        state[action.trait] = analysis(state[action.trait],action,predictionData,action.analysisType);
    }
    return state;
}


var riskPredictionStep = function(state, action) {
    state = state || { traits:null,isTraitLoaded:false,selectedTraits: {},runningAnalysis: {}};
    return {
        traits:traitData(state.traits,action),
        isTraitLoaded:traitLoaded(state.isTraitLoaded,action),
        selectedTraits: selectedTraits(state.selectedTraits,action),
        runningAnalysis: runningAnalysis(state.runningAnalysis,action),
    }
};

var analysis = function(state, action, dataReducer, analysisType) {
    state = state || { state: null, data: null, taskId: null };
    return {
        state: messageReducer(state.state, action, analysisType),
        data: dataReducer(state.data, action),
        taskId: runAnalysis(state.taskId, action, analysisType)
    }
}

var messageReducer = function(state, action, analysisType) {
    state = state || { state: null, progress: null, task: null, analysisType: analysisType }
    switch (action.type) {
        case 'MESSAGE_RECEIVED':
            if (analysisType == action.analysisType) {
                return action.body;
            }
            return state;
        case 'RUN_ANALYSIS_FINISHED':
            if (analysisType == action.analysisType) {
                return { state: 'FINISHED', progress: 100, task: "Finished", analysisType: analysisType };
            }
            return state;
        case 'RUN_ANALYSIS_FAILED':
            if (analysisType == action.analysisType) {
                return { state: 'ERROR', progress: 0, task: "Failed", analysisType: analysisType,error:action.error };
            }
        default:
            return state;
    }
};

var rootReducer = Redux.combineReducers({
    currentStep: currentStep,
    genotypeStep: genotypeStep,
    imputationStep: imputationStep,
    ancestryStep: ancestryStep,
    riskPredictionStep: riskPredictionStep
});