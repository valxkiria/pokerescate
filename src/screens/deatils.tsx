import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ImageSelection from '../components/atoms/imageSelection'
import TypeItem from '../components/atoms/typeItem'

import { useDispatch, useSelector } from 'react-redux'
import { setTypeSelected } from '../features/home/homeSlice'
import { RootState } from "../global/types";
import { Type } from '../global/interface'

import { colors } from '../global/colors'

export default function DetailsScreen () {

    const types = useSelector((state:RootState) => state.homeReducer.types)
    const dispatch = useDispatch()

    const myPokemon = useSelector((state: RootState) => state.homeReducer.pokemonSelected)
    const mySprites = [myPokemon.sprites.front_default, myPokemon.sprites.back_default, myPokemon.sprites.front_shiny, myPokemon.sprites.back_shiny]
    const myTypes = types.filter(t => myPokemon.types.includes(t.name)) as Type[]

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
                                action= {() => dispatch(setTypeSelected(myTypes[index]))}
                                item = {val} />
                        ))
                    }
                    </View>
                    <View style = {styles.flavorTextBox}>
                        <Text style= {styles.flavorText}>"{myPokemon.flavorText}"</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}



const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingTop: 1
    },    
    name: {
        fontSize: 16,
        fontFamily: 'Pixel-Bold',
        justifyContent: 'flex-start'
    },
    id: {
        fontFamily: 'Pixel-Light',
        fontSize: 14,
        color: 'gray',
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
    }

})