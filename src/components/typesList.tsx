import { StyleSheet, Text, View, FlatList } from "react-native";

//import {ParamListBase, useNavigation} from '@react-navigation/native';
//import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import TypeItem from "./atoms/typeItem";
import { useDispatch } from "react-redux";
import { setTypeSelected } from "../features/home/homeSlice";
import { useGetPokemonQuery, useGetTypesQuery } from "../services/home/homeAPI";


export default function TypesList() {

    const {data: types, isLoading: typesLoading, error: typesError} = useGetTypesQuery(null) 
    const dispatch = useDispatch()
    const {data: pokemon, isLoading: pokemonLoading, error: pokemonError} = useGetPokemonQuery(null) 

    return (
        <View style = {styles.container}>
            <Text style= {styles.title}>Tipos de Pokemon</Text>
            <FlatList
                data={types}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TypeItem 
                        action = {() => {
                            dispatch(setTypeSelected(item));
                            }
                        }
                        item = {item} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        title: {
            fontFamily: "Pixel-Bold",
            fontSize: 12,
            paddingBlockEnd: 5,
            paddingHorizontal: 10
        }
    }
)