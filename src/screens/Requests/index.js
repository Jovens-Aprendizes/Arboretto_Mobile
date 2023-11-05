import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { CredentialContext } from '../../services/CredentialsContext';
import { listResquests } from '../../services/api';
import { RFValue } from 'react-native-responsive-fontsize';
import { loadFonts } from '../../services/fonts';

export default function Requests() {
  
  const [isLoading, setIsLoading] = useState(true);
  const { setStoredCredentials, storedCredentials } = useContext(CredentialContext);
  const { id } = storedCredentials;
  const [requests, setRequests] = useState([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const formataData = (dataString) => {

    dataString = dataString.split(" ")[0];

    const [ano, mes, dia] = dataString.split('-')
    const dataFormatada = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
    return dataFormatada;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listResquests(storedCredentials.id);
        setRequests(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, [id]);

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
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const renderRequestItem = ({ item }) => {
    let imagemSource;
  
    if (item.status === 'permitido') {

      imagemSource = require('../../img/Aprovado.png');

    } else if (item.status === 'negado'){
    
      imagemSource = require('../../img/Negado.png');

    } else {
     
      imagemSource = require('../../img/Pendente.png');

    }
  
    return (
      <View style={styles.requestItem}>
        <Image
          style={styles.calendarCheck}
          resizeMode='contain'
          source={require('../../img/CalendarCheck.png')}
        />
        <Text style={styles.textList}>{formataData(item.dataMarcada)}</Text>
        <Text style={styles.textList}>{item.nomeSpace}</Text>
        <Image style={styles.iconStatus} resizeMode='contain' source={imagemSource} />
      </View>
    );
  };
    
  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
  
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    requestItem: {
      flex: 1,
      padding: 16,
      borderWidth: 0.5,
      borderColor: "grey",
      flexDirection: "row",
      justifyContent: "space-between", 
      alignItems: "center",
      
    },
    iconStatus: {
      flex: 0.3,
    },
    textList: {
      textAlign:"center",
      textAlignVertical:"center",
      flex: 0.3,
      fontFamily:'Lora-Medium',
      fontSize: RFValue(13)
      
    },
    calendarCheck: {
      flex: 0.1
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
