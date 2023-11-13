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
            marginHorizontal: 20,
            marginTop: 45,
            marginBottom:20,
            // borderWidth: 8,
            // borderColor: COLORS.white,
            borderRadius: 20,
        },
        eventName:{
            fontSize: 30,
            textAlign: 'center',
            fontWeight: 'bold',
            margin: 10,
            color: COLORS.white,
            textTransform: 'capitalize',
            fontFamily: FONTS.unique,
        },
        eventPageBottom:{
            flex: 13,
            height: '100%',
            // justifyContent: 'flex-end',
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
});
