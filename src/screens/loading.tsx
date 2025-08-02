import {Dimensions, StyleSheet, Image, View} from 'react-native'
import { colors } from '../global/colors'

export default function LoadingScreen () {
    return(
        <View style = {styles.test} >
            <Image 
                style= {styles.image}
                source= {require('../../assets/splash-icon.png')}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    test: {
        flex: 1,
        backgroundColor: colors.primary, 
        alignContent: 'center',
        justifyContent: 'center'
    },
    image: {
        width: Dimensions.get('window').width * .5,
        alignSelf: 'center',
        resizeMode: 'contain'
    }
})