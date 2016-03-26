
const createSagaMiddleware = ReduxSaga.default

var store = Redux.createStore(rootReducer,
    Redux.compose(
        Redux.applyMiddleware(createSagaMiddleware(rootSaga)),
        window.devToolsExtension ? window.devToolsExtension() : f => f));
        
var ReduxBehavior = new PolymerRedux(store);