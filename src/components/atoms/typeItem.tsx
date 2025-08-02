import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Type } from "../../global/interface";


type props = {
    action: () => void,
    item: Type
}
export default function TypeItem({action, item}: props) {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    return (
        <Pressable 
            style={styles.typeButton}
            onPress={() => {
                action()
                navigation.navigate("Type")}
                }>
            <View style={styles.typeView}>
                <Text style={styles.buttonText}>{item.nombre}</Text>
                {item.color.length === 2? (
                    <LinearGradient
                        style={styles.thumbnail}
                        colors={[item.color[0], item.color[1]]}
                    />) : (
                    <LinearGradient
                        style={styles.thumbnail}
                        colors={[item.color[0], item.color[0]]}
                    />    
                    )
                
                }
            </View>
        </Pressable>
       

    )
}

const styles = StyleSheet.create(
    {
        typeView: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignContent: 'center',
            padding: 10,
            elevation: 10,
            backgroundColor: '#F5F5F5',
            minHeight: 40
        },
        typeButton: {
            padding: 15
        },
        thumbnail: {
            width: 20,
            height: 20,
            backgroundColor: 'white'
        },
        buttonText: {
            fontSize: 12,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            fontFamily: 'Pixel-Light',
            width: Dimensions.get('window').width * 0.5 - 90
        }
    }
)