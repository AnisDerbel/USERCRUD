/**
 * Created by anisderbel on 26/08/2017.
 */
import { createStore, applyMiddleware } from 'redux'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { AsyncStorage } from 'react-native'
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from './sagas';

let sagaMiddleware = createSagaMiddleware();
let middleware = [thunk, promise,sagaMiddleware];

if(__DEV__){
    middleware.push(createLogger())
}


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};


const persistedReducer = persistReducer(persistConfig, appReducer);

    const  store = createStore(
    persistedReducer,
    undefined,
    composeWithDevTools(applyMiddleware(...middleware))
    );

    sagaMiddleware.run(rootSaga);

    const  persistor  = persistStore(store);
    //persistor.purge()

 export  { store, persistor }
