import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {eventPageStyle} from '../../styles/EventPageStyle';
import Post from "../smallComponents/Post";
import {addPost, getPostsByEventId} from "../../services/apiPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {postStyle} from "../../styles/postStyle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCamera, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../../constants/theme";
import MyCamera from "../Camera";

export default function PostPageComponent() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [post, setPost] = useState('');
    const [height, setHeight] = useState(0);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [photo, setPhoto] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventId = await AsyncStorage.getItem('eventId');
                const posts = await getPostsByEventId(eventId);
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
            if (photo){
                console.log("try to add post with photo");
                const photoForPost = photo;
                //await addPost(eventId, userId, post, photoForPost);
            } else {
                console.log("without photo");
                await addPost(eventId, userId, post);
            }
            // await addPost(eventId, userId, post);
            setPost('');
            setLoading(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSend = async () => {
        try {
            await fetchAddPost();
            setPost('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={eventPageStyle.scrollBox3}>
            <View style={postStyle.postContainer}>
                <View style={postStyle.horizontal}>
                    <View style={[postStyle.input, {width: '90%'}]}>
                        <TextInput
                            multiline={true}
                            placeholder={'Add post'}
                            value={post}
                            onChangeText={post => {
                                setPost(post);
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
                    <TouchableOpacity onPress={() => {setCameraVisible(!isCameraVisible)}} style={postStyle.photo}>
                        <FontAwesomeIcon icon={faCamera} size={24} color={COLORS.grey}/>
                    </TouchableOpacity>
                </View>
                {isCameraVisible && <View style={{width: '100%', height: 500, backgroundColor: 'black'}}>
                    <MyCamera photo={photo} setPhoto={setPhoto} isCameraVisible={isCameraVisible} setCameraVisible={setCameraVisible}></MyCamera>
                </View>}
            </View>
            {posts.length > 0 ? (posts.map((post, index) => (
                <Post
                    key={index}
                    post_id={post.post_id}
                    user_id={post.user_id}
                    text={post.text}
                    post_date={post.date}
                    isLoading={isLoading}
                    setLoading={setLoading}
                />
            ))) : (<Text style={[postStyle.inputText, {color: COLORS.beaver}]}>No posts yet</Text>)}
        </View>
    );
}
