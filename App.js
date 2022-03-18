import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatabaseService from './services/DatabaseService';

const databaseService = DatabaseService.getService();

export default function App() {
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    databaseService
      .getDatabase(setErrorViewState)
      .then(() => {
        console.log('No error.');
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const setErrorViewState = (errorCode) => {
    setErrorCode(errorCode);
  };

  if(errorCode){
    return (
      <View style={styles.container}>
        <Text>{errorCode}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
});
