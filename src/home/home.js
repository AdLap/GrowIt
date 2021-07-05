import React, {useEffect, useState} from "react";
// import firebase from "firebase";
import {db} from "../firebase";
import {AddPlant} from "./addPlant";
import {PlantsList} from "./plantsList";

//export const API = 'http://localhost:3000';


export const Home = () => {
    const [plants, setPlants] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        getPlants();
    }, [])

    const getPlants = () => {
        db.collection('plants')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(plt => {
                    const data = (doc) => {
                        return {id: doc.id, ...doc.data()}
                    };
                    setPlants(plants => [...plants, data(plt)])
                })
            })
            .catch(error => console.error('Err', error))
    }

    const addPlant = (plant) => {
        db.collection('plants')
            .add(plant)
            .then(() => {
               // alert('Roślina dodana')
                setPlants([
                    ...plants,
                    plant
                ])
            })
            .catch(error => console.error('error', error))
    }

    const deletePlant = (plantId) => {
        db.collection('plants')
            .doc(plantId)
            .delete()
            .then(() => setPlants(plants.filter(plant => plant.id !== plantId)))
            .catch(error => console.error('error', error))

        /*fetch(`${API}/plants/${plantId}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (resp.ok) {
                    setPlants(plants.filter(plant => plant.id !== plantId))
                }
                throw new Error();
            })*/
    }

    /* const getPlants = () => {
         fetch(`${API}/plants`, {
             method: 'GET'
         })
             .then(resp => resp.json())
             .then(plants => {
                 console.log('plants::', plants);
                 setPlants(plants);
             })
             .catch(err => console.log('Err', err));
     }*/

    /* const addPlant = (plant) => {
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
     }*/

   /* const deletePlant = (plantId) => {
        fetch(`${API}/plants/${plantId}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (resp.ok) {
                    setPlants(plants.filter(plant => plant.id !== plantId))
                }
                throw new Error();
            })
    }*/

    const handleOpenAdd = todo => {
        //  e.preventDefault();
        setOpenAdd(todo);
    }

    return (
        <>
            <h1 className='home__title'>Moje rośliny:</h1>
            {!plants.length ? <div><h2>Wczytuję dane..</h2>
                <button onClick={() => setOpenAdd(true)} className='plant__add'>Dodaj</button>
            </div> : <PlantsList showPlants={plants} openAdd={handleOpenAdd} onDelete={deletePlant}/>}
            {openAdd && <AddPlant onAdd={addPlant} hideAdd={handleOpenAdd}/>}

        </>
    );
}
