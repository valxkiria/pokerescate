import { FlatList, StyleSheet, View, Text } from 'react-native';
import CarouselCardItem from './atoms/carouselCard';
import { useDispatch } from 'react-redux';
import { setPokemonSelected } from '../features/home/homeSlice';
import { useGetHighlightedPokemonQuery } from '../services/home/homeAPI';




export default function PokeCarousel ()  {
  const {data: pokemon, isLoading, error} = useGetHighlightedPokemonQuery(null)
  const dispatch = useDispatch()
  
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon de la Semana</Text>
      <FlatList
        data={pokemon}
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