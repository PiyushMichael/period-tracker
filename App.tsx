/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Hello from 'components/Hello';

function App(): JSX.Element {
  useEffect(() => {
    AsyncStorage.getItem('name').then((res) => Alert.alert(`Data is: ${res}`));
  }, []);

  return (
    <SafeAreaView>
      <Hello
        hello="hello"
        bello="bello"
        trello="trello"
        hehe="heheh"
        fkchdgskvjh="dikufvhdskjvh"
      />
      <Button
        title="Write stuff to local storage"
        onPress={() => AsyncStorage.setItem('name', 'Hoo Haa')}
      />
    </SafeAreaView>
  );
}

export default App;
