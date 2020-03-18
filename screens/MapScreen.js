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

export default function MapScreen(obj) {
  console.log(obj);
  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={getInitialState(route.params.position).region}
        style={styles.mapStyle} />
    </View>
  );
}

function getInitialState([lat, lng]) {
  return {
    region: {
      latitude: lat, 
      longitude: lng,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }
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
