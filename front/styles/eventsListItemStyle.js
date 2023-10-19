import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

export const itemStyle = ({ backgroundColor}) => {
    return StyleSheet.create({
        textEventsName:{
            fontSize: 24,
            fontWeight: 'bold',
            margin: 10,
            marginRight: 80,
            color: backgroundColor,
            textTransform: 'capitalize',
            fontFamily: FONTS.unique,
        },
        textEventsDate:{
            alignSelf: 'flex-end',
            fontSize: 18,
            fontWeight: 'bold',
            marginRight: 10,
            marginBottom: 10,
            color: backgroundColor,
            fontFamily: FONTS.unique,
        },
        eventItem:{
            height: 125,
            width: 350,
            borderColor: backgroundColor,
            borderWidth: 8,
            alignItems: 'flex-start',
            margin: 5,
            borderRadius: 20,
            overflow: 'hidden',
        },
        blur:{
            height: '100%',
            width: '100%',
        },
        gradient:{
            height: '100%',
            width: '100%',
        }
    });
};
