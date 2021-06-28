import React, {useEffect, useState} from "react";
import {AddPlant} from "./addPlant";
import {PlantsList} from "./plantsList";
const API = 'http://localhost:3000';


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

      if (!plants.length) {
          return (
              <h1>Wczytuję dane...</h1>
          );
      }

    return (
        <>
            <h1>Twoje rośliny:</h1>
            <PlantsList showPlants={plants} openAdd={handleOpenAdd}/>
            {openAdd && <AddPlant onAdd={addPlant} />}
        </>
    );
}
