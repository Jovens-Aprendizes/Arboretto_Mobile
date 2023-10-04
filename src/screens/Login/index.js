import * as React from 'react';
import { Text, TextInput, TouchableHighlight, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik, Form } from 'formik';
import Api from '../../services/api';
import { LoginSchema } from './loginError';

export default function Login() {

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.arboretto}>ARBORETTO</Text>
        <Image style={[styles.logoImage]} resizeMode='contain' source={require('../../img/logo.png')}/>
        <View style={styles.fieldLogin}>
    
            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <Text style={styles.title}>CPF</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite seu CPF'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.cpf}
                            keyboardType='numeric'
                            maxLength={11}
                        />
                        <Text style={styles.title}>Senha</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Digite sua senha' 
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.password}
                            secureTextEntry={true}
                            isPassword={true}
                        />
                    </View>
                )}
            </Formik>

            <TouchableHighlight 
            style={styles.button}
            onPress={ () => navigation.navigate('Home')}
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableHighlight>

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
        flex: 0.4,
    },
    title: {
        fontSize: 24,
        textAlign: "left",
        color: "#66727f",
        top: "8%"
    },
    button: {
        position: 'absolute',
        backgroundColor: "#46e98f",
        width: "100%",
        height: "15%",
        paddingHorizontal: 11,
        paddingVertical: 8,
        alignSelf: "center",
        bottom: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
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
        paddingLeft: 20
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
    }
});
