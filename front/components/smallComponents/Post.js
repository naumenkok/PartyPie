import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from "react-native";
import { postStyle } from '../../styles/postStyle';
import constants from '../../constants/img.js';
import {addComment, addPost, deletePost, getCommentsByPostId} from "../../services/apiPosts";
import {getUsernameByID} from "../../services/apiUser";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../../constants/theme";
import Comment from "./Comment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import MyCamera from "../Camera";
import {Buffer} from "buffer";
import {CameraType} from "expo-camera";

export default function Post({ post_id, user_id, text, post_date, image, isLoading, setLoading}) {
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [photo, setPhoto] = useState();
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [height, setHeight] = useState(0);
    const [isCommentActive, setCommentActive] = useState(false);
    const [isAllComments, setAllComments] = useState(true);
    const [comments, setComments] = useState([]);
    const [isPostCreator, setIsPostCreator] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username =  await getUsernameByID(user_id);
                setUsername(username);
                const comments =  await getCommentsByPostId(post_id);
                setComments(comments);
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
    }, [isCommentActive, isAllComments, isLoading]);

    const fetchAddComment = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (photo){
                console.log("try to add post with photo");
                const photoForPost = photo;
                await addComment(post_id, userId, comment, photoForPost);
            } else {
                console.log("without photo");
                await addComment(post_id, userId, comment);
            }
            setComment('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSend = async () => {
        try {
            setComment('');
            await fetchAddComment();
            setCameraVisible(!isCameraVisible);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(true);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(post_id);
        } catch (error) {
            console.error(error);
        } finally
        {
            setLoading(true);
        }
    };

    useEffect(() => {
        const checkIsCreatorOfPost = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                setIsPostCreator(userId == user_id);
            } catch (error) {
                console.error(error);
            }
        };
        checkIsCreatorOfPost();
    }, [isLoading]);

    return(
        <View style={postStyle.postContainer}>
            <View style={postStyle.horizontal}>
                <View style={postStyle.horizontal}>
                    <Image source={constants.smile}></Image>
                    <Text style={[postStyle.name, postStyle.text]}>{username}</Text>
                </View>
                <View style={postStyle.horizontal}>
                <Text style={[postStyle.name, postStyle.text, {textAlign: 'right', right: 10}]}>{post_date.split('T')[0]}</Text>
                {isPostCreator &&
                    <TouchableOpacity onPress={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} size={24} style={{ color: COLORS.grey }} />
                    </TouchableOpacity>
                }
                </View>
            </View>
            <Text style={[postStyle.text, postStyle.postText]}>{text}</Text>

            <View style={postStyle.horizontal}>
                <View style={[postStyle.input, {width: isCommentActive===true? '90%':'80%'}]}>
                    <TextInput
                        multiline={true}
                        placeholder={'Enter comment ...'}
                        value={comment}
                        onChangeText={comment => {
                            setComment(comment);
                            setCommentActive(true);
                        }}
                        onContentSizeChange={(event) =>
                            setHeight(event.nativeEvent.contentSize.height)
                        }
                        style={[postStyle.inputText]}
                    />
                    <TouchableOpacity onPress={handleSend} style={postStyle.icon}>
                        <FontAwesomeIcon icon={faPaperPlane} size={24} color={COLORS.grey}/>
                    </TouchableOpacity>
                </View>
                <View style={postStyle.horizontal}>
                    <TouchableOpacity onPress={() => {setCameraVisible(!isCameraVisible)}} style={postStyle.photo}>
                        <FontAwesomeIcon icon={faCamera} size={24} color={COLORS.grey}/>
                    </TouchableOpacity>
                    {!isCommentActive && <TouchableOpacity onPress={()=>{setAllComments(!isAllComments)}} style={postStyle.comment}>
                        <FontAwesomeIcon icon={faCommentDots} size={24} color={COLORS.grey}/>
                    </TouchableOpacity>}
                </View>
                {/*{image && <Image style={{height: 70, width: 70,}} source={{uri:`data:image/jpg;base64,${Buffer.from(image.data).toString('base64')}`}}/>}*/}

                {/*{image && <Image style={{height: 70, width: 70,}} source={{uri:`data:image/jpg;base64,${Buffer.from(image.data).toString('base64')}`}}/>}*/}

            </View>
            {isCameraVisible && <View style={{width: '100%', height: 500, backgroundColor: 'black'}}>
                <MyCamera photo={photo} setPhoto={setPhoto} isCameraVisible={isCameraVisible} setCameraVisible={setCameraVisible}></MyCamera>
            </View>}
            {isAllComments && (
                <View>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => {
                            return (
                                <Comment
                                    key={index}
                                    comment_id={comment.comment_id}
                                    user_id={comment.user_id}
                                    text={comment.text}
                                    post_date={comment.date}
                                    image={comment.image}
                                    isLoading={isLoading}
                                    setLoading={setLoading}
                                />
                            );
                        })
                    ) : (
                        <Text style={[postStyle.inputText, { color: COLORS.grey }]}>
                            No comments yet
                        </Text>
                    )}
                </View>
            )}

        </View>
    );
}