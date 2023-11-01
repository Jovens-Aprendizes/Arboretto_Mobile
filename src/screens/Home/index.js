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
    },
    buttonLogout:{
        borderRadius: 20,
        backgroundColor: "red",
        width: "75%",
        height: "9%",
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: 'center',
        top: '9%',
        marginBottom: '8%'
    },
    textBemVindo: {
        flex: 0.1,
        fontSize: 40,
        fontWeight: "700",
        color: "black",
        textAlign: 'center',
        height: "120%",
        textAlignVertical: "center",
        paddingTop:'10%'
    },
    
});