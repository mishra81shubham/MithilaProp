import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const Button = (props) => {
  const { handleSubmit } = props;
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity disabled={props.disabled} style={[styles[props.titleStyle]]} onPress={handleSubmit}>
        <Text style={[styles[props.titleTextStyle]]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  AbsoluteBottomBtn: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    borderRadius:5,
  },
  withoutBottomBtnWithColor: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fbc531',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    borderRadius:5,
  },
  textBtn: {
    color: "#fff",
    padding: 6,
    fontSize: 15,
    fontWeight: "600",
  }, 
  ordertextBtn: {
    color: "#6E12F9",
    padding: 6,
    fontSize: 15,
    fontWeight: "600",
  },

  withoutBottomBtn: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    height: 55,
    borderRadius: 5,
    marginBottom: 20,
  },
  
  withouttextBtn: {
    color: "#fff",
    padding: 6,
    fontSize: 15,
    fontWeight: "600",
    borderRadius: 5,
  },
  textBtnClick: {
    color: "#6E12F9",
    padding: 6,
    fontSize: 15,
    fontWeight: "600",
    borderRadius: 5,
  },
  enterDetailsBtn: {
    marginTop: "40%",
    alignItems: 'center',
    backgroundColor: '#6E12F9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    borderRadius: 5,
  },
  permissionDetails: {
    marginTop: "10%",
    alignItems: 'center',
    backgroundColor: '#6E12F9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
  },
  busnessTypeBtn: {
    marginTop: "13%",
    alignItems: 'center',
    backgroundColor: '#6E12F9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    borderRadius: 5,
  },
  busnessTypeBtnDisable: {
    marginTop: "13%",
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    borderRadius: 5,
  }, 
  orderBrandType: {
    marginTop: "13%",
    alignItems: 'center',
    borderWidth:1,
    borderColor:"#6E12F9",
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    borderRadius: 5,
  },
  viewQuotationbtn: {
    marginTop: "13%",
    alignItems: 'center',
    borderWidth:1,
    borderColor:"#6E12F9",
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 240,
    borderRadius: 5,
  },

  busnessTypeBtnUpload: {
    marginTop: "10%",
    alignItems: 'center',
    backgroundColor: '#6E12F9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    borderRadius: 5,
  },
  uploadFileBtn: {
    backgroundColor: "#6E12F9",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
    maxWidth: 150,
  },
  uploadImageBtn: {
    backgroundColor: "#6E12F9",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    textAlign: "center",
  },
  uploadImageClickBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    textAlign: "center",
    borderWidth:1,
    borderColor:"#6E12F9",
  },
  uploadImageBtnTake: {
    backgroundColor: "#6E12F9",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    textAlign: "center",
  },
  alartbtnOk:{
    backgroundColor: "#6E12F9",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    textAlign: "center",
  },

  // postionAbsoluteBtnBottom:{

  //   alignItems: 'center',
  //   backgroundColor: '#6E12F9',
  //   paddingVertical: 10,
  //   paddingHorizontal: 16,
  //   width:"100%",
  //   borderRadius:5,
  //   position:"absolute",
  //   bottom:-10,

  // },

})