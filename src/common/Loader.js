import React from 'react';
import { StyleSheet, Text, ActivityIndicator, View, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderGif}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 20, marginTop: 15 }}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 99,
    width: width,
    height: height,
  },
  loaderGif: {
    justifyContent: "center",
    alignItems: "center",
  },
});