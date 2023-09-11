import * as React from 'react';
import { Text, TouchableHighlight, View, SafeAreaView, StyleSheet, Image } from 'react-native';

export default function Requests() {

  return(
    <SafeAreaView style={styles.container}>
        <Text>REQUESTS</Text>
    </SafeAreaView>
  );
}  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});