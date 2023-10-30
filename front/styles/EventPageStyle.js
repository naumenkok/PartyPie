import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

export const eventPageStyle = StyleSheet.create({
        eventPageTop:{
            flex: 3.5,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
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
            borderWidth: 8,
            borderColor: COLORS.white,
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
            backgroundColor: 'blue',
            justifyContent: 'center',
            //alignItems: 'stretch',
            alignSelf: 'stretch',
        },
        eventPageScroll:{
            backgroundColor: 'green',
            flex: 9,
        },
        scrollBox1:{
            flex: 3,
            backgroundColor: 'blue',
        },
        scrollBox2:{
            flex: 3,
            backgroundColor: 'pink',
        },
        scrollBox3:{
            flex: 3,
            backgroundColor: 'purple',
        },
});
