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
    const [isFieldEmpty, setIsFieldEmpty] = useState(false)
    const [isPasswordWeak, setIsPasswordWeak] = useState(false)
    const [isPasswordMismatch, setIsPasswordMismatch] = useState(false)
    const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    const [isSingupInvalid, setIsSingupInvalid] = useState(false)
    const [triggerSingup, result] = useSignupMutation()

    const submitHandeler = () => {
        setIsPasswordWeak(false)
        setIsPasswordMismatch(false)
        setIsEmailInvalid(false)
        setIsFieldEmpty(false)
        
        if (passwordRef.current === confirmPassRef.current && passwordRef.current.length >5  && emailRef.current.match(/\S+@\S+\.\S+$/)){
            triggerSingup({"email": emailRef.current , "password": passwordRef.current, "returnSecureToken": true})
        } else if (!emailRef.current.match(/\S+@\S+\.\S+$/)) {
            setIsEmailInvalid(true)
        } else if (passwordRef.current.length < 6){
            setIsPasswordWeak(true)
        } else if (passwordRef.current !== confirmPassRef.current) {
            setIsPasswordMismatch(true)
        } else if (emailRef.current.trim() === "" || passwordRef.current === "" || confirmPassRef.current == "") {
            setIsFieldEmpty(true)
        } 
    }

    useEffect(()=> {
        
        setIsSingupInvalid(false)

        if (result.status ===  "fulfilled") {
            navigation.goBack()
        }else if (result.status=== "rejected"){
            setIsSingupInvalid(true)
        }
    }, [result])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokerescate</Text>
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                {
                    isFieldEmpty&& <Text style={styles.errorText}>Todos los campos deben estar completos</Text>
                }
                {
                    isEmailInvalid&& <Text style={styles.errorText}>Ingrese un Email valido</Text> 
                }
                {
                    isPasswordWeak&& <Text style={styles.errorText}>La contraseña debe tener al menos 6 caracteres</Text>
                }
                {
                    isPasswordMismatch&& <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
                }
                {
                    isSingupInvalid&& <Text style={styles.errorText}>Hubo un problema al crear la cuenta</Text>
                }

                <TextInput
                    onChangeText={(text) => emailRef.current= text}
                    placeholderTextColor={colors.primary}
                    placeholder="Email"
                    style={[styles.textInput, (isSingupInvalid || isEmailInvalid || (isFieldEmpty && emailRef.current.trim() === "")) && styles.errorInput ]}
                />
                <TextInput
                    onChangeText={(text) => passwordRef.current= text}
                    placeholderTextColor={colors.primary}
                    placeholder='Contraseña'
                    style={[styles.textInput, (isSingupInvalid || isPasswordWeak || ( isFieldEmpty && passwordRef.current === "")) && styles.errorInput]}
                    secureTextEntry
                />
                <TextInput
                    onChangeText={(text) => confirmPassRef.current= text}
                    placeholderTextColor={colors.primary}
                    placeholder='Confirmar contraseña'
                    style={[styles.textInput, (isSingupInvalid || isPasswordMismatch || ( isFieldEmpty && confirmPassRef.current === "")) && styles.errorInput]}
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
    errorInput: {
        borderWidth: 2,
        borderColor: "red",
    },
    errorText: {
        color: "red",
    }
})