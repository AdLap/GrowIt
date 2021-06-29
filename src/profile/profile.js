import React, {useEffect, useState} from "react";
import {API} from '../home/home';


export const Profile = ({match}) => {
    const [plant, setPlant] = useState({});

    useEffect(() => {
        getPlant();
    },[])

    const getPlant = () => {
        fetch(`${API}/plants/${match.params.plantId}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(plant => {
                console.log('plant::', plant);
                setPlant(plant);
            })
            .catch(err => console.log('Err', err));
    }

    return(
        <>
            <h1>{plant.name}</h1>
        </>
    );
}
