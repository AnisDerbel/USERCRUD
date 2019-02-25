import React from 'react'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import { Icon } from 'native-base'
import Autolink from 'react-native-autolink';

const User = ({ item, onPress })=> (
  <TouchableOpacity key={ item.email } onPress={ onPress }>
    <View style={styles.buttonStyle}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
          <Icon type="Ionicons" name= {`ios-${item.gender}`} />
        </View>
          <Autolink
            key ={'email'}
            linkStyle ={{ fontSize: 16, textDecorationLine: 'underline', left: 5, margin:0, padding: 0 }}
            text= {item.email}
            phone ={ true }
            email = { true }
          />
      </View>
      <View>
        <Text numberOfLines={ 2 }>
          {item.address[0].number}, {item.address[0].street} {item.address[0].city}, {item.address[0].zipcode}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Icon type="Entypo" name="phone" style={{ fontSize : 15, top: 3  }}/>
          <Autolink
            key ={'phone'}
            linkStyle ={{ fontSize: 16, textDecorationLine: 'underline', left: 5 }}
            text= {item.phone}
            phone ={ true }
            email = { true }
          />
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

export default User


const styles = {
  buttonStyle: {
    height: 140,
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowOffset: { width: 1, height: 1, },
    shadowColor: 'gray',
    shadowOpacity: 0.2,
    elevation: 1,
    margin: 5
  }
};