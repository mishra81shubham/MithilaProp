import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, ActivityIndicator, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import Button from '../common/Button';
import InputText from '../common/InputText';
import { postData } from '../common/common';
import Loader from '../common/Loader';
import TopMessage from '../common/TopMessage';
// const Navigation = NativeModules.NavigationModule;
const MobileNumber = (props) => {
  const [enableBtn, setEnableBtn] = React.useState(false);
  const [onLoadingBtn, setOnLoadingBtn] = React.useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState({
    message: "",
    messageType: "error",
  });
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: async () => {
      
      return ;
    }
  });

  const hideMessageHandler = () => {
    setShowMessage(false);
  };

  const onSubmit = async (data) => {
    props.navigation.navigate("OtpScreen");
    // setOnLoadingBtn(true);
    // let res = await postData('sendOtp', data);
    // // console.log("error msg---",res)
    // setOnLoadingBtn(false);
    // if (res.statusCode == 200) {
    //   await setStorageValue("registerInfo", JSON.stringify(data));
    //   props.navigation.navigate("EnterOtp");
    // }
    // else {
    //   setShowMessage(true);
    //   setMessage({
    //     message: res?.errors?.msg || "Please check all mandatory fields",
    //     messageType: "error",
    //   });
    // }
  };
  return (
    <View style={{ backgroundColor: "#fff"}}>
      {onLoadingBtn ? <Loader/> : ""}
      {showMessage && message.message && (
        <TopMessage
          message={message.message}
          messageType={message.messageType}
          onClose={hideMessageHandler}
          autoClose={true}
        />
      )}

      <View style={styles.loginContainer}>
        <Image
          source={require('../assets/mobileNumber.jpg')}
          style={styles.loaderGif}
        />
        <View >
          <Text style={styles.labelInput}>Enter your Mobile Number</Text>
          <View style={styles.inputBoxNumber}>
            <Text style={styles.inputnine}>+91</Text>
            <Text style={styles.inputninePipe}>|</Text>
            <Controller
              control={control}
              name="mobileNumber"
              rules={{
                required: "Please Enter Mobile Number"
              }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="Enter 10 Digit Mobile Number"
                  inputStyle="inputBox"
                  keyboardType='numeric'
                  autoCapitalize=''
                  maxLength={10}
                  minLength={10}
                  onChangeText={(value) => {
                    if (value.length == 10) {
                      setEnableBtn(true);
                    }
                    else {
                      setEnableBtn(false);
                    }
                    onChange(value);
                  }}
                  value={value}
                />
              )}
            />
          </View>
          {errors.mobileNumber && (
            <Text style={{ color: "red" }}>{errors.mobileNumber?.message}</Text>
          )}
        </View>
        <View style={styles.loginButonMsng}>
         <Button
              disabled={enableBtn ? false : true}
              title="Continue"
              titleStyle={enableBtn ? "withoutBottomBtnWithColor" : "AbsoluteBottomBtn"}
              titleTextStyle="textBtn"
              handleSubmit={handleSubmit(onSubmit)}
            />
          <Text style={{ paddingHorizontal: 22, fontWeight: "600", fontSize: 10, marginTop: 10, color:"#44465B", }}>By logging in you agree to our Terms of use and Privacy policy.</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "100%",
  },
  loaderGif: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  labelInput: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
    color:"#44465B",
  },
  inputBoxNumber: {
    position: "relative",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 300,
  },
  inputnine: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: "600",
    color:"#44465B",
  },
  inputninePipe: {
    fontSize: 25,
    color: "#ccc",
    marginLeft: 5,
    marginTop: -5,
  },
  loginButonMsng: {
    position: "absolute",
    bottom: 15,
  },
  inputBox: {
    marginVertical: 12,
    width: 300,
  },
})

export default MobileNumber;