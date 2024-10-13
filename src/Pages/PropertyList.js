import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../common/common';
import Loader from '../common/Loader';

const PropertyList = (props) => {

    const propId = props && props.route.params.id;

    const [data, SetData] = useState([]);
    const [onLoadingBtn, setOnLoadingBtn] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            async function fetchData() {
                setOnLoadingBtn(true);
                let res = await getData(`get-city-data/${propId}`);
                console.log("responce---", res)
                setOnLoadingBtn(false);
                if (res.statusCode == 200) {
                    console.log("responce---", res)
                    SetData(res.data);
                }

                return;
            }

            fetchData();
        }, [propId])
    )

    const handleBack = () => {
        props.navigation.navigate("HomePage");
    };
    const handelPropertyDetails = (id) => {
        props.navigation.navigate("PropertyDetailsPage", { id: id });
    };

    const ListItem = ({ item }) => (
        <TouchableOpacity onPress={() => handelPropertyDetails(item.id)} style={styles.itemNewListed}>
            <View style={styles.msngImageView}>
                <Image source={{ uri: item.image }} style={styles.imageNewList} />
                <View style={styles.positionMngAcor}>
                    {/* <View style={styles.mngContentView}>
                        <FontAwesome5
                            style={styles.icon}
                            color="#FFF000"
                            name="rupee-sign"
                            size={20}
                        />
                        <Text style={styles.cityPriceName}>{item.price}</Text>
                    </View> */}

                    <Text style={styles.titleNewList}>{item.title}</Text>

                    <View style={styles.mngContentView}>
                        <FontAwesome5
                            style={styles.icon}
                            color="#FFF000"
                            name="map-marked-alt"
                            size={20}
                        />
                        <Text style={styles.cityPriceName}>{item.name}</Text>
                    </View>

                    {/* <View style={styles.featurePropBottom}>
                        <View style={styles.mngContentView}>
                            <FontAwesome5
                                style={styles.icon}
                                color="#FFF000"
                                name="bed"
                                size={15}
                            />
                            <Text style={styles.featureNameDisplay}>1 bd.</Text>
                        </View>
                        <View style={styles.mngContentView}>
                            <FontAwesome5
                                style={styles.icon}
                                color="#FFF000"
                                name="bath"
                                size={15}
                            />
                            <Text style={styles.featureNameDisplay}>0 ba.</Text>
                        </View>
                        <View style={styles.mngContentView}>
                            <FontAwesome5
                                style={styles.icon}
                                color="#FFF000"
                                name="expand-arrows-alt"
                                size={15}
                            />
                            <Text style={styles.featureNameDisplay}>450 Sq.</Text>
                        </View>
                    </View> */}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            {onLoadingBtn ? <Loader /> : ""}
            <View style={styles.topTitleMsg}>
                <TouchableOpacity style={styles.topArrowMnsg} onPress={handleBack}>
                    <MaterialIcons name="arrow-back" size={25} color="#000" />
                    <Text style={styles.topMsgComponent}>Property List</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ backgroundColor: "#fff" }}>
                <View style={styles.newFeatureProList}>
                    {/* <Text style={[styles.featureProperties, { marginBottom: 20, }]}>Your City Here..</Text> */}
                    { data && data.length>0 ? (<FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ListItem item={item} />}
                    />): <Text style={{fontWeight:"600", fontSize:20,color:"#000", textAlign:"center", marginTop:30,}}>No Result Found!!</Text>}
                    
                </View>
            </ScrollView>
        </>
    )
}

export default PropertyList

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
    // --------------------------------------

    imageNewList: {
        width: "100%",
        height: 250,
        // borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    featureProperties: {
        fontSize: 22,
        fontWeight: "600",
        color: "#002046",
        marginTop: 0,
        marginBottom: 10,
        textAlign: "center",
    },
    newFeatureProList: {
        margin: 20,
    },
    titleNewList: {
        color: "#fff",
        fontSize: 20,
        marginLeft: 10,
        marginTop:20,
    },

    itemNewListed: {
        marginBottom: 30,
    },
    mngContentView: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
        padding: 10,
    },
    cityPriceName: {
        fontSize: 20,
        color: "#fff",
        marginLeft: 10,
        fontWeight: "500",
    },
    featureNameDisplay: {
        fontSize: 15,
        color: "#fff",
        marginLeft: 10,
        fontWeight: "500",
    },
    featurePropBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    msngImageView: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ccc",
    },
    positionMngAcor: {
        backgroundColor: '#000',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})