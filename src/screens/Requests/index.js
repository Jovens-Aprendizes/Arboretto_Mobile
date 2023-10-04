import * as React from 'react';
import { Text, TouchableHighlight, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import Api from '../../services/api';

export default function Requests() {

  return(
    <SafeAreaView style={styles.container}>
      <Text>{Api.get('/usuario/listar')}</Text>
    </SafeAreaView>
  );
  
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});