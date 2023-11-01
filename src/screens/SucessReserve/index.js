import * as React from 'react';
import {SafeAreaView, StyleSheet, Image, View, TouchableHighlight, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation();
  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return(
    <SafeAreaView style={styles.container}>
        
            <Image style={[styles.imageSucess]} resizeMode='contain' source={require('../../img/SolicitacaoEnviada.png')}/>
            <Image style={[styles.imageSucess]} resizeMode='contain' source={require('../../img/Sucess.png')}/>
            <TouchableHighlight 
                style={styles.button} 
                onPress={navigateToHome}
            >
            <Text style={styles.textButton}>Voltar para a tela inicial!</Text>
            </TouchableHighlight>
    </SafeAreaView>
  );
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: "center",
        alignItems: "center",
    },
    imageSucess: {
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        width: "100%",
        height: "20%"
    },
    button: {
        backgroundColor: "#46e98f",
        width: "80%",
        height: "15%",
        paddingHorizontal: 11,
        paddingVertical: 8,
        alignSelf: "center",
        bottom: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        top: "10%"
    },
    textButton: {
        fontSize: 26,
        fontWeight: "700",
        color: "#fff",
        textAlign: "left"
    },
});