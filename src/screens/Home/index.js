import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Text, TouchableHighlight, SafeAreaView, StyleSheet, View, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../../services/CredentialsContext';
import { loadFonts } from '../../services/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Home() {
  
  const {setStoredCredentials, storedCredentials} = useContext(CredentialContext);
  const { nome } = storedCredentials;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const ClearLogin = () => {
    AsyncStorage
    .removeItem('ArborettoCredentials')
    .then(() => {
        setStoredCredentials('')
    })
    .catch(error => console.log(error))
  }
  const navigation = useNavigation();

  useEffect(() => {
    async function loadAppResources() {
      await loadFonts(); 
      setFontsLoaded(true);
    }

    loadAppResources();
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }

  return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.textBemVindo}>Seja bem-vindo, {nome}!</Text>
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
        

        <Image style={[styles.logoImage]} resizeMode='contain' source={require('../../img/logo.png')}/>


        <TouchableHighlight 
        style={styles.buttonLogout}
        onPress={ ClearLogin }
        >
            <Text style={styles.textButton}>SAIR</Text>
        </TouchableHighlight>
       
    </SafeAreaView>
  );
}  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
    },
    textButton: {
        fontSize: RFValue(20),
        fontFamily:'Lora-Medium',
        color: "#fff",
        textAlign: "left",
        
    },
    button:{
        flex: 0.16,
        borderRadius: 20,
        backgroundColor: "#1F97AE",
        width: "75%",
        height: "9%",
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: 'center',
        marginBottom: '8%',
        
    },
    buttonLogout:{
        flex: 0.09,
        borderRadius: 20,
        backgroundColor: "red",
        width: "75%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: "10%"
    },
    textBemVindo: {
        flex: 0.2,
        fontSize: RFValue(40),
        fontFamily:'Lora-Medium',
        color: "black",
        textAlign: 'center',
        height: "120%",
        textAlignVertical: "center",
        padding:'6%',
    },
    logoImage: {
        flex: 0.5,
        width: "200%",

    }
});