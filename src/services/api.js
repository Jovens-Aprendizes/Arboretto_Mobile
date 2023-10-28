import { encode } from 'base-64';
import axios from 'axios';
import { Alert } from 'react-native';
import { setCookie } from 'nookies';

// REQUISIÇÃO DE DADAS MARCADAS PARA UM ESPAÇO

const listUnavailableDates = async ( spaceId ) => {

  let datasMarcadas = [];
  try {
    const url = "https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/listar-por-space-id?spaceId=" + spaceId;
    const response = await axios.get(url)
    .catch((error) => console.log(error))

    if(response.data){
      datasMarcadas = response.data.map(jsonObj => jsonObj["dataMarcada"]);

      datasMarcadas = datasMarcadas.map(dataComHorario => {
        const partes = dataComHorario.split(' ');
        
        return partes[0];
      });

      console.log(datasMarcadas)
    }
    
  } catch (error) {
    console.log(error)
    Alert.alert('Erro', 'Ocorreu um erro ao reservar a data. Tente novamente!');
  }
  return datasMarcadas

};

export {listUnavailableDates}; 


// LOGIN DO USUÁRIO
const signIn = async ({ cpf, senha, setSubmitting, persistLogin }) => {
  global.btoa = encode;
  
  const token = btoa(JSON.stringify({ cpf: cpf, senha: senha }));

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_AUTH_URL || 'https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario/login',
      { token: token },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      }
    );

    if (response.data.id) {

      persistLogin(response.data);
      console.log(response.data);
      
    } else {
      Alert.alert('Erro', 'Login inválido');
    }
    setSubmitting(false)
  } catch (error) {
      setSubmitting(false)
      Alert.alert('Erro', 'Login inválido');
  }
};

export { signIn }; 