import { FC, ReactNode } from "react";
import { View, Text, StyleSheet, ViewProps, TouchableOpacity } from "react-native"

interface ModalProps extends ViewProps {

    children: ReactNode
    confirm: () => void
    cancel: () => void
}

export const Modal: FC<ModalProps> = ({ children, cancel, confirm }) => {

    return (

        <View
            style={styles.container}
        >
            <View
                style={styles.box}
            >
                <Text
                    style={styles.title}
                >
                    {children}
                </Text>
            </View>

            <View
                style={styles.buttons}
            >
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "red" }]}
                    onPress={cancel}
                >
                    <Text
                        style={styles.label}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "green" }]}
                    onPress={confirm}
                >
                    <Text
                        style={styles.label}
                    >
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export const styles = StyleSheet.create({

    container: {

        backgroundColor: "#f2f2f2e9",
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        margin: 8,
        zIndex: 1
    },

    title: {

        fontSize: 28,
        marginTop: 30,
        textAlign: "center",
        color: "black"
    },

    box: {

        width: "80%",
        minHeight: 180,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    label: {

        fontSize: 20,
        color: "white",
        textTransform: "capitalize"
    },

    buttons: {

        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    button: {

        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 4
    },
})