import { useEffect, useState } from "react";
import { ImageBackground, TouchableOpacity, Text, View, TextInput } from "react-native";
import { Entypo } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "expo-router";
import { useService } from "../api";
import { styles } from "./styles";

import Background from "../../assets/background-login.png";
import { getData, getDataJson, storeData, storeDataJson } from "../util";
import { UserResponse } from "../@types";

export interface FormDataProps {

    email: string
    password: string
}

const FormDataSchema = z.object({

    email: z.string().nonempty({
        message: "O e-mail é obrigátorio."
    }).email(),
    password: z.string().nonempty({
        message: "A senha é obrigátoria."
    }).min(6, {
        message: "A senha deve ter pelo menos 6 caracteres."
    })
})

export default function Login() {

    const [isChecked, setChecked] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter()

    const { login } = useService()

    useEffect(() => {

        checkValues()
        protectRoutes()
    }, [])

    const protectRoutes = async () => {

        const storage: UserResponse = await getDataJson("userLogado")

        if (storage !== null) {

            router.push("/home")
        }
    }

    const checkValues = async () => {

        const email = await getData("email")
        const password = await getData("password")

        if (email !== undefined && password !== undefined) {

            setEmail(email)
            setPassword(password)
        } else {

            setEmail("")
            setPassword("")
        }
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({

        resolver: zodResolver(FormDataSchema)
    })

    const onSubmit = (data: FormDataProps) => {

        login(data)
            .then((res) => {

                if (res.status == 200) {

                    storeData("token", res.data.token)
                    storeDataJson("userLogado", res.data.userResponse)

                    if (isChecked) {

                        storeData("password", data.password)
                        storeData("email", data.email)
                        storeData("check", "true")

                    } else {

                        AsyncStorage.removeItem("password")
                        AsyncStorage.removeItem("email")
                    }

                    window.location.reload()

                    // router.push("/home")
                }
            })
            .catch(() => {

                alert("email ou senha inválidos")
            })
    }

    return (

        <ImageBackground
            blurRadius={2}
            source={Background}
            style={styles.container}
        >
            <View style={styles.form}>

                <Text style={styles.title}>
                    Login
                </Text>

                <View style={styles.formBody}>

                    <View style={styles.inputBox}>

                        <Text style={styles.label}>
                            email:
                        </Text>

                        <Controller
                            defaultValue={email}
                            control={control}
                            name="email"
                            render={({ field: { onChange } }) => (

                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {
                            errors.email &&
                            <Text style={styles.inputError}>
                                {errors.email.message}
                            </Text>
                        }
                    </View>

                    <View style={styles.inputBox}>

                        <Text style={styles.label}>
                            senha:
                        </Text>

                        <Controller
                            defaultValue={password}
                            control={control}
                            name="password"
                            render={({ field: { onChange } }) => (

                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={!isPasswordVisible}
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        {
                            !isPasswordVisible
                                ? <Entypo
                                    onPress={
                                        () => setIsPasswordVisible(!isPasswordVisible)
                                    }
                                    style={styles.icon}
                                    name="eye"
                                    size={18}
                                    color="black"
                                />
                                : <Entypo
                                    onPress={
                                        () => setIsPasswordVisible(!isPasswordVisible)
                                    }
                                    style={styles.icon}
                                    name="eye-with-line"
                                    size={18}
                                    color="black"
                                />
                        }

                        {
                            errors.password &&
                            <Text style={styles.inputError}>
                                {errors.password.message}
                            </Text>
                        }
                    </View>

                    <View
                        style={styles.boxContainer}
                    >
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => router.push("/RegisterUser")}
                            >
                                <Text
                                    style={[styles.link, { margin: 2 }]}
                                >
                                    Cadastre-se
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={styles.checkbox}
                        >
                            <Checkbox
                                color={"#8b5cf6"}
                                style={styles.checkboxInput}
                                value={isChecked}
                                onValueChange={setChecked}
                            />
                            <Text
                                style={{ fontSize: 16 }}
                            >
                                Lembre-se de mim
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}


