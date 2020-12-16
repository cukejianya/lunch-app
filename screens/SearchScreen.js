import React, { useState, useCallback } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Marker, Polyline } from 'react-native-maps'
import MapView from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { MonoText } from '../components/StyledText';

const SEARCH = gql`
  query SearchPlace($lat: Float, $lng: Float, $title: String) {
    searchPlace(lat: $lat, lng: $lng, title: $title) {
      id
      title
      highlightedTitle
      vicinity
      category
      position
    }
  }
`;

function Bold({ text }) {
  return <Text style={{fontWeight: 'bold'}}>{ text }</Text>
}

function MapElm({position}) {
  console.log(position)
  return (
    <View style={styles.mapContainer}>
      <MapView 
        initialRegion={getInitialState(position)}
        style={styles.mapStyle}
        scrollEnabled={false}
      >
        <Marker
          coordinate={getLatLng(position)}
          image={require('../assets/images/marker.png')} />
      </MapView>
    </View>
  );
}

function getInitialState(coordArray) {
  let {latitude, longitude} = getLatLng(coordArray)
  return {
      latitude,
      longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
  }
}

function getLatLng([lat, lng]) {
  return {
    latitude: lat, 
    longitude: lng,
  }
}


function Item({ item, onSelect }) {
  if (item) {
    var title = item.highlightedTitle.split(" ").map((word, id) => {
      let re = /<b>(.*)<\/b>/;
      let highlighted = (word.match(re) || ["",""])[1]
      let text = word.replace(re, "");
      return (
        <Text key={id}>
          <Bold text={highlighted} />
          {text + " "}
        </Text>
      )
    })
  }
  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={ styles.itemContainer }>
      <Ionicons style={styles.itemIcon} name="md-pin" size={30} color="black" />
      <View style={ styles.itemText }>
        <Text style={styles.itemTitle}>
          { title }
        </Text>
        <Text style={styles.itemAddress}>
          {(item.vicinity || "").replace(/<br\/>/, " ")}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default function SearchScreen({ navigation, route }) {
  const [search, setSearch] = useState('');
  const [place, setPlace] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [isInputFocus, setInputFocus] = useState(true)
  let result; 

  console.log("Contacts:", route.params.contacts)
  let lat = 39.33136;
  let lng = -76.63226;

  console.log('Search', search);
  var variables = { title: search, lat, lng} 
  const {loading, error, data} = useQuery(SEARCH, { variables })
  console.log('Loading:', loading);
  console.log('Error:', error);
  const onSelect = (item) => {
    console.log('Item: ', item)
    setInputFocus(false)
    setPlace(item)
    setSearch(item.title)
  }
  //if (error) {
  //  console.log(error, search)
  //}
  if (isInputFocus) {
    console.log('Data:', data);
    result = (
       <FlatList
         data={(data || {}).searchPlace}
         renderItem={({ item }) => (
           <Item 
             item={item} 
             onSelect={onSelect}
           />
         )}
         keyExtractor={item => item.id}
       />
    )
  } else {
    result = <MapElm position={place.position} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.loginInput}
          autoCapitalize='none'
          placeholder='Pick A Lunch Spot'
          onChangeText={(text) => {setSearch(text); console.log(text);}}
          onFocus={() => setInputFocus(true)}
          value={search}
         />
       </View>
       {result}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  loginInput: {
    height: 40,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 40,
  },
  itemIcon: {
    marginTop: 15,
    paddingBottom: 15,
  },
  itemText: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    marginLeft: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  itemTitle: {
    fontSize: 20,
  },
  itemAddress: {
    fontSize: 16, 
    color: 'grey',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    height: 200,
    width: Dimensions.get('window').width,
  },
});
