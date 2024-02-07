import { Tabs, router } from "expo-router";

import { Entypo } from '@expo/vector-icons';
import { View, StyleSheet, Text, Alert } from "react-native";

import { MarketResponse, UserResponse } from "../../@types";
import { useService } from "../../api";

import { FontAwesome6, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { Notification } from "../../components/Notification";
import { useUser } from "../../context/UserContext";
import { getDataJson } from "../../util";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabRoutesLayout() {

    const { api } = useService()

    const [user, setUser] = useState<UserResponse>()

    const [isOpenNotifications, setIsOpenNotifications] = useState<boolean>(false)

    const getMySkills = async () => {

        const storage: UserResponse = await getDataJson("userLogado")

        if (storage !== null) {

            setUser(storage)
        }
    }

    useEffect(() => {

        getMySkills()

        const url = `/users/${user?.id}`

        api.get(url)
            .then(res => { setUser(res.data) })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {

        getMySkills()

        const url = `/users/${user?.id}`

        api.get(url)
            .then(res => { setUser(res.data) })
            .catch(err => console.log(err))
    }, [isOpenNotifications])

    const logout = () => {

        AsyncStorage.clear()
            .then(() => {
                alert("saindo...")
                router.push("/")
            })
            .catch(() => alert("ocorreu um erro"))
    }

    return (

        <>
            <View style={styles.header}>

                <Text style={styles.headerText}>
                    <Entypo
                        onPress={() => setIsOpenNotifications(!isOpenNotifications)}
                        name="bell"
                        size={24}
                        color="yellow"
                    />
                </Text>

                <SimpleLineIcons
                    name="logout"
                    size={24}
                    color="yellow"
                    onPress={logout}
                />

                <View style={styles.iconBox}>
                    <Text
                        style={{ fontSize: 24 }}
                    >
                        {user?.coins}
                    </Text>
                    <FontAwesome6
                        name="coins"
                        size={24}
                        color="yellow"
                    />
                </View>
            </View>
            <Tabs
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{

                        title: "",
                        tabBarIcon: ({ focused }) => focused
                            ? <Entypo
                                name="home"
                                size={28}
                                color="#8b5cf6"
                            />
                            : <AntDesign
                                name="home"
                                size={28}
                                color="#8b5cf6"
                            />
                    }}
                />

                <Tabs.Screen
                    name="market"
                    options={{

                        title: "",
                        tabBarIcon: ({ focused }) =>
                            focused

                                ? <Entypo
                                    name="shopping-cart"
                                    size={28}
                                    color="#8b5cf6"
                                />
                                : <AntDesign
                                    name="shoppingcart"
                                    size={28}
                                    color="#8b5cf6"
                                />
                    }}
                />
            </Tabs>
            {
                isOpenNotifications && user !== undefined &&
                <Notification
                    isOpen={isOpenNotifications}
                    setIsOpen={setIsOpenNotifications}
                    notifications={user?.notifications}
                />
            }
        </>
    )
}

const styles = StyleSheet.create({


    header: {

        flex: 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#6366f1",
        padding: 2
    },

    headerText: {

        marginHorizontal: 24,
        marginTop: 6,
        textTransform: "capitalize",
        fontSize: 24,
        fontWeight: "bold",
        fontStyle: "italic"
    },

    iconBox: {

        width: "20%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginRight: 12
    },
})

