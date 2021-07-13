import React, {useEffect, useState} from "react";
import {db, storage} from "../firebase";
import {AddPlant} from "./addPlant";
import {PlantsList} from "./plantsList";

export const Home = () => {
    const [plants, setPlants] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        const unsubscribe = db.collection('plants')
            .orderBy('date', 'desc')
            .onSnapshot((snapshot) => {
                setPlants(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
            });

        return () => unsubscribe();

    }, []);
    console.log('plants::', plants);

    const addPlant = (plant) => {
        db.collection('plants')
            .add(plant)
            //   .then(() => {

            /* setPlants([
                 ...plants,
                 plant
             ])*/
            //  })
            .catch(error => console.error('error', error));
    }

    const deletePlant = (plantId, plantImg) => {
        db.collection('plants')
            .doc(plantId)
            .delete()
           // .then(() => setPlants(plants.filter(plant => plant.id !== plantId)))
            .catch(error => console.error('error', error));
        console.log('image do del::', plantId.image);
        storage.refFromURL(plantImg).delete()
            .catch(error => console.log('Err', error));
    }

    const handleOpenAdd = todo => {
        setOpenAdd(todo);
    }

    return (
        <section className='home'>
            <h1 className='home__title'>Moje rośliny</h1>
            {!plants.length ? <div><h2>Wczytuję dane..</h2>
                <button onClick={() => setOpenAdd(true)} className='plant__add'>{null}</button>
            </div> : <PlantsList showPlants={plants} openAdd={handleOpenAdd} onDelete={deletePlant}/>}
            {openAdd && <AddPlant onAdd={addPlant} hideAdd={handleOpenAdd}/>}
        </section>
    );
}
