import React, {useEffect, useState} from "react";
import {API} from '../home/home';


export const Profile = ({match}) => {
    const [plant, setPlant] = useState({});

    useEffect(() => {
        fetch(`${API}/plants/${plantId}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(plant => {
                setPlant(plant)
            })
            .catch(err => console.log('Err', err))
    }, [])

    return(
        <>
            <h1>{plant.name}</h1>
            profil
            {match.params.plantId}
        </>
    );
}
