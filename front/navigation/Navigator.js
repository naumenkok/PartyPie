import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../screens/Welcome';
import LogIn from '../screens/LogIn';
import SignUp from "../screens/SignUp";
import Events from "../screens/Events";
import MyEvents from "../screens/MyEvents";
import Profile from "../screens/Profile";
import BottomTabBar from "../components/BottomTab";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props}/>}>
            <Tab.Screen
                name="Events"
                component={Events}
                options={{headerShown: false, animation: 'none'}}
            />
            <Tab.Screen
                name="MyEvents"
                component={MyEvents}
                options={{headerShown: false, animation: 'none'}}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false, animation: 'none'}}
            />
        </Tab.Navigator>
    );
};

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ animationEnabled: false, animationTypeForReplace: 'pop', stackPresentation: 'transparentModal'}}>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
                name="Events"
                component={Events}
                options={{headerShown: false, animation: 'none'}}
            />
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{headerShown: false, animation: 'none'}}
            />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;

