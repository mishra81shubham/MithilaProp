import axios from "axios";
import { apiHost } from "../../constant";
import { PermissionsAndroid } from "react-native";

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
};

export const formatDateTime = (date) => {
  let tempTime = date && date.split("T");
  // console.log(" date ", tempTime[1].split(".")[0]);
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  // let tempDate = new Date(date)
  // console.log(" d ====== ", date.split(" "));
  // console.log(" d ====== ", d);

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-") + " " + tempTime[1].split(".")[0];
};

export const getData = async (url, data) => {
  console.log(" url called ===== ", apiHost.baseURL + url);

  return await axios
    .request({
      method: "get",
      baseURL: apiHost.baseURL,
      url: apiHost.baseURL + url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
      },
    })
    .then((response) => {
      console.log(" response ");
      // return response;
      let tempData = response.data;
      tempData.statusCode = response.status;
      return tempData;
    })
    .catch((error) => {
      console.log(" Error occurred: ", error);
      return error;
    });
  // console.log(" response ", response);
  // return response.data;
};

export const postData = async (url, data) => {
  // console.log(" data ", data);
  console.log("url-----------", apiHost.baseURL + url);
  return await axios
    .request({
      method: "post",
      url: apiHost.baseURL + url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
      },
    })
    .then((response) => {
      // console.log(" response -------- ", response);
      let tempData = response.data;
      tempData.statusCode = response.status;
      return tempData;
    })
    .catch(error => {
      let tempData = {};
      if (error.response) {
        if (error.response.status == 422) {
          tempData.statusCode = error.response.status;
          tempData.errors = error.response.data.errors;
        }
        else {
          if (error.response?.data) {
            tempData.data = error.response?.data;
          }
        }
        tempData.statusCode = error.response.status;
      }
      else if (error.request) {
        tempData.statusCode = 408;
        tempData.message = 'Server Timeout';
        // The request was made but no response was received
        console.error('No response received:', error.request);
      }
      else {
        tempData.statusCode = 400;
        tempData.message = 'Error setting up the request';
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
      }
      return tempData;
    });
  // console.log(" response ", response);
};

export const validateMobileNumber = (value) => {
  if (!value) {
    return "Please enter mobile number";
  }
  const isValidMobile = /^\d{10}$/.test(value);
  return isValidMobile || "Please enter a valid 10-digit mobile number";
};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
    return granted;
  } catch (err) {
    console.warn(err);
  }
};

