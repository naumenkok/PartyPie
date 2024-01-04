import {StatusBar} from 'expo-status-bar';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheck, faRotate} from "@fortawesome/free-solid-svg-icons";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {COLORS} from "../constants/theme";
import {Buffer} from "buffer";

export default function MyCamera({photo, setPhoto, isCameraVisible, setCameraVisible}) {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [type, setType] = useState(CameraType.back);
    const [photoBase64, setPhotoBase64] = useState();
    const base64 = 'iVBORw0KGgoAAAANSUhEU ....'
    const buffer = Buffer.from(base64, "base64");
    const blob = new Blob([buffer], { type: '[content-type]' })


    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false,
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        console.log("typeof camera newPhoto:", typeof newPhoto);
        console.log("typeof camera newPhoto.base64:", typeof newPhoto.base64);
        // console.log(newPhoto.base64);
        setPhotoBase64(newPhoto);
        // let base64Data = newPhoto.base64;
        // const buffer = Buffer.from(base64Data, "base64");
        // const newBlob = new Blob([buffer], { type: 'image/png' });
        // console.log("typeof newBlob:", typeof newBlob);
        // // console.log(newBlob);
        // setPhoto(newBlob);
        setPhoto(newPhoto.base64);
    };

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    if (photoBase64) {
        let savePhoto = () => {
            setCameraVisible(!isCameraVisible);
            MediaLibrary.saveToLibraryAsync(photoBase64.uri).then(() => {
                // setPhotoBase64(undefined);
                // setPhoto(undefined);
            });
        };

        return (
            <SafeAreaView style={[styles.container, {flexDirection: 'column',}]}>
                <Image style={styles.preview} source={{uri: "data:image/jpg;base64," + photoBase64.base64}}/>
                {hasMediaLibraryPermission ? (
                    <TouchableOpacity onPress={savePhoto} style={styles.rotate}>
                        <FontAwesomeIcon icon={faCheck} size={40} style={{color: COLORS.white}}/>
                    </TouchableOpacity>
                ) : undefined}
                <TouchableOpacity onPress={() => {setPhotoBase64(undefined); setPhoto(undefined);}} style={styles.discard}>
                    <FontAwesomeIcon icon={faCircleXmark} size={40} style={{color: COLORS.white}}/>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <Camera type={type} style={styles.container} ref={cameraRef}>
            <TouchableOpacity onPress={() => { setCameraVisible(!isCameraVisible); setPhotoBase64(undefined); setPhoto(undefined);
            }} style={styles.discard}>
                <FontAwesomeIcon icon={faCircleXmark} size={40} style={{color: COLORS.white}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType} style={styles.rotate}>
                <FontAwesomeIcon icon={faRotate} size={40} style={{color: COLORS.white}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePic} style={styles.buttonContainer}>
                <View style={styles.button}/>
            </TouchableOpacity>
            <StatusBar style="auto"/>
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: 'black',
        alignSelf: 'flex-end',
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        height: 58,
        width: 58,
        borderRadius: 29,
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    discard: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    rotate: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
});