import * as React from 'react';
import { Text, TextInput, TouchableHighlight, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { encode } from 'base-64';
import { Alert } from 'react-native';
import * as Yup from 'yup';


export default function Login() {

  const navigation = useNavigation();

  // SCHEMA DE VALIDAÇÃO
  const SignupSchema = Yup.object().shape({
    cpf: Yup.number().required('Campo obrigatório!').min(11, 'O CPF deve conter 11 dígitos.'),
    password: Yup.string().required('Campo obrigatorio'),
  });


  // FUNÇÃO DE LOGIN
  const signIn = async ({ cpf, senha }) => {

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
        navigation.navigate('Home');
        // setUser(response.data); 
        // setCookie(undefined, 'arboretto-token', token, {
        //   maxAge: 60 * 60 * 24 * 30, 
        // });
        
      } else {
        Alert.alert('Erro', 'Login inválido');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
  };
  
// FINAL DA FUNÇÃO DE LOGIN




  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.arboretto}>ARBORETTO</Text>
        <Image style={[styles.logoImage]} resizeMode='contain' source={require('../../img/logo.png')}/>
        <View style={styles.fieldLogin}>
    
            <Formik
                initialValues={{ cpf: '', password: '' }}
                
                onSubmit={values => {
                    try {
                        
                        signIn({ cpf: values.cpf, senha: values.password })
                    
                        console.log(values.cpf, values.password)

                    } catch(error) {
                        console.log(error)
                    }
                }}
                validationSchema={SignupSchema}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <View>
                        <Text style={styles.title}>CPF</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite seu CPF'
                            onChangeText={handleChange('cpf')}
                            value={values.cpf}
                            keyboardType='numeric'
                            maxLength={11}
                            error={touched.cpf && errors.cpf ? errors.cpf : ''}
                        />
                        <Text style={styles.erroFormulario}>{errors.cpf}</Text>
                        


                        <Text style={styles.title}>Senha</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Digite sua senha' 
                            onChangeText={handleChange('password')}
                            value={values.password}
                            secureTextEntry={true}
                            isPassword={true}
                            error={touched.password && errors.password ? errors.password : ''}
                        />
                        <Text style={styles.erroFormulario}>{errors.password}</Text>


                        <TouchableHighlight 
                            style={styles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableHighlight>
                    </View>
                )}
            </Formik>
        </View>
        
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoImage: {
        height: "15%",
        width: "35%",
        top: "3.33%",
        right: "66.11%",
        bottom: "87.5%",
        maxHeight: "100%",
        maxWidth: "100%",
        left: "0%",
        position: "absolute",
        overflow: "hidden"
    },
    
    arboretto: {
        top: "6.67%",
        fontSize: 35,
        fontWeight: "bold",
        color: "#0b1f33",
        textAlign: "center",
        left: "0%",
        position: "absolute",
        width: "100%"
    },    
    fieldLogin: {
        top: "18%",
        paddingStart: "5%",
        paddingEnd: "5%",
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: "left",
        color: "#66727f",
        top: "8%"
    },
    button: {
        backgroundColor: "#46e98f",
        width: "100%",
        height: "15%",
        paddingHorizontal: 11,
        paddingVertical: 8,
        alignSelf: "center",
        bottom: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: "20%"
    },
    textButton: {
        fontSize: 26,
        fontWeight: "700",
        color: "#fff",
        textAlign: "left"
    },
    input: {
        backgroundColor: "#f4f7fb",
        borderRadius: 15,
        width: "100%",
        paddingVertical: 15,
        fontSize: 24,
        top: "10%",
        marginBottom: "8%",
        paddingLeft: 20,
    },
    formikView:{
        backgroundColor: "#f4f7fb",
        borderRadius: 15,
        width: "100%",
        paddingVertical: 15,
        fontSize: 24,
        top: "10%",
        marginBottom: "8%",
        paddingLeft: 20
    },
    erroFormulario:{
        
        color: 'red',
        fontSize: 14,
        paddingTop: "5%"
    }
});
