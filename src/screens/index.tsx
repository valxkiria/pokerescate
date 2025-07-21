import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import PokeCarousel from "../components/pokeCarousel";
import TypesList from "../components/typesList";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../global/types";


export default function Home () {

    const pokemon = useSelector((state: RootState)=> state.homeReducer.pokemon)

    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>
                    <PokeCarousel/>
                    <TypesList/>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create(
    {
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    main: {
        alignSelf: 'center',
    }
}
)