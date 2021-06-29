import React, {useEffect, useState} from "react";
import {AddPlant} from "./addPlant";
import {PlantsList} from "./plantsList";
export const API = 'http://localhost:3000';


export const Home = ({getId}) => {
    const [plants, setPlants] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        getPlants();
    }, [])


    const getPlants = () => {
        fetch(`${API}/plants`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(plants => {
                console.log('plants::', plants);
                setPlants(plants);
            })
            .catch(err => console.log('Err', err));
    }

    const getPlantId = (plantId) => {
        console.log('showPlants ID::', plantId);
        return plantId;
    }

    const handleOpenAdd = e => {
        e.preventDefault();
        setOpenAdd(!openAdd);
    }

    const addPlant = (plant) => {
        fetch(`${API}/plants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plant)
        })
            .then(resp => resp.json())
            .then(newPlant => {
                setPlants([
                    ...plants,
                    newPlant
                ]);
            })
    }

    return (
        <>
            <h1>Twoje rośliny:</h1>
            {!plants.length ? <h2>Wczytuję dane..</h2> : <PlantsList showPlants={plants} getId={getPlantId} openAdd={handleOpenAdd}/>}
            {openAdd && <AddPlant onAdd={addPlant} />}
        </>
    );
}
