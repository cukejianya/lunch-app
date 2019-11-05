import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

import { MonoText } from '../components/StyledText';

const LOG_IN = gql`
  query User($email: String!, $password: String!){
    loginUser(email: $email, password: $password)
  }
`;

export default function LoginScreen() {
  const [ email, setEmail ] = useState(0);
  const [ password, setPassword ] = useState(1);
  
  const [login, {called, loading, error, data}] = useLazyQuery(LOG_IN)

  if (error) {
    console.log(error)
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.loginInput}
          autoCapitalize='none'
          placeholder='email'
          onChangeText={setEmail}
         />
        <TextInput
          style={styles.loginInput}
          placeholder='password'
          secureTextEntry={ true }
          onChangeText={setPassword}
         />
       </View>
      <Button
        onPress={() =>login({
          variables: { email, password }
        })}
        title="Log In"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
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
    marginBottom: 30,
    borderColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 20,
  }
});
