import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

export const itemStyle = ({ backgroundColor, textColor}) => {
    return StyleSheet.create({
        textEventsName:{
            fontSize: 24,
            fontWeight: 'bold',
            margin: 10,
            marginRight: 80,
            color: textColor,
            textTransform: 'capitalize',
            fontFamily: FONTS.unique,
        },
        textEventsDate:{
            alignSelf: 'flex-end',
            fontSize: 18,
            fontWeight: 'bold',
            marginRight: 10,
            marginBottom: 10,
            color: textColor,
            fontFamily: FONTS.unique,
        },
        eventItem:{
            backgroundColor: backgroundColor,
            height: 125,
            width: 350,
            borderRadius: 20,
            borderColor: (backgroundColor == COLORS.white) ? textColor : backgroundColor,
            borderWidth: 8,
            alignItems: 'flex-start',
            margin: 5,
        },
    });
};
