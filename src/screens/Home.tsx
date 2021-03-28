import React,  { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { RectButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'

import { IInitialMarker, IAllUnits } from '../interfaces'
import {getData} from '../service';

import PinInsert from '../images/Pin.png';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const [ allUnits, setAllUnits ] = useState<IAllUnits[]>([]);
  const [ initialMapMarker, setInitialMapMarker ] = useState<IInitialMarker>({
    latitude: -23.628949249999998,
    longitude: -46.71006813701569,
    latitudeDelta: 0.0008,
    longitudeDelta: 0.0008,
  });

  useEffect(() => {
    getData.get('all').then( 
      response => {setAllUnits(response.data)})
    },[])

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude
      const long = position.coords.longitude
    }
  )

  function handlePageDetails(id: number){
    navigation.navigate('accenture', {id});
  };


  return (
    <View style={styles.container}>
    <MapView provider={PROVIDER_GOOGLE} style={styles.map}
    initialRegion={ initialMapMarker }
    > 
    { allUnits.map( unity => 
      
      <Marker key={unity.id} icon={PinInsert} coordinate={{latitude: unity.latitude, longitude: unity.longitude }}>
        <Callout tooltip={true} onPress={() => handlePageDetails(unity.id)}>
          <View style={styles.callOutContainer}>
            <Text style={styles.callOutText}>{unity.name}</Text>
          </View>
        </Callout>
      </Marker>
      )}
    </MapView>
    <View style={styles.footer}>
      <Text style={styles.footerText}>Texto qualquer</Text>
      <RectButton style={styles.findButton}>
        <Feather name="search" size={20} color={'#fff'}></Feather>
      </RectButton>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    callOutContainer: {
      width: 200,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center'
    },
    callOutText: {
      color: '#a100ff',
      textAlign: 'center',
      fontSize: 14
    },
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 24,
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footerText: {
      color: '#8fa7b3'
    },
    findButton: {
      height: 56,
      width: 56,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#a100ff',
  
    }
  });
  