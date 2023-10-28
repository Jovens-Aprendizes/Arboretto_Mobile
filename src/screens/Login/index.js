import * as React from 'react';
import { useContext } from 'react';
import { Text, TextInput, TouchableHighlight, View, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Alert } from 'react-native';
import { signIn } from '../../services/api';
import { CredentialContext } from '../../services/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  
  const navigation = useNavigation();
  const {storedCredentials, setStoredCredentials} = useContext(CredentialContext);


  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('ArborettoCredentials', JSON.stringify(credentials))
    .then(() => {
        setStoredCredentials(credentials);
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Erro', 'Ocorreu um erro, faça login novamente!')
    })
  }
  


  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.arboretto}>ARBORETTO</Text>
        <Image style={[styles.logoImage]} resizeMode='contain' source={require('../../img/logo.png')}/>
        <View style={styles.fieldLogin}>
    
    
            <Formik
                initialValues={{ cpf: '', password: '' }}
                onSubmit={(values, {setSubmitting}) => {

                    if (values.cpf == '' || values.password == ''){
                        setSubmitting(false);
                        Alert.alert('Erro', 'Login inválido');
                    }else{
                        try {
                        
                            signIn({ cpf: values.cpf, senha: values.password, setSubmitting, persistLogin })
                            
                            console.log(values.cpf, values.password)
                            
                        } catch(error) {
                            console.log(error)
                        }
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, isSubmitting, values, errors, touched, isValid }) => (
                    <View>
                        <Text style={styles.title}>CPF</Text>
                        <TextInput
                            name='cpf'
                            style={styles.input}
                            placeholder='Digite seu CPF'
                            onChangeText={handleChange('cpf')}
                            onBlur={handleBlur('cpf')}
                            value={values.cpf}
                            keyboardType='numeric'
                            maxLength={11}
                            error={touched.cpf && errors.cpf ? errors.cpf : null}
                        />
                        {(errors.cpf && touched.cpf) &&
                          <Text style={styles.erroFormulario}>{errors.cpf}</Text>
                        }


                        <Text style={styles.title}>Senha</Text>
                        <TextInput 
                            name='password'
                            style={styles.input}
                            placeholder='Digite sua senha' 
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                            error={touched.password && errors.password ? errors.password: null}
                        />
                        {(errors.password && touched.password) && <Text style={styles.erroFormulario}>{errors.password}</Text>}

                        {!isSubmitting && <TouchableHighlight 
                            style={styles.button}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableHighlight>}
                        {isSubmitting && <TouchableHighlight 
                            style={styles.button}
                            onPress={handleSubmit}
                            disabled={true}
                        >
                            <ActivityIndicator size='large' color='#fff'/>
                        </TouchableHighlight>}

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
        paddingTop: "5%",
        position:'relative'
    }
});
