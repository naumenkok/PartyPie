import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from "react-native";
import { postStyle } from '../../styles/postStyle';
import constants from '../../constants/img.js';
import {getUsernameByID} from "../../services/apiUser";
import {deleteComment} from "../../services/apiPosts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {COLORS} from "../../constants/theme";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Buffer} from "buffer";

export default function Comment({ comment_id, user_id, text, post_date, image, isLoading, setLoading}) {
    const [username, setUsername] = useState('');
    const [isCommentCreator, setIsCommentCreator] = useState(false);

    useEffect(()=>{
        if (image) {
            console.log("typeof comment image:", typeof image);
        }

    },[comment_id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username =  await getUsernameByID(user_id);
                setUsername(username);
            } catch (error) {
                console.error(error);
            }
        };

        (async () => {
            try {
                await fetchData();
            } catch (error) {
                console.error('error', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [isLoading]);

    const handleDelete = async () => {
        try {
            await deleteComment(comment_id);
        } catch (error) {
            console.error(error);
        } finally
        {
            setLoading(true);
        }
    };

    useEffect(() => {
        const checkIsCreatorOfComment = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                setIsCommentCreator(userId == user_id);
            } catch (error) {
                console.error(error);
            }
        };
        (async () => {
            try {
                await checkIsCreatorOfComment();
            } catch (error) {
                console.error('error', error);
            }
        })();
    }, [isLoading]);

    return(
        <View style={postStyle.postContainer}>
            <View style={postStyle.horizontal}>
                <View style={postStyle.horizontal}>
                    <Image source={constants.smile}></Image>
                    <Text style={[postStyle.name, postStyle.text]}>{username}</Text>
                </View>
                <View style={postStyle.horizontal}>
                    <Text style={[postStyle.name, postStyle.text, {textAlign: 'right'}]}>{post_date.split('T')[0]}</Text>
                    {isCommentCreator &&
                        <TouchableOpacity onPress={handleDelete}>
                            <FontAwesomeIcon icon={faTrashCan} size={24} style={{ color: COLORS.grey }} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <Text style={[postStyle.text, postStyle.postText]}>{text}</Text>
            {image && <Image style={{height: 400 , width: 300, alignSelf: 'center'}} source={{uri: "data:image/jpg;base64," + image}}/>}


            {/*{image && <Text style={[postStyle.text, postStyle.postText]}>{text}</Text>}*/}

            {/*    reader.readAsDataURL(blob.blob);*/}
        </View>
    );
}