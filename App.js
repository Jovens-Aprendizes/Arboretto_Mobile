import React, {useState} from 'react';
import StackRoutes from './src/Routes';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from './src/services/CredentialsContext';

export default function App() {

    const [appReady, setAppReady] = useState(false);
    const [storedCredentials, setStoredCredentials] = useState("")

    const checkLoginCredentials = () => {
      AsyncStorage
      .getItem('ArborettoCredentials')
      .then((result) => {
        if (result !== null){
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error))
    }

    if (!appReady) {
      return (
        <AppLoading
          startAsync={checkLoginCredentials}
          onFinish={() => setAppReady(true)}
          onError={console.warn}
        />
      )
    }


    return (

      <CredentialContext.Provider value={{storedCredentials, setStoredCredentials}}>
        <StackRoutes/>
      </CredentialContext.Provider>
      
    );
}