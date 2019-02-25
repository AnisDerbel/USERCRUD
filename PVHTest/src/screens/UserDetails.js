import React, { Component } from 'react'
import {
  View,
  Text,
  Alert
} from 'react-native'
import {
  Container,
  Content,
  Icon,
  Button,
  Footer,
  Segment
} from 'native-base'
import CustomInput from '../components/CustomInput'
import Accordion from 'react-native-collapsible/Accordion';
import { validateInput } from '../utils'
import * as UserActions from '../actions/userActions'
import { connect } from 'react-redux'
import {  Actions } from 'react-native-router-flux';


class UserDetails extends Component {

  state = {
    userInput : !!this.props.user ? this.props.user : {} ,
    activeSections: [],
    userAddress: !!this.props.user ? this.props.user.address : [{}],
  }

  onDeleteAddress = (index) => {
    let { userAddress } = this.state
    userAddress.splice(index,1)
    this.setState({ userAddress })
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
  }

  onAddNewAddress = () => {
    let { userAddress } = this.state
    userAddress.push({})
    this.setState({ userAddress })
  }

  onChangeText = (value, key, inputKey) => {
    this.setState({
      [inputKey]: {
        ...this.state[inputKey],
        [key]: value
      }
    })
  }

  onChangeAddress = (index, key, value ) => {
    let userAddress = this.state.userAddress
    userAddress[index][key] = value
    this.setState({ userAddress })
  }

  _renderSectionTitle = section => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = (section, index, isActive) => {
    return (
      <View style={{ height: 60 , borderBottomColor: '#dedede', borderBottomWidth: 1, flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
        <View style={{ width: '80%' }}>
          <Text style={{ justifyContent:'center', marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>{'Address '}{index+1}</Text>
          <Text style={{  }} numberOfLines={ 1 }>{ section.street}</Text>
        </View>
        <View style={{ flexDirection: 'row', top: 15 }}>
          { index > 0 && <Icon onPress ={ ()=> this.onDeleteAddress(index)} type='EvilIcons' name='trash' style={{ color : 'red' }} /> }
          <Icon name={ isActive ? 'chevron-up' : 'chevron-down'} type='EvilIcons'/>
        </View>
      </View>
    );
  };

  _renderContent = (section, index) => {
    return (
      <View>
        <CustomInput
          title='House Number'
          value={section.number && section.number+''}
          attribute="number"
          placeholder={'Ex 7'}
          keyboardType='numeric'
          onChangeText={(text, key) => this.onChangeAddress(index, key, text)}
        />
        <CustomInput
          title='ZipCode'
          value={section.zipcode}
          attribute="zipcode"
          placeholder={'Ex 1234 AB'}
          onChangeText={(text, key) => this.onChangeAddress(index, key, text)}
        />
        <CustomInput
          title='Street'
          value={section.street}
          attribute="street"
          placeholder={'Ex 7'}
          keyboardType='numeric'
          onChangeText={(text, key) => this.onChangeAddress(index, key, text)}
        />
        <CustomInput
          title='City'
          value={section.city}
          attribute="city"
          placeholder={'Ex Amsterdam'}
          onChangeText={(text, key) => this.onChangeAddress(index, key, text)}
        />
      </View>
    );
  };

  onSaveUser = () => {
    const { userInput, userAddress} = this.state
    const error = validateInput(userInput, userAddress)
    if(!error){
      userInput.address = [...userAddress]
      if(this.props.user){
        //edit user
        this.props.editUser(userInput).then((res)=>{
          alert('User saved successfully')
        }).catch((e)=>{
          alert(e.message)
        })
      }else{
        //new user
        this.props.addUser(userInput).then((res)=>{
          alert('User added successfully')
          Actions.pop()
        }).catch((e)=>{
          alert(e.message)
        })
      }
    }else{
      alert(error)
    }
  }

  onDeleteUser = ()=> {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete the user ${this.state.userInput.name} ?`,
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {text: 'YES', onPress: () => {
          this.props.deleteUser(this.props.user.id).then((res)=>{
            alert('User deleted!')
            Actions.pop()
          }).catch((e)=>{
            alert(e.message)
          })
         
        }},
      ],
      {cancelable: false},
    );
  }

  render(){

    const { userInput, userAddress } = this.state
    console.log(userInput)
    return (
      <Container>
        <Content style={{ paddingHorizontal: 20 }}>
        <CustomInput
          title='Full Name'
          value={userInput.name}
          attribute="name"
          placeholder={'Ex Tommy Hilfiger'}
          onChangeText={(text, key) => this.onChangeText(text, key, 'userInput')}
        />
        <CustomInput
          title='Email'
          value={userInput.email}
          attribute="email"
          autoCapitalize = 'none'
          placeholder={'Ex test@pvh.com'}
          keyboardType='email-address'
          onChangeText={(text, key) => this.onChangeText(text, key, 'userInput')}
        />
        <CustomInput
          title='Phone'
          value={userInput.phone}
          attribute="phone"
          placeholder={'Ex 012345678'}
          keyboardType='numeric'
          onChangeText={(text, key) => this.onChangeText(text, key, 'userInput')}
        />
          <Segment>
              <Button onPress ={()=> this.onChangeText('male', 'gender', 'userInput')} style={{ width: 100 }} first active = { userInput.gender === 'male' }>
                <Text style={{ flex: 1, textAlign: 'center', color:  userInput.gender === 'male' ? '#fff' : '#333' }}>Male</Text>
              </Button>
              <Button onPress ={()=> this.onChangeText('female', 'gender', 'userInput')} style={{ width: 100 }} last active = { userInput.gender === 'female' }>
                <Text style={{ flex: 1, textAlign: 'center', color:  userInput.gender === 'female' ? '#fff' : '#333'  }}>Female</Text>
              </Button>
            </Segment>
         <Accordion
          sections={ userAddress }
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
        <Button style={{ marginTop: 10 }} onPress={ ()=> this.onAddNewAddress()}>
          <Text style={{ color: '#fff', paddingHorizontal: 5 }}>Add New Address</Text>
        </Button>
        </Content>
        <Footer>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', top: 5 }}>
            <Button onPress ={()=> this.onSaveUser()} style={{ flex: 1, alignItems:'center', marginHorizontal: 10 }}>
              <Text style={{ color: '#fff', textAlign: 'center', flex:1 }}>Save</Text>
            </Button>
            { !!this.props.user && 
              <Button onPress ={()=> this.onDeleteUser()} style={{ flex: 1, alignItems:'center', marginHorizontal: 10, backgroundColor: 'red' }}>
                <Text style={{ color: '#fff', textAlign: 'center', flex:1 }}>Delete</Text>
              </Button>
            }
          </View>
        </Footer>
      </Container>
    )
  }
}

export default connect(null, UserActions)(UserDetails)