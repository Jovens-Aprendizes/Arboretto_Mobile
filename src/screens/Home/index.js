import * as React from 'react';
import { useContext } from 'react';
import { Text, TouchableHighlight, SafeAreaView, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../../services/CredentialsContext';

export default function Home() {
  
  const {setStoredCredentials, storedCredentials} = useContext(CredentialContext);
  const { nome } = storedCredentials;
  const ClearLogin = () => {
    AsyncStorage
    .removeItem('ArborettoCredentials')
    .then(() => {
        setStoredCredentials('')
    })
    .catch(error => console.log(error))
  }
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
        

        <TouchableHighlight 
        style={styles.button}
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