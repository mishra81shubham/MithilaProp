import React,{} from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const InputText = ({
    keyboardType="",
    maxLength="",
    minLength="",
    onChangeText = () => { },
    value,
    placeholder="",
    inputStyle="inputBox",
    editable=true,
    autoCapitalize="",
}) => {
  return (
    <View>
      <TextInput
        keyboardType={keyboardType}
        maxLength={maxLength}
        minLength={minLength}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        style={[styles[inputStyle]]}
        editable={editable}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#B1B2B7" 
      />
    </View>
  )
}

export default InputText;

const styles = StyleSheet.create({
  inputBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    maxWidth: "100%",
    color:"#000",
  },
  EnterDetailsinputBox: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    fontSize: 17,
    maxWidth: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color:"#000",
  },
  searchinputFiled: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    fontSize: 17,
    maxWidth:"100%",
    minWidth:"100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color:"#000",
  },

})