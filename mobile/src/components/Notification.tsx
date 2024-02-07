import { Dispatch, FC, SetStateAction } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Notification as INotification } from "../@types";
import { Feather } from '@expo/vector-icons';

interface NotificationProps {

    notifications: INotification[]
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const Notification: FC<NotificationProps> = ({
    notifications, isOpen, setIsOpen }) => {

    return (

        <View
            style={styles.container}
        >
            <View
                style={styles.box}
            >
                <Feather
                    style={styles.icon}
                    name="x"
                    size={24}
                    color="white"
                    onPress={() => setIsOpen(!isOpen)}
                />
                {
                    notifications.map(
                        notification =>
                            <View
                                key={notification.id}
                                style={styles.messageBox}
                            >
                                <Text
                                    style={styles.message}
                                >
                                    {notification.message}
                                </Text>
                            </View>

                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: '#000000b7',
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1
    },

    box: {

        width: "80%",
        gap: 8,
        alignItems: 'center',
        backgroundColor: "#f2f2f2e9",
        padding: 8,
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
        position: "relative"
    },

    icon: {

        backgroundColor: "#2e1065",
        borderRadius: 999,
        padding: 2,
        borderColor: "red",
        borderWidth: 2,
        position: "absolute",
        top: -16,
        right: -16,
        zIndex: 1
    },

    messageBox: {

        width: "100%",
        minHeight: 60,
        padding: 8,
        backgroundColor: "#2e1065",
        borderRadius: 4,
    },

    message: {

        fontSize: 16,
        fontStyle: "italic",
        fontWeight: "bold",
        color: "white"
    },


})

