import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SelectSpace from "../screens/SelectSpace";
import SelectDate from "../screens/SelectDate";
import Home from "../screens/Home";
import Requests from "../screens/Requests";
import { CredentialContext } from "../services/CredentialsContext";
import SucessReserve from "../screens/SucessReserve";

// import StackRoutes from "./stack.routes";
const Stack = createNativeStackNavigator();

export default function Routes() {
    return(
        <CredentialContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login" >
                        {storedCredentials ? (
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{ headerShown: false }}
                            />
                            ) : (
                                <>
                                    <Stack.Screen
                                        name="Login"
                                        component={Login}
                                        options={{ headerShown: false }}
                                    />
                                </>
                            )}
                            <Stack.Screen
                                name="SelectSpace"
                                component={SelectSpace}
                                options={{ headerTitle: 'SELECIONE O ESPAÇO', headerTitleStyle : {fontFamily:'Lora-Medium', color: '#0B1F33'}}}
                                />
                            <Stack.Screen
                                name="SucessReserve"
                                component={SucessReserve}
                                options={{ headerShown: false}}
                                />
                            <Stack.Screen
                                name="SelectDate"
                                component={SelectDate}
                                options={{ headerTitle: 'SELECIONE A DATA', headerShown: true, headerTitleStyle : {fontFamily:'Lora-Medium', color: '#0B1F33'} }}
                            />
                            
                            <Stack.Screen
                                name="Requests"
                                component={Requests}
                                options={{ headerTitle: 'SOLICITAÇÕES', headerTitleStyle : {fontFamily:'Lora-Medium', color: '#0B1F33'} }}
                            />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialContext.Consumer>
    );
}