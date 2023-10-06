import React, {useState} from 'react';
import {ImageBackground, View, TouchableOpacity, Text, TextInput, Image, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles } from '../styles/styles.js';
import constants from '../constants/img.js';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {modalStyles} from "../styles/modalWindowsStyle";
export default function SignUp({navigation}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const toggleShowPassword1 = () => {setShowPassword1(!showPassword1);};
    const toggleShowPassword2 = () => {setShowPassword2(!showPassword2);};

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    return (
        <ImageBackground source={constants.gradient} style={commonStyles.imageBackground}>
            <View style={commonStyles.loginTop}>
                <Text style={commonStyles.text}>Create your account</Text>
                <View style={commonStyles.horizontal}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LogIn')}
                    >
                        <Text style={[commonStyles.text, commonStyles.textInactive]}>log in  </Text>
                    </TouchableOpacity>
                    <Text style={commonStyles.text}>|</Text>
                    <Text style={commonStyles.text}>sign up</Text>
                </View>
            </View>
            <View style={commonStyles.loginBottom}>
                <Text style={commonStyles.textSmall}>First name</Text>
                <View style={commonStyles.input}>
                    <TextInput
                        placeholder={'Enter your first name ...'}
                        onChangeText={firstname => {
                            setFirstname(firstname);
                        }}
                    />
                </View>
                <Text style={commonStyles.textSmall}>Last name</Text>
                <View style={commonStyles.input}>
                    <TextInput
                        placeholder={'Enter your last name ...'}
                        onChangeText={lastname => {
                            setLastname(lastname);
                        }}
                    />
                </View>
                <Text style={commonStyles.textSmall}>Username</Text>
                <View style={commonStyles.input}>
                    <TextInput
                        placeholder={'Enter your username ...'}
                        onChangeText={username => {
                            setUsername(username);
                        }}
                    />
                </View>
                <Text style={commonStyles.textSmall}>Email</Text>
                <View style={commonStyles.input}>
                    <TextInput
                        placeholder={'Enter your email ...'}
                        onChangeText={email => {
                            setEmail(email);
                        }}
                    />
                </View>
                <Text style={commonStyles.textSmall}>Password</Text>
                <View style={commonStyles.input}>
                    <TextInput
                        placeholder={'Enter password ...'}
                        secureTextEntry={!showPassword1}
                        style={commonStyles.password}
                        onChangeText={password => {
                            setPassword(password);
                        }}
                    />
                    <MaterialCommunityIcons
                        name={showPassword1 ? 'eye-off' : 'eye'}
                        style={commonStyles.icon}
                        size={24}
                        onPress={toggleShowPassword1}
                    />
                </View>
                <Text style={commonStyles.textSmall}>Confirm password</Text>
                <View style={commonStyles.input}>
                    <TextInput
                        placeholder={'Confirm password ...'}
                        secureTextEntry={!showPassword2}
                        style={commonStyles.password}
                        onChangeText={password2 => {
                            setPassword2(password2);
                        }}
                    />
                    <MaterialCommunityIcons
                        name={showPassword2 ? 'eye-off' : 'eye'}
                        style={commonStyles.icon}
                        size={24}
                        onPress={toggleShowPassword2}
                    />
                </View>

                <LinearGradient
                    colors={['#FF6D4B', '#FF6059', '#FFC247', '#DCF500']}
                    style={commonStyles.buttonGradient}
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


