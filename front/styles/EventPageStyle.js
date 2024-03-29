import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

export const eventPageStyle = StyleSheet.create({
        eventPageTop:{
            flex: 3.5,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
        },
        eventNameView:{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: COLORS.red,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 45,
            marginBottom:20,
            borderRadius: 20,
        },
        eventName:{
            fontSize: 30,
            textAlign: 'center',
            marginHorizontal: 30,
            color: COLORS.white,
            fontFamily: FONTS.unique,
        },
        eventPageBottom:{
            flex: 13,
            height: '100%',
            alignItems: 'flex-end',
            alignSelf: 'stretch',
            marginHorizontal: 10,
        },
        eventPageScroll:{
            flexDirection: 'column',
            alignSelf: 'stretch',
        },
        scrollBox1:{
            height: 70,
            width: '100%',
            alignItems: 'stretch',
            justifyContent: 'center',
            alignSelf: 'stretch',
        },
        scrollBox2:{
            height: 120,
            width: '100%',
        },
        scrollBox3:{
            width: '100%',
        },
        container:{
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            height: 160,
            marginBottom: 5,
            borderWidth: 10,
            borderColor: COLORS.greenlight,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            marginHorizontal: 10,
        },
        containerWishlist:{
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            height: 'auto',
            padding: 10,
            borderWidth: 10,
            borderColor: COLORS.pink,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            marginHorizontal: 10,
        },
        horizontal: {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text:{
            fontSize: 23,
            textAlign: 'center',
            paddingLeft: 20,
            color: COLORS.green,
            fontFamily: FONTS.regular,
        },
        textWishlist:{
            fontSize: 20,
            textAlign: 'center',
            paddingTop: 5,
            paddingLeft: 15,
            color: COLORS.green,
            fontFamily: FONTS.regular,
        },
        circle: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'blue',
        },
        closeButton:{
            position: 'absolute',
            top: 5,
            right: 5,
        },
        addTask:{
            flexDirection: 'column',
            margin: 5,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 5,
            borderColor: COLORS.coral,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            padding: 10,
        },
        containerTask: {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center'
        },
        button:{
            borderRadius: 20,
            borderWidth: 5,
            borderColor: COLORS.red,
            marginTop: 25,
            paddingHorizontal: 20
        },
        status:{
            position: 'absolute',
            right: 10,
        }
});
