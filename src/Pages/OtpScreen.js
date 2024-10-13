import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Text, Modal, TextInput, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputText from '../common/InputText';
import { useForm, Controller } from "react-hook-form";
import Button from '../common/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SCREEN_WIDTH } from '../../constant';
import { postData } from '../common/common';
import TopMessage from '../common/TopMessage';
import Loader from '../common/Loader';

const CELL_COUNT = 6;
const OtpScreen = (props) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: async () => {
      return ;
    }
  });
  const [editableMobileNumber, setEditableMobileNumber] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);
  const [onLoadingBtn, setOnLoadingBtn] = React.useState(false);
  const [showAlart, setShowAlart] = useState(false);
  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const ref1 = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [handler, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [showMessage, setShowMessage] = useState(true);
  const [message, setMessage] = useState({
    message: "",
    messageType: "error",
  });


  const hideMessageHandler = () => {
    setShowMessage(false);
  };

  const onSubmit = async (data) => {
    props.navigation.navigate("HomePage");
    // // props.navigation.navigate("EnterPersonalDetails");
    // await setStorageValue("registerInfo", JSON.stringify(data));
    // data.otp = value;
    // setOnLoadingBtn(true);
    // let res = await postData('verifyOtp', data);
    // setOnLoadingBtn(false);
    // if (res.statusCode == 200) {
    //   if (res.data.length > 0) {
    //     // console.log(" res.data ", JSON.stringify(res.data[0]));
    //     await setStorageValue('userInfo', JSON.stringify(res.data[0]));
    //     // let userInfo =  await getStorageValue('userInfo');
    //     // console.log(" userInfo ", userInfo);
    //     props.navigation.navigate("HomePage");
    //   }
    //   else {
    //     props.navigation.navigate("EnterPersonalDetails");
    //   }
    // }
    // else if (res.statusCode == 401) {
    //   setShowMessage(true);
    //   setMessage({
    //     message: res.data?.errors?.msg || "Please check all mandatory fields",
    //     messageType: "error",
    //   });
    // }
  };
  const handleBack = () => {
    props.navigation.navigate("MobileNumber");
  };

  const resendOtp = async () => {
    // let tempData = {
    //   mobileNumber: mobileNumber
    // }
    // let res = await postData('sendOtp', tempData);
    // if (res.statusCode == 200) {
    //   setShowMessage(true);
    //   setMessage({
    //     message: `Otp successfully sent on ${mobileNumber}`,
    //     messageType: "success",
    //   });
    // }
  }

  var modalBackgroundStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  };

  const changeNumberOtp = async()=>{
    // let tempData = {
    //   mobileNumber: mobileNumber
    // }
    // let res = await postData('sendOtp', tempData);
    // if (res.statusCode == 200) {
    //   setModalVisible(!modalVisible)
    //   setShowMessage(true);
    //   setMessage({
    //     message: `Otp successfully sent on ${mobileNumber}`,
    //     messageType: "success",
    //   });
    // }   

  }


  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      {onLoadingBtn ? <Loader /> : ""}

      {showMessage && message.message && (
        <TopMessage
          message={message.message}
          messageType={message.messageType}
          onClose={hideMessageHandler}
          autoClose={true}
        />
      )}
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.topTitleMsg}>
          <TouchableOpacity onPress={handleBack}>
            {/* <Text>Hello</Text> */}
            <MaterialIcons name="arrow-back" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <Image
            source={require('../assets/mobileNumber.jpg')}
            style={styles.loaderGif}
          />
          <View >
            <Text style={styles.labelInput}>Your Mobile Number</Text>
            <View style={styles.inputBoxNumber}>
              <Text style={styles.inputnine}>+91</Text>
              <Text style={styles.inputninePipe}>|</Text>
              {/* <InputText
                placeholder="Enter 10 Digit Mobile Number"
                inputStyle="inputBox"
                keyboardType='numeric'
                maxLength={10}
                minLength={10}
                onChangeText={text => setInputValue(text)}
                value={inputValue}
                disable
              /> */}
              <Controller
                control={control}
                name="mobileNumber"
                rules={{
                  required: "Please Enter Mobile Number"
                }}
                render={({ field: { value, onChange } }) => (
                  <InputText
                    placeholder="Mobile Number"
                    inputStyle="inputBox"
                    keyboardType='numeric'
                    autoCapitalize=''
                    maxLength={10}
                    minLength={10}
                    editable={editableMobileNumber}
                    onChangeText={(value) => {
                      // console.log(" value ", value);

                      onChange(value);
                    }}
                    value={value}
                  />
                )}
              />
              <View style={{ position: "absolute", right: 15 }}>
                <TouchableOpacity
                  onPress={() => {
                    console.log(" Testing ");
                    // setEditableMobileNumber(true)
                    setModalVisible(true)
                  }}
                >
                  <AntDesign name="edit" size={18} color="#1EA17F" />
                </TouchableOpacity>

              </View>
            </View>
          </View>
          <View style={styles.enterOtpSect}>
            <Text style={styles.labelInput}>Enter OTP</Text>
            <Text style={{color:"#B1B2B7"}}>An OTP has been sent to your registered mobile number {mobileNumber}</Text>
          </View>
          <View style={styles.viewOtpEnter}>
            <CodeField
              ref={ref1}
              {...handler}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={(value1) => {
                if (value1.length == 6) {
                  setEnableBtn(true);
                  setError("");
                }
                else {
                  if (enableBtn) {
                    setEnableBtn(false);
                  }
                }
                setValue(value1);
              }}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              secureTextEntry={true}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => {
                let textChild = null;

                if (symbol) {
                  textChild = enableMask ? (
                    <Text
                      style={{
                        fontSize: 48,
                        color: 'black',
                      }}
                    >
                      •
                    </Text>
                  ) : (
                    symbol
                  );
                } else if (isFocused) {
                  textChild = <Cursor />;
                }
                return (
                  <Text
                    key={index}
                    style={[
                      error ? styles.red_cell : styles.cell,
                      isFocused && styles.focusCell,
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                    {/* {textChild} */}
                  </Text>
                );
              }}
            />
          </View>
          {showAlart ? <Text style={{ color: "red", fontWeight: "600", marginTop: 5, }}>Please Enter Valid OTP</Text> : null}
          <View style={{ bottom: 0, }}>
            <View style={styles.resendOtpScreen}>
              <Text style={styles.incaseNotRec}>In case you have not received it</Text>
              <TouchableOpacity onPress={() => resendOtp()} >
                <Text style={styles.resendNotRecb}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
            <Button
              disabled={enableBtn ? false : true}
              title="Continue"
              titleStyle={enableBtn ? "withoutBottomBtnWithColor" : "withoutBottomBtn"}
              titleTextStyle="withouttextBtn"
              handleSubmit={handleSubmit(onSubmit)}
            />

            <Text style={{ paddingHorizontal: 22, fontWeight: "600", fontSize: 10, marginTop: 10, color:"#B1B2B7" }}>By logging in you agree to our Terms of use and Privacy policy.</Text>
          </View>
        </View>
      </ScrollView>

      {/* ------------------------------------ */}
      {/* ------------------------------------ */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={[styles.centeredView, modalBackgroundStyle]}>
            <View style={styles.modalView}>
              <Image
                source={require('../assets/changeNumber.jpg')}
                style={styles.changeNumberGif}
              />
              <View >
                <Text style={styles.labelInput}>Change your Mobile Number</Text>
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
                        placeholder="Mobile Number"
                        inputStyle="inputBox"
                        keyboardType='numeric'
                        autoCapitalize=''
                        maxLength={10}
                        minLength={10}
                        // editable={editableMobileNumber}
                        onChangeText={(value) => {
                          console.log(" value ", value);
                          onChange(value);
                          setMobileNumber(value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Button
                    title="Continue"
                    titleStyle="withoutBottomBtnWithColor"
                    titleTextStyle="withouttextBtn"
                    handleSubmit={changeNumberOtp}
                  />
                </View>

              </View>
              <Pressable
                style={styles.modalCloseBtn}
                onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="close" size={25} color="#000" />
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  topTitleMsg: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  loaderGif: {
    width: 120,
    height: 120,
    marginBottom: 40,
    borderColor: "#000",
    marginTop: 10,
  },
  changeNumberGif: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderColor: "#000",
    marginTop: 10,
  },
  labelInput: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
    color:"#44465B",
  },
  inputBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    maxWidth: 300,
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
  enterOtpSect: {
    paddingVertical: 30,
    paddingHorizontal: 32,
  },
  viewOtpEnter: {
    // flex: 0.6,
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginHorizontal: 15,
  },

  resendOtpScreen: {
    marginTop: 50,
  },
  incaseNotRec: {
    textAlign: "center",
    color:"#7C7E8B",
  },
  resendNotRecb: {
    textAlign: "center",
    color: "#6E12F9",
    fontWeight: "600",
    marginTop: 5,
  },
  codeFieldRoot: { justifyContent: "center", alignItems: "center", textAlign: "center", },
  cell: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    margin: 5,
    marginTop: 10,
    lineHeight: 35,
    fontSize: 28,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    marginHorizontal: 5,
    color: '#2E2E2E',
  },
  red_cell: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    margin: 5,
    marginTop: 10,
    lineHeight: 35,
    fontSize: 28,
    borderWidth: 2,
    borderColor: '#FF675E',
    textAlign: "center",
    borderRadius: 0,
    marginHorizontal: 5,
    color: '#FF675E',
  },
  focusCell: {
    borderColor: '#0075FF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    position: "relative",
  },
  modalCloseBtn: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 0,
    textAlign: 'center',
    marginTop: 15,
  },
})

export default OtpScreen;