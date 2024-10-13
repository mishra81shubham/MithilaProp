import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    BackHandler,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import avtarImage from "../assets/profile.png";
import Icon from "react-native-vector-icons/FontAwesome";;
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ProfileScreen = (props) => {
   

    const handleBack = () => {
        props.navigation.navigate("HomePage");
    };
    
    const handlepageGo = (item) => {
        // if(item == "profile"){
        //     props.navigation.navigate("NameGeneralInfo");
        // }
        // else if(item == "orders"){
        //     props.navigation.navigate("OrderProduct");
        // }
        //  else if(item == "paymentHistory"){
        // }
    };

    

    const backSignAction = async () => {
        if (props.navigation.isFocused()) {
            return props.navigation.navigate("HomePage");
        }
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backSignAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backSignAction);
    }, []);

    const logout = async () => {
            //   props.navigation.push("register_flow");
            Alert.alert("Hold on!", "Are you sure you want to logout?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel",
                },
                {
                    text: "YES", onPress: async () => {
                        return BackHandler.exitApp();
                    }
                },
                // { text: "YES", onPress: () => BackHandler.exitApp() },
            ]);
        return true;
    };

    return (
        <>
        <View style={styles.topTitleMsg}>
                <TouchableOpacity style={styles.topArrowMnsg} onPress={handleBack}>
                    <MaterialIcons name="arrow-back" size={25} color="#000" />
                    <Text style={styles.topMsgComponent}>Go Back</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ height: "100%", backgroundColor: "#fff" }}>
                <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, }}>
                    <View style={styles.topProfile}>
                        <View style={styles.profileDetails}>
                            <Image style={styles.profileImage} source={avtarImage} />
                        </View>
                        <Text
                            style={{
                                color: "#000",
                                fontSize: 20,
                                fontWeight: "700",
                                fontFamily: "Roboto-Medium",
                                marginVertical: 15,
                                textAlign: "center",
                            }}
                        >
                            Guest User
                        </Text>
                    </View>
                    {/* <View style={styles.profileDrawerItem}>
                        <TouchableOpacity style={styles.drawerInnerLink} onPress={()=>handlepageGo("profile")}>
                            <Feather
                                name="user"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>Profile</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* <View style={styles.profileDrawerItem}>
                        <TouchableOpacity style={styles.drawerInnerLink} onPress={()=>handlepageGo("orders")}>
                            <Feather
                                name="shopping-cart"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>Orders</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.profileDrawerItem}>
                        <TouchableOpacity style={styles.drawerInnerLink} onPress={()=>handlepageGo("paymentHistory")}>
                            <AntDesign
                                name="profile"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>Home</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileDrawerItem}>
                        <TouchableOpacity style={styles.drawerInnerLink}>
                            <AntDesign
                                name="infocirlceo"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>About us</Text>
                        </TouchableOpacity>
                    </View> 

                    <View style={styles.profileDrawerItem}>
                        <TouchableOpacity style={styles.drawerInnerLink}>
                            <Feather
                                name="phone-call"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>Support 24 & 7 Help</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileDrawerItem}>
                        <TouchableOpacity style={styles.drawerInnerLink}>
                            <Feather
                                name="video"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>Training Videos</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileDrawerItem}>
                        <TouchableOpacity style={styles.drawerInnerLink}>
                            <AntDesign
                                name="questioncircleo"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>FAQs</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileDrawerItem}>
                        <TouchableOpacity style={styles.drawerInnerLink}>
                            <MaterialCommunityIcons
                                name="newspaper-variant-outline"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>Policies</Text>
                        </TouchableOpacity>
                    </View>

                     <View style={styles.profileDrawerItem}>
                        <TouchableOpacity 
                            onPress={logout}
                        style={styles.drawerInnerLink}>
                            <Feather
                                name="log-out"
                                size={23}
                                color="#000"
                            />
                            <Text style={styles.labelDrawer}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.loginIcon}>
                        <Icon
                            style={styles.iconstyle}
                            name="facebook"
                            size={25}
                            color="#6E12F9"
                        />
                        <Icon
                            style={styles.iconstyle}
                            name="instagram"
                            size={25}
                            color="#6E12F9"
                        />
                        <Icon
                            style={styles.iconstyle}
                            name="twitter"
                            size={25}
                            color="#6E12F9"
                        />

                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    topTitleMsg: {
        paddingHorizontal: 20,
        paddingVertical: 10,
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
    profileDetails: {
        borderWidth: 2,
        borderColor: "#6E12F9",
        backgroundColor: "#000",
        overflow: "hidden",
        width: 70,
        height: 70,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    profileImage: {
        width: 70,
        height: 70,
    },
    topProfile: {
        alignItems: "center",
    },
    loginIcon: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    iconstyle: {
        borderWidth: 1.5,
        borderColor: "#6E12F9",
        textAlign: "center",
        borderRadius: 100,
        width: 50,
        height: 50,
        lineHeight: 50,
        marginHorizontal: 10,
    },
    profileDrawerItem: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 10
    },
    drawerInnerLink: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor:"#6E12F9",
        paddingLeft: 20,
        marginVertical: 5,
        paddingVertical:13,
        borderRadius:3,
    },
    labelDrawer: {
        fontWeight: "600",
        fontSize: 18,
        color: "#000",
        marginLeft: 20,
    },
});

export default ProfileScreen;
