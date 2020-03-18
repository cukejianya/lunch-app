import React, { useState, useCallback } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
//import { Marker, Polyline } from 'react-native-maps'
import { MapView } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { MonoText } from '../components/StyledText';

const SEARCH = gql`
  query SearchPlace($lat: Float, $lng: Float, $title: String) {
    searchPlace(lat: $lat, lng: $lng, title: $title) {
      id
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

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState(0);
  const [place, setPlace] = useState({});
  let lat = 39.33136;
  let lng = -76.63226;
  
  var variables = { title: search, lat, lng} 
  const {loading, error, data} = useQuery(SEARCH, { variables })
  
  const getPlace = useCallback( place_obj => {
      navigation.navigate('Map', place_obj)
      console.log(place_obj)
    }, [place]
  )
  //if (error) {
  //  console.log(error, search)
  //}
  console.log(place);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.loginInput}
          autoCapitalize='none'
          placeholder='Pick A Lunch Spot'
          onChangeText={setSearch}
         />
       </View>
       <FlatList
         data={(data || {}).searchPlace}
         renderItem={({ item }) => (
           <Item 
             item={item} 
             onSelect={getPlace}
           />
         )}
         keyExtractor={item => item.id}
       />
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
  }
});
