import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Keyboard,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons'

function Item({ isSelected, item, onSelect }) {
  const color = isSelected ? "green" : "black";
  console.log(color);
  return (
    <TouchableOpacity
      onPress={() => onSelect(item.id)}
      style={ styles.itemContainer }>
      <Ionicons style={styles.itemIcon} name="ios-contact" size={30} color={color} />
      <View style={ styles.itemText }>
        <Text style={styles.itemTitle}>
          { item.name }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

function getLunchCrew(contacts, selected) {
  return contacts.filter((obj) => selected.has(obj.id))
}

export default function ContactScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilterContacts] = useState([]);
  const [selected, setSelected] = useState(new Set([]));

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS);
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
        });

        let contactData = data;
        setContacts(contactData.sort((a, b) => {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; 
        }));
      }
    })();
  }, []);
  
  useEffect(() => {
    if (search) {
      setFilterContacts(contacts.filter((obj) => (obj.firstName || '')
        .toLowerCase()
        .startsWith(search.toLowerCase())
      ));
    } else {
      setFilterContacts(contacts)
    }
  }, [search, contacts])

  const onSelect = useCallback((id) => {
    setSelected(new Set(selected.delete(id) ? selected : selected.add(id)));
  }, [selected]);

  console.log(selected)
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.loginInput}
          autoCapitalize='none'
          placeholder='Pick The Lunch Crew'
          onChangeText={setSearch}
          value={search}
          onBlur={Keyboard.dismiss}
        />
      </View>
      <FlatList
        data={filterContacts}
        renderItem={({ item }) => (
          <Item
            isSelected={selected.has(item.id)}
            item={item} 
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
      <Button
        title="Pick the Place"
        onPress={ () => navigation.navigate('Search', {
          contacts: getLunchCrew(contacts, selected),
        })}
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
})
