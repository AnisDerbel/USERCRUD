
import React, { Component } from 'react';

import { Provider, connect } from 'react-redux';
import {  Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { Routes } from './routes'

const ConnectedRouter = connect()(Router);

export default class App extends Component {

    render(){
        return (
            <Provider store={ store }>
                <PersistGate persistor={ persistor }>
                    <ConnectedRouter scenes={ Routes }/>
                </PersistGate>
            </Provider>
        );
    }
}