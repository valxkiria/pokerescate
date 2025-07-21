import { useState } from "react"
import { StyleSheet, View, Image, FlatList, Dimensions, Pressable } from "react-native"
import { colors } from '../../global/colors'

type props = {
    uriArray: string[]
}

export default function ImageSelection ({uriArray}: props) {

    const [currentImage, setCurrentImage] = useState(0)
    
    return(

        <View>
            <Image
                style = {styles.currentImage}
                source= {{uri: uriArray[currentImage]}}
                />

                
            <FlatList
                style= {{alignSelf: 'center', paddingVertical: 10}}
                data= {uriArray}
                horizontal = {true}
                keyExtractor={(item) => uriArray.indexOf(item).toString()}
                renderItem={({item, index}) =>
                    <Pressable onPress={() => setCurrentImage(index)} >
                        <Image
                            style= {[styles.smallImage, index === currentImage? styles.selected: styles.toSelect]}
                            source = {{uri: item}}
                        />
                    </Pressable>}
                />
        </View>
    )
}


const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    currentImage: {
        width: screenWidth * 0.7,
        height: screenWidth * 0.7,
        alignSelf: 'center',
        padding: 10
    },
    smallImage: {
        width: 50,
        height: 50,
        margin: 5
    },
    selected: {
        borderColor: colors.primaryContrast,
        borderWidth: 3
    },
    toSelect: {
        backgroundColor: 'gray' 
    }
})