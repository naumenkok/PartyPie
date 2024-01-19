import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Linking, ScrollView} from 'react-native';
import {eventPageStyle} from '../../styles/EventPageStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faLocationDot, faUserTie, faGift, faImages, faClock, faPencil} from "@fortawesome/free-solid-svg-icons";
import {COLORS, FONTS} from "../../constants/theme";
import {getDaysUntilEvent, getEventByEventId} from "../../services/apiEvent";
import {faCheckCircle, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import WishListComponent from "../WishListComponent";
import Cam from "../Camera";
import MyCamera from "../Camera";
import {commonStyles} from "../../styles/styles";
import {PacmanIndicator} from "react-native-indicators";
import TaskComponent from "../smallComponents/TaskComponent";
import {modalStyles} from "../../styles/modalWindowsStyle";
import {SelectList} from "react-native-dropdown-select-list";
import {getAllBudgets, getAllSubBudgets} from "../../services/apiBudget";
import BudgetComponent from "../smallComponents/BudgetComponent";

export default function BudgetPageComponent({ event }) {
    const [arrayOfBudgetSubCat, setArrayOfBudgetSubCat] = useState([]);
    const [arrayOfBudgetCat, setArrayOfBudgetCat] = useState([]);
    const [budgetSubCat, setBudgetSubCat] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isModalAddBudgetCat, setModalAddBudgetCat] = useState(false);
    const [isModalAddBudgetSubCat, setModalAddBudgetSubCat] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(3);
    const data = [
        {key:'1', value:'Venue/Location', },
        {key:'2', value:'Food (catering or self-prepared)'},
        {key:'3', value:'Decorations'},
        {key:'4', value:'Invitations/Stationery', },
        {key:'5', value:'Entertainment'},
        {key:'6', value:'Attire/Styling'},
        {key:'7', value:'Photo & video', },
        {key:'8', value:'Transportation'},
        {key:'9', value:'Gifts/Prizes:'},
        {key:'10', value:'Equipment'},
        {key:'11', value:'Another'},
    ];
    const [budgetCat, setBudgetCat] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("event.event_id: ", event.event_id);
                const budgets = await getAllBudgets(event.event_id);
                console.log("budgets: ", budgets);
                setBudgetCat(budgets);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [isLoading]);


    if (isLoading) {
        return (
            <View style={[commonStyles.loadingView, {backgroundColor: 'transparent'}]}>
                <PacmanIndicator color={COLORS.red} size={100}/>
                <Text style={{color: 'red'}}>Loading...</Text>
            </View>
        );
    } else {
        return (
            <ScrollView style={eventPageStyle.scrollBox3}>
                <View style={eventPageStyle.containerWishlist}>
                    {budgetCat.length > 0 ? (
                        budgetCat.map((budget) => (
                            <View key={budget.budget_id} style={{ alignSelf: 'stretch' }}>
                                <BudgetComponent budget={budget} isLoading={isLoading} setLoading={setLoading}/>
                            </View>
                        ))
                    ) : (
                        <View style={{ alignSelf: 'stretch' }}>
                            <Text style={{ ...eventPageStyle.text, color: COLORS.pink }}>No info yet :(</Text>
                        </View>
                    )}
                    <View style={[eventPageStyle.button, {width: 310, marginBottom: 25}]}>
                        <TouchableOpacity onPress={() => {
                            setModalAddBudgetCat(!isModalAddBudgetCat)
                        }}>
                            <View style={commonStyles.horizontal}>
                                <Text style={[commonStyles.text, {fontSize: 24, color: COLORS.red}]}>Add new category</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {isModalAddBudgetCat && (
                        <View style={[eventPageStyle.addTask, {marginTop: -10, borderColor: 'transparent'}]}>
                            <View style={[eventPageStyle.containerTask, { flexDirection: 'column'}]}>
                                <View style={[modalStyles.input, {width: 310, margin: 0, marginBottom: 25}]}>
                                    <TextInput
                                        placeholder={'Write budget category here ...'}
                                        value={budgetCat}
                                        onChangeText={name => {
                                            setBudgetCat(name);
                                        }}
                                        style={modalStyles.modalText}
                                    />
                                </View>
                                <SelectList
                                    setSelected={(val) => {setSelectedCategory(val); setBudgetCat(val);}}
                                    fontFamily= {FONTS.regular}
                                    data={data}
                                    placeholder = "Or choose here:"
                                    save="value"
                                    boxStyles={[{height: 55, alignSelf: 'center', width: 310, borderRadius: 20}]}
                                />
                                {/*<TouchableOpacity onPress={handleSubmit} style={{marginHorizontal: 5}}>*/}
                                {/*    <FontAwesomeIcon icon={faCheckCircle} size={38} style={{color: COLORS.orange}}/>*/}
                                {/*</TouchableOpacity>*/}
                            </View>
                        </View>)}
                </View>
            </ScrollView>
        );
    }
}
