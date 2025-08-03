import { FlatList, StyleSheet, View, Text } from 'react-native';
import CarouselCardItem from './atoms/carouselCard';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonSelected } from '../features/home/homeSlice';
import { RootState } from '../global/types';




export default function PokeCarousel ()  {
  const dispatch = useDispatch()
  const hPokemon = useSelector((state: RootState)=> state.homeReducer.highligtedPokemon)

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon de la Semana</Text>
      <FlatList
        data={hPokemon}
        horizontal= {true}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CarouselCardItem
            action =  {() => dispatch(setPokemonSelected(item))}
            navigateName='Pokemon'
            image= {item.sprites.front_default}
            title= {item.name}
            index= {index}
            optional= {item.id} 
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  //  flex: 1,
    padding: 10
  },
  title: {
    fontFamily: "Pixel-Bold",
    fontSize: 12,
    paddingBlockEnd: 5
  }
})