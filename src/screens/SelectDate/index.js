import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SelectDate() {
    
    return (
        <View style={styles.container}>
            <Text>SelectDate</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
