import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar'
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';

export default function SelectDate({route}) {
    
    const [showModal] = useState(true);
    const navigation = useNavigation();
    const diasReservados = ['2023-09-12', '2023-09-13', '2023-09-14', '2023-09-15'];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.calendarView}>
                <Calendar 
                    style={styles.calendar}
                    markingType={'multi-dot'}
                    markedDates={{
                        '2023-09-12': { 
                        selected: true, 
                        selectedColor: 'lightgreen', 
                        selectedTextColor: 'black'
                    }, '2023-09-13': { 
                        selected: true, 
                        selectedColor: 'lightgreen', 
                        selectedTextColor: 'black'
                    },
                    '2023-09-14': { 
                        selected: true, 
                        selectedColor: 'lightgreen', 
                        selectedTextColor: 'black'
                    }
                    }}
                />
            </View>
            <View style= {styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='Escreva uma observação'
                />
            </View>
            <View style={styles.buttonView}>
                <TouchableHighlight
                style={styles.button}
                >
                    <Text>RESERVAR</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendar: {
        borderRadius: 15,
        margin: "10%",
    },
    calendarView: {
        flex: 1,
    },
    inputView: {
        flex: 0.8,
        width: '85%',
        backgroundColor: "#0730ED"
    },
    input: {
        backgroundColor: "#f4f7fb",
        borderRadius: 15,
        borderColor: "#ccc",
        borderStyle: 'solid',
        borderWidth: 1,
        flex: 1
    },
    buttonView: {
        flex: 0.3
    }
    
});
