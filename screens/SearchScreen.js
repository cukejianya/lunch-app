import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
//import { Marker, Polyline } from 'react-native-maps'
import { MapView } from 'expo'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { MonoText } from '../components/StyledText';

const SEARCH = gql`
  query SearchPlace($lat: Float, $lng: Float, $title: String) {
    searchPlace(lat: $lat, lng: $lng, title: $title) {
      title
      vicinity
      category
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState(0);
  let lat = 39.33136;
  let lng = -76.63226;

  
  var variables = { title: search, lat, lng} 
  const {loading, error, data} = useQuery(SEARCH, { variables })
  console.log(variables, data)

  //if (error) {
  //  console.log(error, search)
  //}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.loginInput}
        autoCapitalize='none'
        placeholder='Pick A Lunch Spot'
        onChangeText={setSearch}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  loginInput: {
    height: 40,
    marginLeft: 40,
    marginRight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
  }
});
