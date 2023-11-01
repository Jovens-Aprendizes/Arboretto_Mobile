import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useContext } from 'react';
import 'react-native-calendars/src/types'
import axios from 'axios';
import { listUnavailableDates } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../../services/CredentialsContext';
import { reserveSpace } from '../../services/api';

export default function SelectDate({route}) {
    const {setStoredCredentials, storedCredentials} = useContext(CredentialContext);
    const { id } = storedCredentials;
    const navigation = useNavigation();
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [observacao, setObservacao] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const dataAtual = new Date();
    const spaceId = route.params.paramKey;
    dataAtual.setHours(0, 0, 0, 0);
    let espacoAtual = '';
    if (route.params.paramKey == '1'){
        espacoAtual = 'CHURRASQUEIRA 1'
    } else if (route.params.paramKey == '2') {
        espacoAtual = 'CHURRASQUEIRA 2'
    } else if (route.params.paramKey == '3'){
        espacoAtual = 'SALÃO DE FESTAS'
    }
    
    useEffect(() => {

        console.log("Space ID atual: ", spaceId);
        
        listUnavailableDates(spaceId)
            .then(data => {
                const formattedDates = {};
                data.forEach(date => {
                    formattedDates[date] = { selected: true, marked: true, disableTouchEvent: true, selectedColor: 'red' };
                });
                setUnavailableDates(formattedDates);
            })
            .catch(error => console.error(error));
        
    }, [route.params.paramKey]);

    // FUNÇÃO PARA RESERVAR 
    const reservar = () => {
        
        const selectedDateFormatted = selectedDate.split("-").join("/"); 

        const jsonData = {
            "usuarioId":id.toString(),
            "spaceId":spaceId.toString(), 
            "dataMarcada":selectedDateFormatted,
            "observacao":observacao
        };
        JSON.stringify(jsonData)
        console.log(jsonData)

        try {
    
            response = reserveSpace(jsonData);
            if (response) {
                navigation.navigate('SucessReserve');
            }

            // Navegue ou mostre uma mensagem de sucesso ao usuário
        } catch (error) {
            // Manipule o erro aqui
            console.error(error);
        }
    }
    
    
    // FUNÇÃO QUE FORMATA A DATA PARA VISUALIZAÇÃO DO USUÁRIO
    const formataData = (dataString) => {
        
        const [ano, mes, dia] = dataString.split('-')
        const dataFormatada = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
        return dataFormatada;
    }

   
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.calendarView}>

                <Text style={styles.title}>{espacoAtual}</Text>

               
                <Calendar 
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    minDate={dataAtual}
                    style={styles.calendar}
                    markingType={'multi-dot'}
                    markedDates={unavailableDates}
                />
            </View>
            
                {/* TEXTO INFORMANDO A DATA SELECIONADA PELO USUÁRIO */}
                {
                selectedDate && <Text style={styles.textSelectedDate}>
                    Data selecionada: {formataData(selectedDate)}
                </Text>
                }

                {/* OBSERVAÇÃO DO USUÁRIO */}
                <View style= {styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Escreva uma observação'
                        onChangeText={setObservacao}
                        
                    />
                </View>

                {/* BOTÃO RESERVAR */}
                <View style={styles.buttonView}>
                    <TouchableHighlight
                    style={styles.button}
                    onPress={reservar}
                    >
                        <Text style={styles.textButton}>RESERVAR</Text>
                    </TouchableHighlight>
                </View>
                
        </SafeAreaView>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        top: "6.67%",
        fontSize: 24,
        fontWeight: "bold",
        color: "#0b1f33",
        textAlign: "center",
        left: "0%",
        position: "absolute",
        width: "100%"
    },
    calendar: {
        top: "3%",
        borderRadius: 15,
        margin: "10%",
        height: "75%",
        elevation: 4
    },
    calendarView: {
        flex: 0.6,
        width: "100%",
    },
    inputView: {
        flex: 0.4,
        width: '80%',
    },
    input: {
        backgroundColor: "#f4f7fb",
        borderRadius: 15,
        borderColor: "#ccc",
        borderStyle: 'solid',
        borderWidth: 1,
        flex: 1,
        fontSize: 24,
        paddingLeft: 20,
        textAlignVertical: 'top',
        paddingTop: 20
    },
    buttonView: {
        flex: 0.3,
        width: "100%"
    },
    button: {
        position: 'absolute',
        backgroundColor: "#46e98f",
        width: "65%",
        height: "30%",
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        top: "35%"
    },
    textButton: {
        fontSize: 26,
        fontWeight: "700",
        color: "#fff",
        textAlign: "left"
    },
    textSelectedDate: {
        fontSize: 25,
        marginBottom: 20,
        backgroundColor: "#f4f7fb",
        borderRadius: 15,
        borderColor: "#ccc",
        borderStyle: 'solid',
        borderWidth: 1,
        width: '80%',
        paddingLeft: 20,

    }
    
});
