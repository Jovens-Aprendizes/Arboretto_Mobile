import * as React from 'react';
import { Text, TouchableHighlight, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation();
  return(
    <SafeAreaView style={styles.container}>
        <TouchableHighlight 
        style={styles.button}
        onPress={ () => navigation.navigate('SelectSpace')}
        >
            <Text style={styles.textButton}>AGENDAR ESPAÇO</Text>
        </TouchableHighlight>
        <TouchableHighlight 
        style={styles.button}
        onPress={ () => navigation.navigate('Requests')}
        >
            <Text style={styles.textButton}>STATUS DE SOLICITAÇÕES</Text>
        </TouchableHighlight>
    </SafeAreaView>
  );
}  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    textButton: {
        fontSize: 26,
        fontWeight: "700",
        color: "#fff",
        textAlign: "left"
    },
    button:{
        borderRadius: 20,
        backgroundColor: "#1F97AE",
        width: "75%",
        height: "9%",
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: 'center',
        top: '9%',
        marginBottom: '8%'
    }
});