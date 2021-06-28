import React, {useEffect, useState} from "react";
import {API} from '../home/home';


export const Profile = ({}) => {
    const [plant, setPlant] = useState({});

    useEffect(() => {
        fetch(`${API}/plants/${plant.id}`, {
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
        </>
    );
}
