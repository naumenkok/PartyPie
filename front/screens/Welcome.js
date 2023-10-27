import React from 'react';
import { ImageBackground, View, Image, TouchableOpacity, Text } from 'react-native';
import { commonStyles } from '../styles/styles.js';
import constants from '../constants/img.js';
export default function WelcomeScreen({route, navigation}) {
    return (
        <ImageBackground source={constants.gradient} style={commonStyles.imageBackground}>
            <View style={commonStyles.container1Welcome}>
                <Image source={constants.star1} style={commonStyles.star1}/>
                <Image source={constants.present1} style={commonStyles.present1}/>
            </View>

            <View style={commonStyles.container1Welcome}>
                <Image source={constants.strawberry1} style={commonStyles.strawberry1}/>
                <Image source={constants.cake1} style={commonStyles.cake1}/>
                <Image source={constants.strawberry2} style={commonStyles.strawberry2}/>
            </View>

            <View style={commonStyles.container1Welcome}>
                <Image source={constants.logo} style={commonStyles.logo} />
            </View>

            <View style={commonStyles.container1Welcome}>
                <Image source={constants.bowtie} style={commonStyles.bowtie}/>
                <Image source={constants.star2} style={commonStyles.star2}/>
            </View>

            <View style={commonStyles.container1Welcome}>
                <Image source={constants.cake2} style={commonStyles.cake2}/>
                <Image source={constants.present2} style={commonStyles.present2}/>
            </View>

            <View style={commonStyles.button}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LogIn')}
                >
                    <Text style={[commonStyles.text, {fontSize:24}]}>log in</Text>
                </TouchableOpacity>
            </View>

            <View style={commonStyles.button}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={[commonStyles.text, {fontSize:24}]}>sign up</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}


