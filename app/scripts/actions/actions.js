const loadAnalysisData = function(analysisType) {
    return {
        type: type
    }
}

const startGenotypeUpload = function() {
    return {
        type: 'GENOTYPE_UPLOAD_STARTED'
    }
}

const uploadGenotypeFinished = function(id,data) {
    return { type: "GENOTYPE_UPLOAD_FINISHED", id: id,data:data }
}

const genotypeUploadFailed = function(error) {
    return { type: "GENOTYPE_UPLOAD_FAILED", error }
}

const startAnalysis = function(analysisType) {
    return {
        type: 'RUN_ANALYSIS',
        analysisType: analysisType
    }
}

const displayTraitsData = function(traits) {
    return {
        type: 'LOAD_TRAITS_DATA',
        traits: traits
    }
}

const changeStep = function(backward) {
    backward = backward || false;
    return {
        type: 'CHANGE_STEP',
        backward: backward
    }
}

const saveAailableProviders = function(data) {
    return {
        type:'LOAD_AVAILABLE_PROVIDERS',
        data:data
    }
}

const saveAvailableTraits = function(traits) {
    return {
        type: 'LOAD_TRAITS_DATA',
        traits: traits
    }
}

const displayCloudGenotypes = function(provider,accessToken,refreshToken,code,genotypes) {
    return {
        type:'DISPLAY_CLOUD_GENOTYPES',
        provider:provider,
        accessToken:accessToken,
        refreshToken: refreshToken,
        code:code,
        genotypes:genotypes,
    }
}

const loadAnalysisDataFailed = function(analysisType, error) {
    var type;
    switch (analysisType) {
        case 'imputation':
            type = 'LOAD_IMPUTATION_DATA_FAILED';
            break;
        case 'ancestry':
            type = 'LOAD_ANCESTRY_DATA_FAILED';
            break;
        case 'riskprediction':
            type = 'LOAD_PREDICTION_DATA_FAILED';
            break;
        default:
            type = null;
    }
    return {
        type: type,
        error: error
    }
}

const subscribeToUpdatesFailed = function(error) {
    return { type: "SUBSCRIBE_UPDATES_FAILED", error }
}

const analysisFailed = function(body) {
    return { type: 'RUN_ANALYSIS_FAILED', body: body, analysisType:body.analysisType,trait:body.data }
}

const messageReceived = function(body) {
    return {
        type: 'MESSAGE_RECEIVED',
        body: body,
        analysisType:body.analysisType,
        trait: body.data,
    }
}

const analysisStarted = function(taskId, analysisType,trait) {
    return { type: "RUN_ANALYSIS_STARTED", taskId: taskId, analysisType: analysisType,trait:trait }
}

const analysisFinished = function(body) {
    return { type: 'RUN_ANALYSIS_FINISHED',body:body,analysisType:body.analysisType,trait:body.data};
}

const displayAnalysisData = function(analysisType, data) {
    var type;
    var trait;
    switch (analysisType) {
        case 'imputation':
            type = 'DISPLAY_IMPUTATION_DATA';
            break;
        case 'ancestry':
            type = 'DISPLAY_ANCESTRY_DATA';
            break;
        case 'riskprediction':
            type = 'DISPLAY_PREDICTION_DATA';
            trait = data.trait;
            break;
        default:
            type = null;
    }
    return {
        type: type,
        data: data,
        trait: trait
    }
}