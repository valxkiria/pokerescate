import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Home from '../screens/index';
import TypeScreen from '../screens/category';
import DetailsScreen from '../screens/deatils';
import { colors } from '../global/colors';
//import { useSelector } from 'react-redux';
//import { RootState } from '../global/types';


const Stack = createNativeStackNavigator();


export default function HomeStack() {

  //const pokemonSelected = useSelector((state: RootState) => state.homeReducer.pokemonSelected)
  //const typeSelected = useSelector((state: RootState) => state.homeReducer.typeSelected)

  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: colors.primary}, headerTitleStyle: {fontFamily: 'Title-Solid', color: colors.white}, headerTitleAlign: 'center'} }
      >
      <Stack.Screen name="PokeRescate" component={Home} />
      
      <Stack.Screen name="Type" component={TypeScreen}/>
      <Stack.Screen name= "Pokemon" component= {DetailsScreen} />
      
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: colors.primary,
    color: colors.white,
    tintColor: colors.white,
    fontFamily: 'Title-Solid'
  }
})