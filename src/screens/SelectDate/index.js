import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import 'react-native-calendars/src/types'

export default function SelectDate({route}) {
    
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.calendarView}>

                <Text style={styles.title}>{route.params.paramKey}</Text>
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
                    <Text style={styles.textButton}>RESERVAR</Text>
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
    }
    
});
