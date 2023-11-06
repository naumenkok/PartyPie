import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from "react-native";
import { postStyle } from '../styles/postStyle';
import { BlurView } from 'expo-blur';
import constants from '../constants/img.js';
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {commonStyles} from "../styles/styles";
import {getMyFutureEvents, getMyPastEvents, getUsernameByID} from "../services/api";

export default function Post({ post_id, user_id, text, post_date, image}) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username =  await getUsernameByID(user_id);
                setUsername(username);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return(
        <View style={postStyle.postContainer}>
            <View style={postStyle.horizontal}>
                <View style={postStyle.horizontal}>
                    <Image source={constants.smile}></Image>
                    <Text style={[postStyle.name, postStyle.text]}>{username}</Text>
                </View>
                <Text style={[postStyle.name, postStyle.text, {textAlign: 'right'}]}>2023-03-12</Text>
            </View>
            <Text style={[postStyle.text, postStyle.postText]}>{text}</Text>
        </View>
    );
}