import { View, StyleSheet, Text, Image, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { SkillResponse } from "../@types"
import { FC, useState } from "react"
import { CardOptions } from "./CardOptions"

interface CardProps extends TouchableOpacityProps {

    skill: SkillResponse
}

export const Card: FC<CardProps> = ({ skill, onPress }) => {

    const [isOpenCard, setIsOpenCard] = useState<boolean>(false)

    return (

        <>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setIsOpenCard(!isOpenCard)}
            >
                <View
                    {...onPress}
                    style={[styles.box, { position: "relative" }]}
                >
                    <Image
                        source={{
                            uri: skill.imageURL
                        }}
                        style={styles.image}
                        alt="texto alternativo"
                    />
                    <Text
                        style={styles.cardLevel}
                    >
                        {skill.level}
                    </Text>
                    <View
                        style={styles.cardBox}
                    >
                        <Text
                            style={styles.cardTitle}
                        >
                            {skill.name}
                        </Text>

                        <Text
                            style={styles.cardDescription}
                        >
                            {skill.description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {
                isOpenCard &&
                <CardOptions
                    skill={skill}
                />
            }
        </>

    )
}


const styles = StyleSheet.create({

    box: {

        flex: 1,
        alignItems: "center",
        justifyContent: 'space-between',
        width: 200,
        minHeight: 300,
        backgroundColor: "blue",
        padding: 8,
        margin: 4,
        borderRadius: 4,
    },

    cardBox: {

        backgroundColor: "#f2f2f2",
        flexWrap: "wrap",
        width: "100%",
        height: "30%",
        margin: 12,
        padding: 4
    },

    cardTitle: {

        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "bold"
    },

    cardLevel: {

        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#f2f2f2",
        padding: 2,
        borderRadius: 2,
    },

    cardDescription: {

        fontSize: 16
    },

    image: {

        width: "100%",
        height: "60%",
        borderRadius: 4,
        position: "relative"
    },

    icon: {

        backgroundColor: "#2e1065",
        borderRadius: 999,
        padding: 2,
        borderColor: "red",
        borderWidth: 2,
        position: "absolute",
        top: -14,
        right: -14,
    },

    title: {

        fontSize: 32,
        marginTop: 30
    },

    form: {

        width: "80%",
        minHeight: 480,
        height: "50%",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#f2f2f2e9",
        borderRadius: 12,
        borderColor: "#2e1065",
        borderWidth: 2,
        position: "relative"
    },

    headerText: {

        marginHorizontal: 24,
        marginTop: 6,
        textTransform: "capitalize",
        fontSize: 24,
        fontWeight: "bold",
        fontStyle: "italic"
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

    button: {

        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2e1065",
        margin: 24,
        padding: 12,
        borderRadius: 4
    },

    buttonText: {

        fontSize: 20,
        color: "#fff"
    },
})
