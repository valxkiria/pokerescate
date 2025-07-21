import {StyleSheet, Text, View} from 'react-native'
import { colors } from '../global/colors'

export default function LoadingScreen () {
    return(
        <View style = {styles.test} >
            <Text style = {styles.test} >Loading...</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    test: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.primary,
        alignSelf: 'center', 
        alignContent: 'center',
        justifyContent: 'center'
    }
})