import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { auth } from '../firebase';
import { Login } from '../auth/Login';
import { AddPlant } from "./addPlant";
import { PlantsList } from "./plantsList";

export const Home = () => {
    const [user, setUser] = useState(null);
    const [plants, setPlants] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        const unsubscribeLog = auth().onAuthStateChanged(data => {
            setUser(data.uid)
            console.log(data)
            if (user) {
                console.log(user)
            } else {
                console.log('User nie istnieje');
            }
        })

        const unsubscribe = db.collection('plants')
            .orderBy('date', 'desc')
            .onSnapshot((snapshot) => {
                setPlants(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            });
        //return () => unsubscribeLog();
        return () => unsubscribe();

    }, []);
  //  console.log('plants::', plants);

    const addPlant = (plant) => {
        db.collection('plants')
            .add(plant)
            .catch(error => console.error('error', error));
    }

    const deletePlant = (plantId, plantImg) => {
        db.collection('plants')
            .doc(plantId)
            .delete()
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
            <h1 className='home__title'>Mój ogródek</h1>
            {!user && <Login />}
            {!plants.length ? <div><h2>Wczytuję dane...</h2>
                <button onClick={() => setOpenAdd(true)} className='plant__add'>{null}</button>
            </div> : <PlantsList showPlants={plants} openAdd={handleOpenAdd} onDelete={deletePlant} />}
            {openAdd && <AddPlant onAdd={addPlant} hideAdd={handleOpenAdd} />}
        </section>
    );
}
