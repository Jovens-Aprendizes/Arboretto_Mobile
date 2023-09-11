import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SelectSpace from "../screens/SelectSpace";
import SelectDate from "../screens/SelectDate";
import Home from "../screens/Home";
import Requests from "../screens/Requests";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SelectSpace"
                component={SelectSpace}
                options={{ headerTitle: 'SELECIONE O ESPAÇO' }}
            />

            <Stack.Screen
                name="SelectDate"
                component={SelectDate}
            />

            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerTitle: "SAIR", headerBackImageSource: require('../img/LogOut.png') }}
            />

            <Stack.Screen
                name="Requests"
                component={Requests}
                options={{ headerTitle: 'SOLICITAÇÕES' }}
            />
        </Stack.Navigator>
    );
}