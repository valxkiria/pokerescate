import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native'
import PokemonListCard from '../../components/atoms/pokemonListCard'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../global/types'
import { setPokemonSelected } from '../../features/home/homeSlice'

          
export default function TypeScreen() {

    const myPokemon = useSelector((state: RootState) => state.homeReducer.pokemonOfType)
    const myType = useSelector((state: RootState) => state.homeReducer.typeSelected)
    const dispatch= useDispatch()

    return(
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
                    <Text style = {styles.title}>Pokemon tipo {myType.nombre}</Text>
                    <FlatList
                        data= {myPokemon}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => 
                            <PokemonListCard 
                            action = {() => dispatch(setPokemonSelected(item))} 
                            item = {item} 
                            />
                        }
                        />
            </SafeAreaView>
        </SafeAreaProvider>
    )

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        alignSelf: 'center', 
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        alignSelf: "flex-start",
        fontFamily: "Pixel-Bold",
        fontSize: 14,
        margin: 4
    }
})