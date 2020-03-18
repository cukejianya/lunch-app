import React, { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import { Marker, Polyline } from 'react-native-maps'
import MapView from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { MonoText } from '../components/StyledText';

export default function MapScreen({navigation, route}) {
  console.log(route.params)
  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={getInitialState(route.params.position).region}
        style={styles.mapStyle} >
        <Marker
          coordinate={getLatLng(route.params.position)} />
      </MapView>
    </View>
  );
}

function getInitialState(coordArray) {
  let {latitude, longitude} = getLatLng(coordArray)
  return {
    region: {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
  }
}

function getLatLng([lat, lng]) {
  return {
    latitude: lat, 
    longitude: lng,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
