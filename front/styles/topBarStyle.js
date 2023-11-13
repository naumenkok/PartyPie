import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

export const topBarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 5,
        borderColor: COLORS.coral,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        left: 5,
        color: 'white',
    },
    button:{
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 13,
    }
});
