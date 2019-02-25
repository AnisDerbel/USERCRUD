import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import UsersScreen from './screens/Users';
import UserDetailsScreen from './screens/UserDetails';

export const Routes = Actions.create(
  <Scene key='root'>
    <Scene  component={ UsersScreen }  initial={ true } title="Users"  key="users" onRight={()=> Actions.userDetails()} rightTitle={'New User'}/>
    <Scene  component={ UserDetailsScreen } title="User Details"  key="userDetails"/>
  </Scene> 
);