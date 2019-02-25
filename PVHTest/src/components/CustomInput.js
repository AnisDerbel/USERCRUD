import React from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types'
export default CustomInput =  ({ title, placeholder, attribute, value, onChangeText, keyboardType, autoCapitalize }) => {

    return (
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 16, color: '#1A1A1A', fontWeight: 'bold' }}>{ title }</Text>
        <TextInput
          underlineColorAndroid='transparent'
          placeholderTextColor="#8D8D8D"
          returnKeyType="done"
          placeholder={ placeholder }
          autoCorrect={false}
          autoCapitalize= { !!autoCapitalize ? autoCapitalize : 'sentences' }
          multiline
          numberOfLines={3}
          maxLength = {100}
          selectionColor={ '#1A1A1A' }
          keyboardType={ !!keyboardType ? keyboardType : 'default' }
          value={ value ? value : '' }
          enablesReturnKeyAutomatically={false}
          style={{ height: 40, backgroundColor: 'transparent', fontSize: 16, color: '#1A1A1A' }}
          onChangeText={(text) => onChangeText(text,attribute)}
        />
        <View style={{ height: 1, backgroundColor: '#ecf0f1' }} />
    </View>
    );
};


CustomInput.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  attribute: PropTypes.string,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
}


