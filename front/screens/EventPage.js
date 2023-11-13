import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { eventPageStyle } from '../styles/EventPageStyle';
import constants from '../constants/img.js';
import {commonStyles} from "../styles/styles";
import Post from "../components/Post";
import {getEventByEventId} from "../services/api";
import {addPost, getPostsByEventId} from "../services/apiPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {postStyle} from "../styles/postStyle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCamera, faCommentDots, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../constants/theme";
import {PacmanIndicator} from 'react-native-indicators';
import TopBar from "../components/TopBar";

export default function EventPage({navigation}) {
    const [event, setEvent] = useState();
    const [posts, setPosts] = useState([]);
    const [isLongLoading, setIsLongLoading] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Clock');
    const [post, setPost] = useState('');
    const [height, setHeight] = useState(0);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        const fetchData = async () => {
            await delay(2000);
            try {
                const eventId = await AsyncStorage.getItem('eventId');
                const event =  await getEventByEventId(eventId);
                setEvent(event);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLongLoading(false);
            }
        };
        fetchData();
    }, [isLongLoading]);


    useEffect(() => {
        const fetchData = async () => {
            await delay(2000);
            try {
                const eventId = await AsyncStorage.getItem('eventId');
                const posts =  await getPostsByEventId(eventId);
                setPosts(posts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [isLoading]);

    const fetchAddPost = async () => {
        try {
            const eventId = await AsyncStorage.getItem('eventId');
            const userId = await AsyncStorage.getItem('userId');
            await addPost(eventId, userId, post);
            setPost('');
            setLoading(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSend = async () => {
        setIsLongLoading(true);
        try {
            await fetchAddPost();
            setPost('');
        } catch (error) {
            console.error(error);
        }
        //setIsLongLoading(false);
    };

    if (isLongLoading) {
        return (
            <View style={commonStyles.loadingView}>
                <PacmanIndicator color={COLORS.red} size={100}/>
                <Text style={{color: 'red'}}>Loading...</Text>
            </View>
        );
    } else {
    return (
        <ImageBackground source={constants.gradientBright} style={commonStyles.imageBackground} >
            <View style={eventPageStyle.eventPageTop}>
                <View style={eventPageStyle.eventNameView}>
                    <Text style={eventPageStyle.eventName}>{event.name}</Text>
                </View>
            </View>
            <View style={eventPageStyle.eventPageBottom}>
                <ScrollView style={eventPageStyle.eventPageScroll}>
                    <View style={eventPageStyle.scrollBox1}>
                        <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </View>
                    <View style={eventPageStyle.scrollBox2}></View>
                    <View style={eventPageStyle.scrollBox3}>
                        <View style={postStyle.postContainer}>
                            <View style={postStyle.horizontal}>
                                <View style={[postStyle.input, {width: '90%'}]}>
                                    <TextInput
                                        multiline={true}
                                        placeholder={'Add post'}
                                        onChangeText={post => {
                                            setPost(post);
                                        }}
                                        onContentSizeChange={(event) =>
                                            setHeight(event.nativeEvent.contentSize.height)
                                        }
                                        style={[postStyle.inputText, { height: Math.max(20, height)}]}
                                    />
                                    <TouchableOpacity onPress={handleSend} style={postStyle.icon}>
                                        <FontAwesomeIcon icon={faPaperPlane} size={24} color={COLORS.grey}/>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={()=>{}} style={postStyle.photo}>
                                    <FontAwesomeIcon icon={faCamera} size={24} color={COLORS.grey}/>
                                </TouchableOpacity>
                            </View>
                        </View>



                        {posts.length > 0 ? (posts.map((post, index) => (
                            <Post
                                key={index}
                                post_id={post.post_id}
                                user_id={post.user_id}
                                text={post.text}
                                post_date={post.date}
                                isLoading = {isLoading}
                                setLoading={setLoading}
                            />
                        ))):(<Text style={[postStyle.inputText, {color:COLORS.beaver}]}>No posts yet</Text>)}
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}}
