import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Parent');
    }, 2000);
  }, []);
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
