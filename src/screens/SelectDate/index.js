import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TextInput, ActivityIndicator } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useContext } from 'react';
import 'react-native-calendars/src/types'
import { listUnavailableDates } from '../../services/api';
import { CredentialContext } from '../../services/CredentialsContext';
import { reserveSpace } from '../../services/api';
import { RFValue } from 'react-native-responsive-fontsize';
import { loadFonts } from '../../services/fonts';

export default function SelectDate({route}) {
    const [isLoading, setIsLoading] = useState(true);
    const [unavailableDateMessage, setUnavailableDateMessage] = useState('');
    const {setStoredCredentials, storedCredentials} = useContext(CredentialContext);
    const { id } = storedCredentials;
    const navigation = useNavigation();
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [observacao, setObservacao] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const dataAtual = new Date();
    const spaceId = route.params.paramKey;
    dataAtual.setHours(0, 0, 0, 0);
    const [fontsLoaded, setFontsLoaded] = useState(false);

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
                    formattedDates[date] = { selected: true, marked: true, selectedColor: 'red' };
                });
                setUnavailableDates(formattedDates);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
        
    }, [route.params.paramKey]);
    
    useEffect(() => {
        async function loadAppResources() {
          await loadFonts(); 
          setFontsLoaded(true);
        }
    
        loadAppResources();
      }, []);
    
      
    
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

    

    if (isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{espacoAtual}</Text>

            <View style={styles.calendarView}>

            <Calendar 
            onDayPress={(day) => {
                if (unavailableDates[day.dateString]) {
                    setUnavailableDateMessage('Data indisponível para reserva');
                    setSelectedDate(null)
                } else {
                    setUnavailableDateMessage('');
                    setSelectedDate(day.dateString);
                }
            }}
            minDate={dataAtual}
            style={styles.calendar}
            markingType={'multi-dot'}
            markedDates={unavailableDates}
            />
            </View>
            
            {/* TEXTO INFORMANDO A DATA SELECIONADA PELO USUÁRIO */}
            {
            selectedDate !== undefined && selectedDate !== null && (
                <Text style={styles.textSelectedDate}>
                    Data selecionada: {formataData(selectedDate)}
                </Text>
            )}
            

            {
            unavailableDateMessage !== '' && <Text style={styles.textUnavailableDate}>
                {unavailableDateMessage}
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
        justifyContent: 'space-between'
    },
    title: {
        flex: 0.07,
        fontSize: RFValue(20),
        fontFamily:'Lora-Medium',
        color: "#0b1f33",
        textAlign: "center",
        width: "100%",
        textAlignVertical: 'center',
    },
    calendar: {
        borderRadius: 15,
        elevation: 4,
    },
    calendarView: {
        flex: 0.45,
        width: "80%",
        height: "100%",
    },
    inputView: {
        flex: 0.25,
        width: '100%',
        height: "100%",
    },
    input: {
        borderRadius: 15,
        borderColor: "#ccc",
        borderStyle: 'solid',
        borderWidth: 1,
        fontSize: RFValue(20),
        fontFamily:'Lora-Medium',
        paddingLeft: 20,
        textAlignVertical: 'top',
        paddingTop: 10,
        width: "80%",
        height: "100%",
        alignSelf: 'center',
        backgroundColor: "#f4f7fb",
    
    },
    buttonView: {
        flex: 0.1,
        width: "100%",
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#46e98f",
        width: "65%",
        height: "70%",
        borderRadius: 20,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: RFValue(22),
        fontFamily:'Lora-Medium',
        color: "#fff",
        textAlign: "left"
    },
    textSelectedDate: {
        flex: 0.05,
        fontFamily:'Lora-Medium',
        fontSize: RFValue(20),
        marginBottom: 20,
        backgroundColor: "#f4f7fb",
        borderRadius: 15,
        borderColor: "#ccc",
        borderStyle: 'solid',
        borderWidth: 1,
        width: '80%',
        marginTop: "18%",
        paddingLeft: 20,

    },
    textUnavailableDate: {
        flex: 0.05,
        fontFamily:'Lora-Medium',
        fontSize: RFValue(20),
        marginBottom: 20,
        backgroundColor: "#f4f7fb",
        borderRadius: 15,
        borderColor: "#ccc",
        borderStyle: 'solid',
        borderWidth: 1,
        width: '80%',
        marginTop: "18%",
        paddingLeft: 20,
        color: 'red',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
});
