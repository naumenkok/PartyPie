import React, {useEffect, useState} from 'react';
import {Linking, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import {eventPageStyle} from '../../styles/EventPageStyle';
import {COLORS, FONTS} from "../../constants/theme";
import {getWishesByEventId} from "../../services/apiWishlist";
import Checkbox from 'expo-checkbox';
import {deleteTask, toggleStatusById, updateName} from '../../services/apiTasks';
import {faPencil, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {modalStyles} from "../../styles/modalWindowsStyle";
import {faTrashCan, faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deleteEventByEventId} from "../../services/apiEvent";
import {getAllSubBudgets} from "../../services/apiBudget";


export default function BudgetComponent({ budget, isLoading, setLoading }) {
    const [budgetSubCat, setBudgetSubCat] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const budgetSubCat = await getAllSubBudgets(budget.budget_id);
                setBudgetSubCat(budgetSubCat);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [isLoading]);
    const handleDelete = () => {
        // Handle delete logic
    };

    return (
        <View style={{ marginBottom: 20}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 35 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 43 }}>
                    <Text style={[eventPageStyle.textWishlist, { color: COLORS.red }]}>
                        {budget.name}
                    </Text>
                </View>
                <Text style={[eventPageStyle.textWishlist, { color: COLORS.red, position: 'absolute', right: 45 }]}>
                    {budget.cost}$
                </Text>
                <TouchableOpacity onPress={handleDelete} style={{ position: 'absolute', right: 5 }}>
                    <FontAwesomeIcon icon={faTrashCan} size={24} style={{ color: COLORS.beaver }} />
                </TouchableOpacity>
            </View>
            {budgetSubCat.length > 0 ? (
                budgetSubCat.map((budgetSubCat) => (
                    <View key={budgetSubCat.subcategory_id} style={{ alignSelf: 'stretch', marginLeft:15, marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 43 }}>
                            <Text style={[eventPageStyle.textWishlist, { color: COLORS.pink,
                                fontSize: 16 }]}>
                                {budgetSubCat.name}
                            </Text>
                        </View>
                        <Text style={[eventPageStyle.textWishlist, { color: COLORS.pink, fontSize: 16, position: 'absolute', right: 45 }]}>
                            {budgetSubCat.cost}$
                        </Text>
                        <TouchableOpacity onPress={handleDelete} style={{ position: 'absolute', right: 5 }}>
                            <FontAwesomeIcon icon={faPencil} size={20} style={{ color: COLORS.beaver }} />
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <View style={{ alignSelf: 'stretch' }}>
                </View>
            )}
        </View>
    );
}

