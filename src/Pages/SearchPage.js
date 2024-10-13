import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import { getData, postData } from '../common/common';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../common/Loader';
// import RangeSlider from 'rn-range-slider';

const SearchPage = (props) => {

    const selectedValue = props && props.route.params.selectedValue;

    const [value, setValue] = useState();
    const [isFocus, setIsFocus] = useState(false);
    const [residentialCheckBox, setResidentialCheckBox] = useState(false)
    const [commercialCheckBox, setCommercialCheckBox] = useState(false)
    const [agricultureCheckBox, setAgricultureCheckBox] = useState(false)
    const [checked, setChecked] = React.useState('ForRent');
    const [onLoadingBtn, setOnLoadingBtn] = useState(false);
    const [cityData, setCityData] = useState([]);
    const [selectedCityValue, setSelectedCityValue] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            async function fetchData() {
                setOnLoadingBtn(true);
                let res = await getData(`get-city`);
                setOnLoadingBtn(false);
                if (res.statusCode == 200) {
                    let tempDataCity = [];
                    let defaultSelectedValue = null;
                    for (let index = 0; index < res.data.length; index++) {
                        const element = res.data[index];
                        if (element) {
                            tempDataCity.push({ value: element.id, label: element.name })
                            if (element.id === selectedValue) {
                                defaultSelectedValue = { value: element.id, label: element.name };
                            }
                        }

                    }
                    setCityData(tempDataCity);
                    setValue(defaultSelectedValue);
                }

                return;
            }

            fetchData();
        }, [])
    )

    // console.log("selectedValue123----", value.value)

    const handleBack = () => {
        props.navigation.navigate("HomePage");
    };

    const handleSearchProperty = async () => {
        setOnLoadingBtn(true);
        tempData = {
            "city": value && value.value,
        }
        let res = await postData(`search`);
        setOnLoadingBtn(false);
        if (res.statusCode == 200) {
        props.navigation.navigate("PropertyList",{ id: value && value.value });
            console.log("respondata-----", res.data)
        }
    };


    return (
        <>
            {onLoadingBtn ? <Loader /> : ""}
            <View style={styles.topTitleMsg}>
                <TouchableOpacity style={styles.topArrowMnsg} onPress={handleBack}>
                    <MaterialIcons name="arrow-back" size={25} color="#000" />
                    <Text style={styles.topMsgComponent}>Search For</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.mainContainer}>
                    {/* --------------- Search Box start here ------------- */}

                    <View style={styles.containerSearchbox}>
                        <View style={styles.containerCity}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={cityData}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select City' : '...'}
                                searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue({ label: item.label, value: item.value });
                                    setIsFocus(false);
                                }}
                                renderLeftIcon={() => (
                                    <EvilIcons
                                        style={styles.icon}
                                        color={isFocus ? 'blue' : 'black'}
                                        name="location"
                                        size={20}
                                    />
                                )}
                            />
                        </View>
                        <TouchableOpacity onPress={handleSearchProperty} style={styles.iconSearchStyle}>
                            <FontAwesome5
                                color="#fff"
                                name="search-location"
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* --------------------------------------------- */}
                    <View>
                        <Text style={styles.propertyType}>Property Type</Text>
                        <View style={styles.checkBoxMain}>
                            <CheckBox
                                disabled={false}
                                value={residentialCheckBox}
                                onValueChange={(newValue) => setResidentialCheckBox(newValue)}
                            />
                            <Text style={styles.checkBoxLabel}>Residential</Text>
                        </View>

                        <View style={styles.checkBoxMain}>
                            <CheckBox
                                disabled={false}
                                value={commercialCheckBox}
                                onValueChange={(newValue) => setCommercialCheckBox(newValue)}
                            />
                            <Text style={styles.checkBoxLabel}>Commercial</Text>
                        </View>

                        <View style={styles.checkBoxMain}>
                            <CheckBox
                                disabled={false}
                                value={agricultureCheckBox}
                                onValueChange={(newValue) => setAgricultureCheckBox(newValue)}
                            />
                            <Text style={styles.checkBoxLabel}>Agriculture/Farmland</Text>
                        </View>
                    </View>
                    {/* --------------------------------------------------- */}

                    <View>
                        <Text style={[styles.propertyType, { marginTop: 15, }]}>Property Purpose</Text>
                        <TouchableOpacity style={styles.touchBtnOpcityMsg} onPress={() => setChecked('ForRent')}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton
                                    value="ForRent"
                                    status={checked === 'ForRent' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('ForRent')}
                                />

                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#44465B", marginLeft: 20, }}>For Rent</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchBtnOpcityMsg} onPress={() => setChecked('ForSale')}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton
                                    value="ForSale"
                                    status={checked === 'ForSale' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('ForSale')}
                                />

                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#44465B", marginLeft: 20, }}>For Sale</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>

                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default SearchPage

const styles = StyleSheet.create({
    topTitleMsg: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    topArrowMnsg: {
        flexDirection: "row",
        alignItems: "center",
    },
    topMsgComponent: {
        color: "#000",
        fontWeight: "600",
        marginLeft: 20,
        fontSize: 17,
    },
    mainContainer: {
        paddingHorizontal: 20,
    },
    // -------------------------- Search List ----------------
    containerSearchbox: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        marginTop: 22,
        marginBottom: 25,
        position: "relative",
        overflow: "hidden",
    },

    // -------------------------- Search List ----------------
    propertyType: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fbc531",
        marginBottom: 25,
    },
    checkBoxLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
        marginLeft: 15,
    },
    checkBoxMain: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    touchBtnOpcityMsg: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E8E8EA",
        borderRadius: 5,
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
    },
    // ----------------- dropdown css -----------------

    containerCity: {
        width: "100%",
        color: "#fff",
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    dropdown: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: "#fff",
        height: 35,
        width: "80%",
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    icon: {
        marginRight: 5,
        color: "#000",
    },
    placeholderStyle: {
        fontSize: 17,
        color: "#000",
    },
    selectedTextStyle: {
        fontSize: 17,
        color: "#000",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    iconSearchStyle: {
        position: "absolute",
        right: 0,
        top: 5,
        backgroundColor: "#fbc531",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 25,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})