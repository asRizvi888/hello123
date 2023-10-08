import * as React from 'react';
import {SafeAreaView, Pressable, Text, StyleSheet, Alert} from 'react-native';

import io from 'socket.io-client';

const BASE_URL = 'https://www.qvesty.online';
// const BASE_URL = 'http://localhost:3000';

const socketIO = io(BASE_URL);

const App: React.FC<React.ReactNode> = ({props}: any) => {
  const onPressBtn = () => {
    console.log('pressed');
    socketIO.emit('message', 'gogo');
  };

  React.useEffect(() => {
    socketIO.on('message', msg => {
      if (msg) {
        Alert.alert('SERVER RESPONSE', msg);
      }
      return () => socketIO.disconnect();
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.btn} onPress={onPressBtn}>
        <Text style={styles.txt}>{`Press me 🚀`}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '50%',
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  txt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
