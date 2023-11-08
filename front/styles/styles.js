import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

export const commonStyles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    empty:{flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: COLORS.beige},

    //img for welcome screen
    logo: {
        top: 70,
        width: 320,
        height: 75,
    },
    cake1: {
        top: 40,
        right: 20,
    },
    cake2: {
        top: 5,
        right: 45,
    },
    present1: {
        top: 35,
        left: 15,
        width: 115,
        height: 122,
    },
    present2: {
        top: 40,
        left: 3,
    },
    bowtie:{
        top: 75,
        right: 30,
    },
    strawberry1: {
        top: 90,
        right: 20,
    },
    strawberry2: {
        top: 110,
        left: 10,
    },
    star1: {
        top: 55,
        right: 20,
    },
    star2: {
        top: 65,
        right: 35,
    },
    icon:{
        left: 65,
        color: COLORS.beaver,
    },

    //text
    text:{
        fontSize: 30,
        margin: 5,
        color: COLORS.white,
        textTransform: 'uppercase',
        fontFamily: FONTS.regular,
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: COLORS.coral,
    },
    textInactive: {
        opacity: 0.7,
    },
    textSmall:{
        color: COLORS.beige,
        alignSelf: 'flex-start',
        left: 40,
        fontSize: 16,
    },
    name:{
        fontSize: 30,
        textTransform: 'uppercase',
        color:COLORS.orange,
        textAlign: 'center',
        fontFamily: FONTS.unique,
        marginVertical: 10,
    },
    tabBarText: {
        fontSize: 14,
        color: COLORS.white,
        fontFamily: FONTS.regular,
    },
    button: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 60,
        bottom: 5,
        margin: 10,
        marginHorizontal: 40,
        borderWidth: 5,
        borderColor: COLORS.white,
        borderRadius: 20,
    },
    buttonProfile:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        height: 110,
        width: 170,
        bottom: 5,
        margin: 10,
        marginHorizontal: 40,
        borderWidth: 10,
        borderColor: COLORS.coral,
        borderRadius: 20,
    },
    buttonProfileLogOut:{
        alignSelf: 'flex-end',
        marginHorizontal: -10,
        borderColor: COLORS.greendark,
        marginTop: 30,
        marginBottom: 15,
        borderWidth: 7,
        height: 50,
        width: 100,
    },
    buttonGradient:{
        height: 47,
        width: 250,
        marginVertical: 20,
        marginHorizontal: 30,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    input:{
        height: 47,
        marginVertical: 5,
        marginHorizontal: 30,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: COLORS.white,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        opacity: 0.6,
    },
    password:{
        left: (Platform.OS === 'ios') ? 10 : 30,
    },
    bottomTabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingTop: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginHorizontal: 5,
        height: 85,
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
    },

    //containers
    container1Welcome: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    loginTop: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    loginBottom: {
        flex: 7,
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: 20,
    },
    eventsTop:{
        flex: 3.1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    eventsMiddle:{
        flex: 12.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventsBottom:{
        flex: 1.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileTop:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 60,
    },
    profileBottom:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
    },
    horizontal: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    viewBackground:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    blur:{
        height: '100%',
        width: '100%',
    },
});
