import { NavigationContainer } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/user/userAPI";
import { useGetSponsoringQuery, usePostSponsoringMutation } from "../services/family/familyAPI";
import { setProfilePicture, setUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import AuthStackNavigator from "./authStackNavigation";
import TabNavigator from "./tabNavigation";
import { RootState } from "../global/types";
import { setSponsoring } from "../features/family/familySlice";
import { useGetPokemonQuery } from "../services/home/homeAPI";
import { setPokemon } from "../features/home/homeSlice";
import { loadFonts } from "../global/fonts";
import { getSession } from "../db";
import LoadingScreen from "../screens/loading";

export default function RootNavigator() {
    const userEmail = useSelector((state: RootState)=>state.userReducer.userEmail)
    const localId = useSelector((state: RootState) =>state.userReducer.localId)

    const dispatch = useDispatch()
    const {data:profilePicture, isLoading: isPicLoading, error: picError} = useGetProfilePictureQuery(localId)
    const {data:sponsoring, isLoading: isSonsoringLoading, error: sponsoringError} = useGetSponsoringQuery(localId)
    const {data:pokemon} = useGetPokemonQuery(localId)
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [gotUser, setGotUser] = useState(false)

    useEffect(() => {
        const loadAllFonts = async () => {
        await loadFonts();
        setFontsLoaded(true);
        };
    
        const getUser = async () => {
        const result = await getSession();
        if (result) {
            dispatch(setUser({email: result.email, localId: result.localId}))
        }
        setGotUser(true)
        };

        loadAllFonts();
        getUser()
    }, []);


    useEffect(() => {
        dispatch(setPokemon(pokemon))
    }, [pokemon])

    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
        }
    },[profilePicture])

    useEffect(() => {
        if(sponsoring){
            dispatch(setSponsoring(sponsoring))
        }
    }, [sponsoring])

    
    if (!fontsLoaded) {
        return (<LoadingScreen/>)
    }else if (!gotUser) {
        return (<LoadingScreen/>)
    }else 
        return (
        <NavigationContainer>
            {
                userEmail ? <TabNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}