import React, { Component } from 'react'
import {
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native'
import User from '../components/User'
import * as UserActions from '../actions/userActions'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
class Users extends Component {

  componentDidMount = () => {

    this.props.getUserList().then(()=>{
    }).catch((e)=>{
      alert(e.message)
    })

  }
  
  _keyExtractor = (item) => item.id


  renderUser = ({ item }) => (
    <User
      key = { item.email }
      item = { item }
      onPress ={()=> Actions.userDetails({ user: item })}
    />
  )
  render(){
    return (
      <SafeAreaView style={{ paddingHorizontal : 10 }}>
        {
          this.props.users.length > 0 ?
          <FlatList
            data={ this.props.users }
            renderItem={ this.renderUser }
            key={ 'userList' }
            keyExtractor={ this._keyExtractor }
          /> 
          :  <Text style={{ margin: 10, textAlign: 'center' }}>No Record Found!</Text>
        }
      </SafeAreaView>
    )
  }
}

mapStateToProps = (state)=> ({
  users: state.userReducer.users
})
export default connect(mapStateToProps,UserActions)(Users)