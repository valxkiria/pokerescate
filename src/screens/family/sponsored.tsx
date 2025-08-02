import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native'
import SponsoringListCard from '../../components/atoms/sponsoredItem'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../global/types'
import { setPokemonSelected } from '../../features/home/homeSlice'

          
export default function SponsoringScreen() {


    const pokemon = useSelector((state: RootState) => state.homeReducer.pokemon)
    const sponsoring = useSelector((state: RootState) => state.familyReducer.sponsoring)
    const dispatch= useDispatch()

    return(
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
                    <FlatList
                        data= {sponsoring}
                        keyExtractor={(item) => item.pokepreview.id}
                        ListHeaderComponent={<Text style = {styles.title}>Tu familia de {sponsoring.length} Pokemon</Text>}
                        renderItem={({ item }) => 
                            <SponsoringListCard 
                            action = {() => dispatch(setPokemonSelected(pokemon.find(p => p.id === item.pokepreview.id)))} 
                            item = {item.pokepreview} 
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
        fontSize: 12,
        margin: 4
    }
})