

initialState = undefined;

const createSagaMiddleware = ReduxSaga.default

var store = Redux.createStore(rootReducer,initialState,
    Redux.compose(
        Redux.applyMiddleware(createSagaMiddleware(rootSaga)),
        window.devToolsExtension ? window.devToolsExtension() : f => f));

     