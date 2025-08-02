import { StyleSheet, Text, Dimensions, Image, View, Pressable } from 'react-native';
import { colors } from '../../global/colors';
import { PokePreview } from '../../global/interface';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    action: () =>void,
    item: PokePreview
}

export default function SponsoringListCard ({action, item}: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return(
        <Pressable 
            style= {styles.container}
            onPress={() => {
                action()
                navigation.navigate( 'Pokemon' )}}>
            <Image
                style = {styles.image}
                source = {{uri: item.sprite }}
            />
            <View style= {styles.column}>
                <View style= {styles.row}>
                    <Text style= {styles.text}>{item.name}</Text>
                    <Text style= {[styles.text, styles.id]}>{item.id}</Text>
                </View>
                <View style= {styles.row}>
                    <MaterialCommunityIcons
                        name={"cake-variant"}
                        size={ 25}
                        color = {colors.primaryContrast}
                    />
                    <Text style= {styles.text}>{item.startDate}</Text>
                </View>
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
    row: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        marginEnd: 15
    },
    column: {
        flex: 1,    
        justifyContent: "space-between",
        flexDirection: "column",
        marginVertical: 15
    },
    text: {
        fontFamily: "Pixel-Light"
    },
    id: {
        color: "gray",
        fontSize: 10
    },
})