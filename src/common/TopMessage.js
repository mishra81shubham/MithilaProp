import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TopMessage = ({ message, messageType, onClose, autoClose }) => {
    let color = messageType == 'error' ? 'red' : 'green';
    useEffect(() => {
        if(autoClose == true) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={styles.text}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="white" />
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    paddingHorizontal: 10,
  },
});

export default TopMessage;
