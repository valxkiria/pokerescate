import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './homeStackNavigation'

import { colors } from '../global/colors'


const Tab = createBottomTabNavigator()

export default function TabNavigator() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} 
                options={{headerShown: false, 
                    tabBarShowLabel: false,
                    tabBarIcon: ( {focused} ) => (
                        <Ionicons
                            name={ focused? "home" : "home-outline"}
                            size={ focused? 25 : 23}
                            color = { focused? colors.primaryContrast : colors.primary}
                    />
                    ) }} />
      
        </Tab.Navigator>
    )
}
                    