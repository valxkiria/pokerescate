import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './homeStackNavigation'
import ProfileStack from "./profileStackNavigation";
import FamilyStack from "./familyStackNavigation";

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
            <Tab.Screen name="Family" component={FamilyStack} 
                options={{headerShown: false, 
                    tabBarShowLabel: false,
                    tabBarIcon: ( {focused} ) => (
                        <Ionicons
                            name={ focused? "heart" : "heart-outline"}
                            size={ focused? 25 : 23}
                            color = { focused? colors.primaryContrast : colors.primary}
                    />
                    ) }} />
            <Tab.Screen name="User" component={ProfileStack} 
                options={{headerShown: false, 
                    tabBarShowLabel: false,
                    tabBarIcon: ( {focused} ) => (
                        <Ionicons
                            name={ focused? "person-circle" : "person-circle-outline"}
                            size={ focused? 25 : 23}
                            color = { focused? colors.primaryContrast : colors.primary}
                    />
                    ) }} />
      
        </Tab.Navigator>
    )
}
                    