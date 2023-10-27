import React, {useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ActivityIndicator, Text} from 'react-native';
import AppNavigator from './navigation/Navigator';
import {Asset} from "expo-asset";
const Stack = createNativeStackNavigator();
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

const fonts = () => Font. loadAsync ( {
    'rocko': require('./assets/fonts/RockoUltraFLF.ttf'),
    'rocko-bold': require('./assets/fonts/RockoUltraFLF-Bold.ttf'),
    'kot': require('./assets/fonts/KeeponTruckin.ttf'),
});

function useImages(images) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        Asset.loadAsync(images)
            .then(() => setLoaded(true))
            .catch(setError);
    }, []);

    return [loaded, error];
}


export default function App() {
    const [imagesLoaded] = useImages([
        require('./assets/img/gradient.jpg'),
    ]);
    const [font, setFont] = useState( false) ;

    useEffect(() => {
        SplashScreen.preventAutoHideAsync()
            .then(() => fonts())
            .then(() => setFont(true))
            .catch((error) => console.error(error))
            .finally(() => {
                SplashScreen.hideAsync();
            });
    }, []);

    if (!imagesLoaded) {
        <ActivityIndicator size="large" color="#00ff00" />
    }
    if(font){
        return (
            <AppNavigator />
        );
    }
    else {
        return (
            null
            // <Text>SplashScreen Demo! 👋</Text>
            //  <AppLoading startAsync={fonts} onFinish={() => setFont(true)} onError={(error) => console.log(error)} />
        );
    }
}