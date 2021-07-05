import React, {useEffect, useState} from "react";
import {AddPlant} from "./addPlant";
import {PlantsList} from "./plantsList";
export const API = 'http://localhost:3000';


export const Home = () => {
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
                ])
            })
    }

    const deletePlant = (plantId) => {
        fetch(`${API}/plants/${plantId}`, {
            method: "DELETE"
        })
            .then(resp => {
                setPlants(plants.filter(plant => plant.id !== plantId))
            })
    }

    const handleOpenAdd = todo => {
        //  e.preventDefault();
        setOpenAdd(todo);
    }

    return (
        <>
            <h1 className='home__title'>Moje rośliny:</h1>
            {!plants.length ? <h2>Wczytuję dane..</h2> : <PlantsList showPlants={plants} openAdd={handleOpenAdd} onDelete={deletePlant}/>}
            {openAdd && <AddPlant onAdd={addPlant} hideAdd={handleOpenAdd}/>}
        </>
    );
}
