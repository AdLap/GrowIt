import React, {useEffect, useState} from "react";
import {AddPlant} from "./addPlant";
const API = 'http://localhost:3000';


export const Home = () => {
    const [plants, setPlants] = useState([]);

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

    const handleOpenAdd = e => {
        e.preventDefault();
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

      if (!plants.length) {
          return (
              <h1>Wczytuję dane...</h1>
          );
      }

    return (
        <>
            <h1>Twoje rośliny:</h1>
            <ul>
                {plants.map(plant => <li key={plant.id}>{plant.name}, {plant.date}</li>)}
            </ul>
            <button onClick={handleOpenAdd}>Dodaj</button>
            <AddPlant onAdd={addPlant} />
        </>
    );
}
