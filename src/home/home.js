import React, {useEffect, useState} from "react";
import {db} from "../firebase";
import {AddPlant} from "./addPlant";
import {PlantsList} from "./plantsList";

export const Home = () => {
    const [plants, setPlants] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    useEffect(() => {
        getPlants();
        return () => getPlants();
    }, []);
    console.log('plants::', plants);

    const getPlants = () => {
        db.collection('plants')
            .orderBy('date', 'desc')
            .onSnapshot((snapshot) => {
                setPlants(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
            });
    }

    const addPlant = (plant) => {
        db.collection('plants')
            .add(plant)
            //   .then(() => {

            //alert('Roślina dodana')
            /* setPlants([
                 ...plants,
                 plant
             ])*/
            //  })
            .catch(error => console.error('error', error));
    }

    const deletePlant = (plantId) => {
        db.collection('plants')
            .doc(plantId)
            .delete()
            .then(() => setPlants(plants.filter(plant => plant.id !== plantId)))
            .catch(error => console.error('error', error));
    }

    const handleOpenAdd = todo => {
        setOpenAdd(todo);
    }

    return (
        <>
            <h1 className='home__title'>Moje rośliny:</h1>
            {!plants.length ? <div><h2>Wczytuję dane..</h2>
                <button onClick={() => setOpenAdd(true)} className='plant__add'>{null}</button>
            </div> : <PlantsList showPlants={plants} openAdd={handleOpenAdd} onDelete={deletePlant}/>}
            {openAdd && <AddPlant onAdd={addPlant} hideAdd={handleOpenAdd}/>}
        </>
    );
}
