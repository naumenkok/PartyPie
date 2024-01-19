import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {eventPageStyle} from '../../styles/EventPageStyle';
import {COLORS} from "../../constants/theme";
import {faCircleCheck, faCircleQuestion, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";


export default function GuestComponent({guest, event_id}) {
    const handleDelete = () => {
        // deleteGuest(guest.guest_id, event_id);
    };
    return (
        <View>
            <View
                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5}}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    paddingRight: 35
                }}>
                    <TouchableOpacity onPress={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} size={30} style={{marginLeft:5, color: COLORS.beaver}}/>
                    </TouchableOpacity>

                    <Text style={[eventPageStyle.textWishlist, {color: COLORS.orange, marginLeft: 10}]}>
                        {guest.username}
                    </Text>
                    {guest.status === "accepted" ? (
                        <FontAwesomeIcon icon={faCircleCheck} size={30} style={[eventPageStyle.status, {color: COLORS.green}]}/>
                    ) : guest.status === "declined" ? (
                        <FontAwesomeIcon icon={faCircleXmark} size={30} style={[eventPageStyle.status, {color: COLORS.red}]}/>
                    ) : (
                        <FontAwesomeIcon icon={faCircleQuestion} size={30} style={[eventPageStyle.status, {color: COLORS.redcoral}]}/>
                    )}
                </View>
            </View>
        </View>
    );
}
