import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { RectButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';

import AccentureLogo from '../images/Accenture.png';
import { getData } from '../service'

import { Getunity, HeaderProps, IAllUnits } from '../interfaces'

export default function Accenture() {
    const route = useRoute()
    const params = route.params as Getunity

    const [unit, setUnit] = useState<IAllUnits>();

    useEffect(() => {
        getData.get(`find?id=${params.id}`).then(
            response => {
                setUnit(response.data)
            }
        )
    }, [params.id])

    const navigation = useNavigation();

    function handlePushContent(){
        navigation.navigate('contact');
    }

  return (
    <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <Image style={styles.topImage} source={{ uri: unit?.profile }} />
            <Image style={styles.logo} source={AccentureLogo} height={60} width={232}/>
            <Text style={styles.title}>{unit?.name}</Text>
            <Text style={styles.paragrafo}>{unit?.describle}</Text>

            <Text style={styles.details}>País: {unit?.country}</Text>
            <Text style={styles.details}>Estado:{unit?.state}</Text>
            <Text style={styles.details}>Cidade:{unit?.city}</Text>
            <Text style={styles.details}>Endereço:{unit?.address.street}</Text>

            <RectButton style={styles.contactButton} onPress={handlePushContent}> 
                <Text style={styles.textButton}>Entrar em contato</Text>
                <Feather name="send" size={20} color={'#a110ff'} />
            </RectButton>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    scrollView: {
        width: Dimensions.get('window').width
    },
    topImage:{
        width: Dimensions.get('window').width,
        height: 300

    },
    logo: {
        marginBottom: 20,
        marginTop: 40,
        height: 60,
        width: 232

    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
        color: '#b8b8b8'
    },
    paragrafo: {
        fontSize: 18,
        marginBottom: 24,
        textAlign: 'center',
        color: '#b8b8b8',
        
    },
    contactButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: '#a100ff',
        marginTop: 22,
        marginBottom: 20

    },
    textButton: {
        color: '#a100ff',
        fontSize: 18,
        marginRight: 18
    },
    details: {
        marginVertical: 6,
        color: '#8f8f8f'
    }
})