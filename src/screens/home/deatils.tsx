import {StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, Dimensions, Alert} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageSelection from '../../components/atoms/imageSelection'
import TypeItem from '../../components/atoms/typeItem'
import { useDispatch, useSelector } from 'react-redux'
import { useGetTypesQuery } from '../../services/home/homeAPI'
import { setTypeSelected } from '../../features/home/homeSlice'
//import { abandon,  sponsor } from '../../features/family/familyUpdatesHandeler'


import { RootState } from "../../global/types";
import { Pokemon, PokePreview, Type } from '../../global/interface'
import { colors } from '../../global/colors'
import { useDeleteSponsoringMutation, useGetSponsoringQuery, usePostAbandonedMutation, usePostSponsoringMutation } from '../../services/family/familyAPI';
import { useEffect } from 'react';


export default function DetailsScreen () {

    // Should go on separate function
    const localId = useSelector((state: RootState) =>state.userReducer.localId)
    const {refetch: refetchSponsoring, currentData: sponsoring}= useGetSponsoringQuery(localId)
    const [triggerPostSponsoring, postSResult] = usePostSponsoringMutation()

    const [triggerPostAbandoned, postAResult] = usePostAbandonedMutation()
    const [triggerDeleteSponsoring, delSResult] = useDeleteSponsoringMutation()
    //

    const {data: typesData, isLoading: typesLoading, error: typesError} = useGetTypesQuery(null)     
    const dispatch = useDispatch()

    const types = typesData as Type[] 

    const myPokemon = useSelector((state: RootState) => state.homeReducer.pokemonSelected)
    const mySprites = [myPokemon.sprites.front_default, myPokemon.sprites.back_default, myPokemon.sprites.front_shiny, myPokemon.sprites.back_shiny]
    const myTypes = types.filter(t => myPokemon.types.includes(t.name)) as Type[]

    const isSponsoring = sponsoring?.find(p => p[1].id == myPokemon.id)

    // Should go on separate function
    useEffect(()=> {
        refetchSponsoring()
    }, [postSResult, delSResult])
    //

    const showSponsorAlert = () =>
        Alert.alert(
            'Patrocinar',
            `Con una colaboración mensual equivalente a una bolsa de comida, podés ayudar a este y otros pokemon en el refugio a tener todo lo que necesitan. ¿Querés sumar a ${myPokemon.name} a tu familia?`,
            [
            {
                text: 'Sí!',
                onPress: () => {
                    triggerPostSponsoring({pokemon: myPokemon, localId: localId})
                    Alert.alert("Patrocinando", `${myPokemon.name} se ha agregado a tu familia.\n¡Muchas gracias por tu colaboración! `)
            } /*sponsor(myPokemon)*/,
                style: 'default',
            },
            {
                text: "Cancelar",
                onPress: () => {},
                style: 'cancel'
            }
            ],
            {
            cancelable: true,
            },
        );

    const showAbandonAlert = () => {
        Alert.alert(
            'Abandonar',
            `¿Deseas abandonar a ${myPokemon.name}? Esto lo sacará de tu familia.`,
             [
            {
                text: 'Abandonar',
                onPress: () => {
                    triggerPostAbandoned({localId: localId, pokepreview: isSponsoring?.[1]})
                    triggerDeleteSponsoring({localId: localId, key: isSponsoring?.[0]})
                    Alert.alert("Abandonado", `Cancelaste tu donación mensual con éxito. ${myPokemon.name} fue removido de tu familia.`)
                }/*abandon(isSponsoring)*/,
                style: 'destructive',
            },
            {
                text: "Cancelar",
                onPress: () => {},
                style: 'cancel'
            }
            ],
            {
            cancelable: true,
            },
        )
    }


    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
                    <ImageSelection uriArray = {mySprites} />
                    <View style = {styles.row}>
                        <Text style= {styles.name} >{myPokemon.name}</Text>
                        <Text style = {styles.id}>{myPokemon.id}</Text>
                    </View>
                    <View style= {styles.row}>
                    {
                        myTypes.map((val: Type, index: number)=>(
                            <TypeItem key={index.toString()}
                                action= {() => {
                                    dispatch(setTypeSelected(val))
                                }}
                                item = {val} />
                        ))
                    }
                    </View>
                    <View style = {styles.flavorTextBox}>
                        <Text style= {styles.flavorText}>"{myPokemon.flavorText}"</Text>
                    </View>
                    <View style={styles.row}>
                        {/*
                        <Pressable onPress={null} style= {[styles.button, styles.giftButton]}>
                            <Text style= {[styles.buttonText, styles.giftText]}>Regalar</Text>
                            <MaterialCommunityIcons
                                name={"fruit-grapes"}
                                size={ 20}
                                color = { colors.primaryContrast}
                            />
                        </Pressable>
                        */}

                        { isSponsoring ? (
                            <Pressable onPress={() => showAbandonAlert()} style= {[styles.button, styles.sponsorButton]}>
                                <Text style= {[styles.buttonText, styles.sponsorText]}>Abandonar</Text>
                                <MaterialCommunityIcons
                                    name={"heart-minus"}
                                    size={ 20}
                                    color = { colors.primaryLight}
                                />
                            </Pressable>
                        ) : (
                            
                            <Pressable onPress={() => showSponsorAlert()} style= {[styles.button, styles.sponsorButton]}>
                                <Text style= {[styles.buttonText, styles.sponsorText]}>Auspiciar</Text>
                                <MaterialCommunityIcons
                                    name={"cards-heart"}
                                    size={ 20}
                                    color = { colors.primaryLight}
                                />
                            </Pressable>
                        )
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}



const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around', //space-between
        paddingHorizontal: 25,
        paddingBottom: 4
    },    
    name: {
        fontSize: 16,
        fontFamily: 'Pixel-Bold',
        justifyContent: 'flex-start'
    },
    id: {
        fontFamily: 'Pixel-Light',
        fontSize: 14,
        color: "gray",
        alignSelf: 'center',
    },
    flavorTextBox: {
        backgroundColor: colors.secondary,
        margin: 25
    },
    flavorText: {
        alignSelf: 'center',
        fontFamily: 'Pixel-Light',
        padding: 20,
        textAlign: 'center'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get("window").width * .42,
        padding:  7,
        outlineWidth: 4
    },
    buttonText: {
        fontFamily: "Pixel-Bold",
        fontSize: 12
    },
    giftButton: {
        backgroundColor: colors.primaryLight,
        outlineColor: colors.primaryContrast
    },
    giftText: {
        color: colors.primaryContrast
    },
    sponsorButton: {
        backgroundColor: colors.primaryContrast,
        outlineColor: colors.primaryContrast
    },
    sponsorText: {
        color: colors.primaryLight
    }
    


})

function triggerPostSponsoring(arg0: { pokemon: Pokemon; localId: any; }): void {
    throw new Error('Function not implemented.');
}
