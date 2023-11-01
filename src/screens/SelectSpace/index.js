import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';

export default function SelectSpace() {

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.itemList}>
                <View style={styles.viewImage}>
                    <Image 
                    style={styles.iconSpace} 
                    source={require('../../img/IconSpace.png')}/>
                </View>
                <TouchableHighlight 
                style={styles.button}
                onPress={ () => navigation.navigate('SelectDate', {paramKey: '1'})}
                >
                    <Text style={styles.textButton}>CHURRASQUEIRA 1</Text>
                </TouchableHighlight>
            </View>

            <View style={styles.itemList}>
                <View style={styles.viewImage}>
                    <Image 
                    style={styles.iconSpace} 
                    source={require('../../img/IconSpace.png')}/>
                </View>
                <TouchableHighlight 
                style={styles.button}
                onPress={ () => navigation.navigate('SelectDate', {paramKey: '2'})}
                >   
                    <Text style={styles.textButton}>CHURRASQUEIRA 2</Text>
                </TouchableHighlight>
            </View>

            <View style={styles.itemList}>
                <View style={styles.viewImage}>
                    <Image 
                    style={styles.iconSpace} 
                    source={require('../../img/IconSpace.png')}/>
                </View>
                <TouchableHighlight 
                style={styles.button}
                onPress={ () => navigation.navigate('SelectDate', {paramKey: '3'})}
                >   
                    <Text style={styles.textButton}>SALÃO DE FESTAS</Text>
                </TouchableHighlight>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    itemList: {
        flex: 0.1,
        borderStyle: 'solid',
        borderColor: "#000001",
        borderBottomWidth: 0.4,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    iconSpace:{
        position: 'absolute',
        height: "40%",
        width: "40%",
        resizeMode: 'contain',
    },
    textButton: {
        marginLeft: 0,
        fontSize: 24,
        fontWeight: "300",
        textAlign: 'left',
        color: '#0B1F33'
    },
    viewImage:{
        flex: 0.2,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        flex: 0.8,
        width: "100%",
        height: '100%',
        alignSelf: "center",
        justifyContent: 'center',
    }
});
