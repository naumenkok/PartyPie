import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

export const postStyle = StyleSheet.create({
    postContainer:{
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        height: 'auto',
        paddingHorizontal: 10,
        paddingBottom: 5,
        marginBottom: 5,
        borderWidth: 5,
        borderColor: COLORS.greenlight,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    horizontal:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    text:{
        fontFamily: FONTS.regular,
        fontSize: 16,
    },
    inputText:{
        fontFamily: FONTS.regular,
        fontSize: 15,
        marginRight: 30,
        alignSelf: 'center',
    },
    name:{
        textTransform: 'capitalize',
        color:COLORS.green,
        marginLeft: 5,
    },
    postText:{
        color:COLORS.greendark,
    },
    input:{
        marginVertical: 5,
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: COLORS.green,
        borderRadius: 20,
    },
    icon:{
        position: 'absolute',
        right: 10,
        bottom: 5,
        paddingLeft: 10,
    },
    photo:{
        position: 'absolute',
        right: 0,
        paddingLeft: 10,
    },
    comment:{
        position: 'absolute',
        right: 35,
        paddingLeft: 10,
    },
});
