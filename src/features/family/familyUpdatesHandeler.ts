
import { useDispatch, useSelector } from 'react-redux'
import { setAbandoned, setSponsoring } from '../../features/family/familySlice';
import { useDeleteSponsoringMutation, useGetAbandonedQuery, useGetSponsoringQuery, usePostAbandonedMutation, usePostSponsoringMutation } from '../../services/family/familyAPI';
import { Pokemon, PokePreview } from "../../global/interface"
import { RootState } from '../../global/types';
import { useEffect } from 'react';

export function useSponsor () {
    const localId = useSelector((state: RootState) =>state.userReducer.localId)
    const {refetch: refetchSponsoring, currentData: sponsoring}= useGetSponsoringQuery(localId)
    const [triggerPostSponsoring, postSResult] = usePostSponsoringMutation()

    useEffect(()=> {
        refetchSponsoring()
    }, [postSResult])

    return function sponsor(pokemon: Pokemon) {
        triggerPostSponsoring({pokemon: pokemon, localId: localId})
    }
}

export function sponsor (pokemon: Pokemon) {
    const localId = useSelector((state: RootState) =>state.userReducer.localId)
    const {refetch: refetchSponsoring, currentData: sponsoring}= useGetSponsoringQuery(localId)
    const [triggerPostSponsoring, postSResult] = usePostSponsoringMutation()

    useEffect(()=> {
        refetchSponsoring()
    }, [postSResult])

    triggerPostSponsoring({pokemon: pokemon, localId: localId})
    
}

export function abandon (isSponsoring?: [string, PokePreview]) {
    const localId = useSelector((state: RootState) => state.userReducer.localId)
    const dispatch = useDispatch()
    const [triggerPostAbandoned, postAResult] = usePostAbandonedMutation()
    const [triggerDeleteSponsoring, delSResult] = useDeleteSponsoringMutation()
    triggerPostAbandoned({localId: localId, pokepreview: isSponsoring?.[1]})
    const abandoned = useGetAbandonedQuery(localId)
    dispatch(setAbandoned(abandoned))
    triggerDeleteSponsoring({localId: localId, key: isSponsoring?.[0]})
    const sponsoring = useGetSponsoringQuery(localId)
    dispatch(setSponsoring(sponsoring))
}