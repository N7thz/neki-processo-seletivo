import { useEffect, useState } from "react";
import { ImageBackground, TouchableOpacity, View, Text, TextInput, Button } from "react-native";

import { useRouter } from "expo-router"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import { styles } from "./styles";
import { useService } from "../api";

import { Entypo } from '@expo/vector-icons';

import Background from "../../assets/background-login.png"
import { UserRequest, UserResponse } from "../@types";
import { getDataJson } from "../util";

export interface FormDataProps {

    username: string
    email: string
    password: string
    confirm_password: string
}

const FormDataSchema = z.object({

    username: z.string().nonempty({
        message: "O username é obrigátorio."
    }),
    email: z.string().nonempty({
        message: "O e-mail é obrigátorio."
    }).email(),
    password: z.string().nonempty({
        message: "A senha é obrigátoria."
    }).min(6, {
        message: "A senha deve ter pelo menos 6 caracteres."
    }),
    confirm_password: z.string().nonempty({
        message: "A confirmação da senha é obrigátoria."
    })
})
    .refine((data) => data.confirm_password === data.password, {
        message: "As senhas devem ser iguais",
        path: ["confirm_password"],
    });

export default function RegisterUser() {

    const router = useRouter()

    useEffect(() => {

        protectRoutes()
    }, [])

    const protectRoutes = async () => {

        const storage: UserResponse = await getDataJson("userLogado")

        if (storage !== null) {

            router.push("/home")
        }
    }

    const { createUser } = useService()

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({

        resolver: zodResolver(FormDataSchema)
    })

    const onSubmit = (data: FormDataProps) => {

        const { username, email, password } = data

        const user: UserRequest = {
            userName: username,
            email: email,
            password: password,
            perfil: 1
        }

        createUser(user)
            .then(() => {

                alert("usuario cadastrado com sucesso")
                router.push("/")
            })
            .catch(err => console.log(err))
    }

    return (

        <ImageBackground
            blurRadius={2}
            source={Background}
            style={styles.container}
        >
            <View style={styles.formRegister}>

                <Text style={styles.title}>
                    Cadastro
                </Text>

                <View
                    style={styles.formBody}
                >

                    <View style={styles.inputBox}>

                        <Text style={styles.label}>
                            username:
                        </Text>

                        <Controller
                            control={control}
                            name="username"
                            render={({ field: { onChange } }) => (

                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        {
                            errors.username &&
                            <Text style={styles.inputError}>
                                {errors.username.message}
                            </Text>
                        }
                    </View>

                    <View style={styles.inputBox}>

                        <Text style={styles.label}>
                            email:
                        </Text>

                        <Controller
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
                            isPasswordVisible
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

                    <View style={styles.inputBox}>

                        <Text style={styles.label}>
                            confirmar senha:
                        </Text>

                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field: { onChange } }) => (

                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={!isPasswordVisible}
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        {
                            isPasswordVisible
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
                            errors.confirm_password &&
                            <Text style={styles.inputError}>
                                {errors.confirm_password.message}
                            </Text>
                        }
                    </View>

                    <View
                        style={styles.boxContainer}
                    >
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => router.push("/")}
                            >
                                <Text
                                    style={styles.link}
                                >
                                    Fazer Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.buttonText}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
