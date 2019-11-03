import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  let state = {
    
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.loginInput}
          autoCapitalize='none'
          placeholder='email'
         />
        <TextInput
          style={[styles.loginInput, {marginTop: 20}]}
          placeholder='password'
          secureTextEntry={ true }
         />
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

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
    borderColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 20,
  }
});
