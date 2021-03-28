import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import { HeaderProps } from '../interfaces';

export default function Header({title, showCancel = true}: HeaderProps) {
    
    const navigation = useNavigation();

    function handleClose(){
        navigation.navigate('home')
    }
    
   
    return (
      <View style={styles.container}>
          <BorderlessButton onPress={navigation.goBack}>
            <Feather name="arrow-left" size={20} color="#a100ff"/>
          </BorderlessButton>

          <Text style={styles.title}>{title}</Text>

        { showCancel ? (
          <BorderlessButton onPress={handleClose}>
            <Feather name="x" size={20} color="#a100ff" />
          </BorderlessButton>
        ) : (
            <View></View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#868686',
        fontSize: 18
    },
    returnButton:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    textReturnButton: {
        marginLeft: 18
    }

})
