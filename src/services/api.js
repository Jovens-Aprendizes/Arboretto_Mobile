// import { encode } from 'base-64';
// import axios from 'axios';
// import { Alert } from 'react-native';
// import { setCookie } from 'nookies';
// import { useNavigation } from '@react-navigation/native';



// const signIn = async ({ cpf, senha }) => {
//   const navigation = useNavigation();
//   global.btoa = encode;
  
//   const token = btoa(JSON.stringify({ cpf: cpf, senha: senha }));

//   try {
//     const response = await axios.post(
//       process.env.NEXT_PUBLIC_AUTH_URL || 'https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario/login',
//       { token: token },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: '*/*',
//         },
//       }
//     );

//     if (response.data.id) {
//       navigation.navigate('Home');
//       // setUser(response.data); 
//       // setCookie(undefined, 'arboretto-token', token, {
//       //   maxAge: 60 * 60 * 24 * 30, 
//       // });
      

//     } else {
//       Alert.alert('Erro', 'Login inválido');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// export { signIn }; 
