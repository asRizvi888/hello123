import * as React from 'react';
import {SafeAreaView, Pressable, Text, StyleSheet, Alert} from 'react-native';

import io from 'socket.io-client';
const customId = 'myCustomId';

const BASE_URL = 'https://www.qvesty.online';
// const BASE_URL = 'http://localhost:3000';

const socketIO = io(BASE_URL);

const App: React.FC<React.ReactNode> = ({props}: any) => {
  const onPressBtn = () => {
    console.log('pressed');
    socketIO.emit('message', 'Hello, @qvesty👋🏽');
  };

  React.useEffect(() => {
    // socketIO.on('message', msg => {
    //   if (msg) {
    //     Alert.alert('SERVER RESPONSE', msg);
    //   }
    //   return () => socketIO.disconnect();
    // });
    // Set the custom ID when the connection is established
    socketIO.on('connect', () => {
      socketIO.emit('REGISTER_CLIENT', customId);
    });

    // Handle other events as needed
    socketIO.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    socketIO.on('custom_event', data => {
      console.log(`Received custom event: ${data}`);
    });

    socketIO.on('message', msg => {
      if (msg) {
        Alert.alert('SERVER RESPONSE', msg);
      }
      // return () => socketIO.disconnect();
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
