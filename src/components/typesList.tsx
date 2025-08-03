import { StyleSheet, Text, View, FlatList } from "react-native";

//import {ParamListBase, useNavigation} from '@react-navigation/native';
//import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import TypeItem from "./atoms/typeItem";
import { useDispatch, useSelector } from "react-redux";
import { setTypeSelected } from "../features/home/homeSlice";
import { RootState } from "../global/types";


export default function TypesList() {
    const types = useSelector((state: RootState) => state.homeReducer.types)    
    const dispatch = useDispatch() 

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