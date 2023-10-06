import React, {useState} from 'react';
import {ImageBackground, View, TouchableOpacity, Text, TextInput, Image, Platform} from 'react-native';

import { commonStyles } from '../styles/styles.js';
import constants from '../constants/img.js';
import {LinearGradient} from "expo-linear-gradient";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LogIn({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {setShowPassword(!showPassword);};


    return (
        <ImageBackground source={constants.gradient} style={commonStyles.imageBackground}>
            <View style={commonStyles.loginTop}>
                <Text style={commonStyles.text}>Welcome back!</Text>
                <View style={commonStyles.horizontal}>
                    <Text style={commonStyles.text}>log in  </Text>
                    <Text style={commonStyles.text}>|</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={[commonStyles.text, commonStyles.textInactive]}>sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={commonStyles.loginBottom}>
                <Text style={commonStyles.textSmall}>Username</Text>
                <View style={commonStyles.input}>
                    <TextInput
                        placeholder={'Enter your username ...'}
                        onChangeText={username => {
                            setUsername(username);
                        }}
                    />
                </View>
                <Text style={commonStyles.textSmall}>Password</Text>
                <View style={commonStyles.input}>
                    <TextInput
                        placeholder={'Enter password ...'}
                        secureTextEntry={!showPassword}
                        style={commonStyles.password}
                        onChangeText={password => {
                            setPassword(password);
                        }}
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        style={commonStyles.icon}
                        size={24}
                        onPress={toggleShowPassword}
                    />
                </View>

                <TouchableOpacity
                    //onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={[commonStyles.textSmall, {color:'#DCF500', fontSize:18, marginTop:10, left:90}]}>Forgot password?</Text>
                </TouchableOpacity>

                <LinearGradient
                    colors={['#ff7944', '#ff7349', '#ffc247', '#DCF500']}
                    style={[commonStyles.buttonGradient, {marginTop: 10}]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TabNavigator')}
                    >
                        <View style={commonStyles.horizontal}>
                            <Text style={commonStyles.text}>Create</Text>
                            <Image source={constants.arrow}></Image>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>

            </View>
        </ImageBackground>
    );
}


