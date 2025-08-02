import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import DetailsScreen from '../screens/home/deatils';
import SponsoringScreen from '../screens/family/sponsored';
import TypeScreen from '../screens/home/category';
import { colors } from '../global/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../global/types';


const Stack = createNativeStackNavigator();


export default function FamilyStack() {

  const pokemonSelected = useSelector((state: RootState) => state.homeReducer.pokemonSelected)
  const typeSelected = useSelector((state: RootState) => state.homeReducer.typeSelected)

  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: colors.primary}, headerTitleStyle: {fontFamily: 'Title-Solid', color: colors.white}, headerTitleAlign: 'center', headerTintColor: "white"} }
      >
      <Stack.Screen name= "Sponsoring" component={SponsoringScreen} options={{title: "Familia", headerLargeTitle: true }}/>
      <Stack.Screen name= "Pokemon" component= {DetailsScreen} options={{title: pokemonSelected.name}}/>
      <Stack.Screen name="Type" component={TypeScreen} options={{title: typeSelected.nombre}}/>
      
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