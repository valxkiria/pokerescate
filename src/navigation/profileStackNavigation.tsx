import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { colors } from '../global/colors';
import ProfileScreen from '../screens/user/profile';


const Stack = createNativeStackNavigator();


export default function ProfileStack() {

  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: colors.primary}, headerTitleStyle: {fontFamily: 'Title-Solid', color: colors.white}, headerTitleAlign: 'center', headerTintColor: "white"} }
      >
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      
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