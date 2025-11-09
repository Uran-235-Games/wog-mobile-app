import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './screens/AuthScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={{width: "100%", backgroundColor: "#3f3f3fff"}}>
        <Text style={styles.title}>Header</Text>
      </View>

      <AuthScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});
