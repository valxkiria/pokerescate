import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { useEffect, useRef} from 'react';
import { useLoginMutation } from '../../services/auth/authAPI';
import { setUser } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSQLiteContext } from 'expo-sqlite';
import { saveUserInDB } from '../../db';
import { UserRow } from '../../global/types';
import { colors } from '../../global/colors';

const textInputWidth = Dimensions.get('window').width * 0.7

export default function LoginScreen () {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const db = useSQLiteContext()
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const [triggerLogin, result] = useLoginMutation()

    const dispatch = useDispatch()

    const submitHandeler = ()=>{
        triggerLogin({email: emailRef.current , password: passwordRef.current})
    
    }    

    useEffect(()=>{
        async function saveUser() {
            if(result.status==="fulfilled"){
                dispatch(setUser({email: result.data.email, localId: result.data.localId}))
                await saveUserInDB(result.data.email, result.data.localId)
            }
        }
        saveUser()    
    },[result])



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokerescate</Text>
            <Text style={styles.subTitle}>Inicia sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => emailRef.current= text}
                    placeholderTextColor={colors.primary}
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => passwordRef.current=text}
                    placeholderTextColor={colors.primary}
                    placeholder='Contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.button} onPress={submitHandeler}><Text style={styles.buttonText}>Iniciar sesión</Text></Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
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
        backgroundColor: colors.primaryContrast,
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