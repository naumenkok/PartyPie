import React from 'react';
import {View} from 'react-native';
import {modalStyles} from "../styles/modalWindowsStyle";
import {COLORS, FONTS} from "../constants/theme";
import { SelectList } from 'react-native-dropdown-select-list'


export default function TypeList ({setSelected}) {
    const data = [
        {key:'1', value:'Birthday', },
        {key:'2', value:'Home party'},
        {key:'3', value:'Corporate event'},
        {key:'4', value:'Wedding', },
        {key:'5', value:'Workshops '},
        {key:'6', value:'Hosting'},
        {key:'7', value:'Stag/Hen Party'},
        {key:'8', value:'Another'},
    ]

    return (
        <View >
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    fontFamily= {FONTS.regular}
                    data={data}
                    save="value"
                    boxStyles={modalStyles.input}
                />
        </View>
    );
};
