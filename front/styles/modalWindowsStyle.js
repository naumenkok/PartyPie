import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

export const modalStyles = StyleSheet.create({
    title:{
        fontSize: 20,
        margin: 5,
        color: COLORS.coral,
        textTransform: 'uppercase',
        fontFamily: FONTS.regular,
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: COLORS.cream,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    submitButton: {
        backgroundColor: COLORS.coral,
        padding: 10,
        borderRadius: 10,
    },
    submitButtonText: {
        fontSize: 18,
        color: 'white',
        fontFamily: FONTS.regular,
    },
    codeFieldRoot: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 3,
        borderColor: COLORS.orange,
        borderRadius: 8,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});