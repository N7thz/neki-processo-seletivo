import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    form: {

        width: "80%",
        minHeight: 460,
        height: "50%",
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#f2f2f2e9",
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
    },

    formRegister: {

        width: "80%",
        minHeight: 460,
        height: "84%",
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#f2f2f2e9",
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
    },

    formBody: {

        flex: 1,
        width: "100%",
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    title: {

        fontSize: 32,
        marginTop: 30
    },

    label: {

        fontSize: 20,
        marginVertical: 4, 
        textTransform: "capitalize"
    },

    inputBox: {

        paddingHorizontal: 8,
        width: "90%",
        textAlign: "left"
    },

    input: {

        position: "relative",
        borderColor: "#000",
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 4,
        padding: 4
    },

    inputError: {

        color: "red",
        fontStyle: "italic",
        fontSize: 16,
        margin: 2
    },

    button : {

        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#9333ea",
        padding: 12,
        borderRadius: 4
    },

    buttonText: {

        fontSize: 20,
        color: "#fff"
    },

    boxContainer: {

        alignItems: 'center',
    },

    link: {

        textDecorationLine: "underline",
        color: "#8b5cf6",
        fontSize: 20
    },

    checkbox: {
        
        flexDirection: "row",
        alignItems: "center",
    },

    checkboxInput: {

        margin: 8,
    },

    icon: {

        position: "absolute",
        top: "62%",
        right: "8%"
    },
});