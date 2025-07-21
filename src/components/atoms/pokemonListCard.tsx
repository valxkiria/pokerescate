import { StyleSheet, Text, Dimensions, Image, View, Pressable } from 'react-native';
import { colors } from '../../global/colors';
import { Pokemon } from '../../global/interface';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    action: () =>void,
    item: Pokemon
}

export default function PokemonListCard ({action, item}: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return(
        <Pressable 
            style= {styles.container}
            onPress={() => {
                action()
                navigation.navigate( 'Pokemon' )}}>
            <Image
                style = {styles.image}
                source = {{uri: item.sprites.front_default }}
            />
            <View style= {styles.textContainer}>
                <Text style= {styles.text}>{item.name}</Text>
                <Text style= {styles.text && styles.id}>{item.id}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        backgroundColor: colors.white,
        width: Dimensions.get("window").width *0.8,
        margin: 20,
        elevation: 10
    },
    image: {
        width: Dimensions.get("window").width *0.25,
        height: Dimensions.get("window").width *0.25,
        alignSelf: "center",
        margin: 10,
        backgroundColor: colors.primaryLight
    },
    textContainer: {
        justifyContent: "center",

    },
    text: {
        fontFamily: "Pixel-Light"
    },
    id: {
        color: "gray",
        fontSize: 14
    }
})