import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../global/colors'
import { use, useEffect, useRef, useState } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSignupMutation } from '../../services/auth/authAPI';


const textInputWidth = Dimensions.get('window').width * 0.7

export default function SignupScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const confirmPassRef = useRef("")
    const [triggerSingup, result] = useSignupMutation()

    const submitHandeler = () => {
        if (passwordRef.current === confirmPassRef.current) {
            triggerSingup({"email": emailRef.current , "password": passwordRef.current, "returnSecureToken": true})
    }
    }

    useEffect(()=> {
        if (result.status ===  "fulfilled") {
            navigation.goBack()
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokerescate</Text>
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => emailRef.current= text}
                    placeholderTextColor={colors.primary}
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => passwordRef.current= text}
                    placeholderTextColor={colors.primary}
                    placeholder='Contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />
                <TextInput
                    onChangeText={(text) => confirmPassRef.current= text}
                    placeholderTextColor={colors.primary}
                    placeholder='Confirmar contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.button} onPress={submitHandeler}><Text style={styles.buttonText}>Crear cuenta</Text></Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryContrast
    },
    title: {
        color: colors.white,
        fontFamily: "Title-Solid",
        fontSize: 32
    },
    subTitle: {
        fontFamily: "Pixel-Light",
        fontSize: 18,
        color: colors.white,
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        backgroundColor: colors.white,
        width: textInputWidth,
        
        color: colors.black,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.white
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontFamily: "Pixel-Bold",
        fontSize: 16
    },
    button: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.primary,
        marginTop: 32
    },
    buttonText: {
        color: colors.white,
        fontFamily: "Pixel-Light",
        fontSize: 16,
    },
    error: {
        padding: 16,
        backgroundColor: "red",
        color: colors.white
    }
})