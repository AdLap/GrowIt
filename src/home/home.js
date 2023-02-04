import { collection, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase";
import { AddPlant } from "./addPlant";
import { PlantsList } from "./plantsList";

export const Home = () => {
    const [plants, setPlants] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    // const [isLoading, setIsLoading] = useState(false); // TODO

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'plants'), snapshot => {
            setPlants(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        })
        return () => unsubscribe();
    }, [])

    const addPlant = (plant) => {
        try {
            addDoc(collection(db, 'plants'), plant)
        } catch (error) {
            console.error(error)
        }
    }

    const deletePlant = (plantId, plantImg) => {
        const plantRef = ref(storage, plantImg);
        try {
            deleteDoc(doc(db, 'plants', plantId));
            deleteObject(plantRef);
        } catch (error) {
            console.error(error)
        }
    }

    const handleOpenAdd = todo => {
        setOpenAdd(todo);
    }

    return (
        <section className='home'>
            <h1 className='home__title'>Mój ogródek</h1>
            {!plants.length
                ? <div><h2>Wczytuję dane...</h2>
                    <button onClick={() => setOpenAdd(true)} className='plant__add'>Dodaj</button>
                </div>
                : <PlantsList showPlants={plants} openAdd={handleOpenAdd} onDelete={deletePlant} />}

            {openAdd && <AddPlant onAdd={addPlant} hideAdd={handleOpenAdd} />}
        </section>
    );
}
