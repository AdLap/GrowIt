import React, {useEffect, useState} from "react";
//import {API} from '../home/home';
import {Link} from "react-router-dom";
import {AddDiary} from "./addDiary";
import {EditPlant} from "./editProfile";
import firebase from "firebase";
import {db, storage} from "../firebase";


export const Profile = ({match}) => {
    const [plant, setPlant] = useState({});
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        getPlant();
    }, [])

    const getPlant = () => {
        db.collection('plants')
            .doc(`${match.params.plantId}`)
            .get()
            .then(plt => {
                console.log('plt from firebase::', plt.data());
                setPlant(plt.data());
            })
            .catch(error => console.error('Err', error))
        console.log('plant id do firebase', plant.id);
        console.log('plant po add diary::', plant);
    }

    const addDiary = (newDiary) => {
        db.collection('plants')
            .doc(`${match.params.plantId}`)
            .update({diary: firebase.firestore.FieldValue.arrayUnion(newDiary)})
            .then(() => {
                setPlant({
                    ...plant,
                    diary: [...plant.diary, newDiary]
                })
            })
            .catch(error => console.error('Err', error))
    }

    const updatePlant = (plantData) => {
        db.collection('plants')
            .doc(`${match.params.plantId}`)
            .update({
                name: plantData.name,
                species: plantData.species,
                date: plantData.date,
                care: plantData.care
            })
            .then(() => {
                setPlant(plantData)
            })
            .catch(error => console.error('Err', error))
    }


    /*const getPlant = () => {
        fetch(`${API}/plants/${match.params.plantId}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(plt => {
                console.log('fetch.plt::', plt);
                setPlant(plt);
            })
            .catch(err => console.log('Err', err));
    }*/

    console.log('profile/plant::', plant);

    /*const addDiary = (newDiary) => {
        fetch(`${API}/plants/${plant.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...plant, diary: [...plant.diary, newDiary]})
        })
            .then(resp => resp.json())
            .then(diary => {
                setPlant(diary);
            })
        console.log('plant po add diary::', plant);
    }*/

    /* const updatePlant = (plantData) => {
         fetch(`${API}/plants/${plant.id}`, {
             method: 'PATCH',
             headers: {
                 "Content-TYpe": "application/json"
             },
             body: JSON.stringify(plantData)
         })
             .then(resp => resp.json())
             .then(updatedPlant => {
                 console.log('updatedPlant', updatedPlant);
                 setPlant(updatedPlant);
             })
     }*/


    const showAdd = todo => {
        setOpenAdd(todo);
    }
    const showEdit = todo => {
        setOpenEdit(todo);
    }
    console.log('plant.diary', plant.diary);
    return (
        <section className='profile'>
            <h1>{plant.name}</h1>
            <span className='profile__name'>Nazwa: {plant.species}</span>
            <span className='profile__date'>Data posadzenia: {plant.date}</span>
            <span className='profile__care'>Pielęgnacja:<br/>{plant.care}</span>

            <button className='profile__edit__btn' onClick={() => showEdit(true)}>Edytuj profil</button>

            {openEdit && <EditPlant plant={plant} onUpdatePlant={updatePlant} hideAdd={showEdit}/>}
            {openAdd && <AddDiary onAddDiary={addDiary} hideAdd={showAdd} plant={plant}/>}

            <div className='profile__diary'>
                <button className='profile__diary__add' onClick={() => showAdd(true)}>Dodaj wpis</button>
                <ul className='profile__diary__list'>Dziennik podlewań:
                    {plant.diary && plant.diary.map((plt, idx) => <li key={idx}>
                        <strong>kiedy:</strong> {plt.date}<br/><strong>co zrobione:</strong> {plt.do} / {plt.note}
                    </li>)}
                </ul>
            </div>
            <Link to='/'>Home</Link>
        </section>
    );
}
