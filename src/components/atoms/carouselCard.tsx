import { StyleSheet, Text, Dimensions, Image, View, Pressable } from 'react-native';
import { colors } from '../../global/colors';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import { RootState } from '../../global/types';
import { useSelector } from 'react-redux';


type Props = {
    action:() => void,
    navigateName: string,
    image: string, 
    title: string, 
    index: number, 
    optional?: string,
}

export default function CarouselCardItem ( {action, navigateName, image, title, index, optional}: Props )  {

  
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const pokemonSelected = useSelector((state: RootState) => state.homeReducer.pokemonSelected)

    return (
    <Pressable 
      style={styles.container} 
      key={index}
      onPress= {() => {
        action()
        navigation.navigate( navigateName )} }
      >
      <View style = {styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
      </View>
      <Text style={styles.header}>{title}</Text>
      { optional !== undefined && 
        <Text style={styles.body}>{optional}</Text>  
      }
      
    </Pressable>
  )
}

const dimensions = {
  width: Dimensions.get('window').width * 0.8,
  height: Dimensions.get('window').width * 0.3
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: colors.white,
            margin: 10,
            width: dimensions.width,
            elevation: 8
        },
        imageContainer: {
            backgroundColor: colors.primaryLight,
        },
        header: {
            fontSize: 20,
            padding: 5,
            fontFamily: 'Pixel-Bold',
            justifyContent: 'flex-start'
        },
        body: {
            fontSize: 14,
            fontFamily: 'Pixel-Light',
            color: "gray"
        },
        image: {
            height: dimensions.height,
            width: dimensions.height,
            alignSelf: 'center'
        }
    }
)