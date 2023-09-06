import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SelectSpace from "../screens/SelectSpace";
import SelectDate from "../screens/SelectDate";

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
            />

            <Stack.Screen
                name="SelectDate"
                component={SelectDate}
            />
        </Stack.Navigator>
    );
}