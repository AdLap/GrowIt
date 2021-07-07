import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AddDiary} from "./addDiary";
import {EditPlant} from "./editProfile";
import firebase from "firebase";
import {db} from "../firebase";

export const Profile = ({match}) => {
    const [plant, setPlant] = useState({});
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        const unsubscribe = db.collection('plants')
            .doc(`${match.params.plantId}`)
            .onSnapshot((doc) => {
                setPlant(doc.data())
            })

        return unsubscribe;

    }, [])

    /*  const getPlant = () => {
          db.collection('plants')
              .doc(`${match.params.plantId}`)
              .onSnapshot((doc) => {
                  setPlant(doc.data())
              });
      }*/

    const addDiary = (newDiary) => {
        db.collection('plants')
            .doc(`${match.params.plantId}`)
            .update({diary: firebase.firestore.FieldValue.arrayUnion(newDiary)})
            /*   .then(() => {
                   setPlant({
                       ...plant,
                       diary: [...plant.diary, newDiary]
                   })
               })*/
            .catch(error => console.error('Err', error))
    }

    const updatePlant = (plantData) => {
        db.collection('plants')
            .doc(`${match.params.plantId}`)
            .update({
                name: plantData.name,
                species: plantData.species,
                date: plantData.date,
                care: plantData.care,
                image: plantData.image
            })
            /*   .then(() => {
                   setPlant(plantData)
               })*/
            .catch(error => console.error('Err', error))
    }

    const showAdd = todo => {
        setOpenAdd(todo);
    }
    const showEdit = todo => {
        setOpenEdit(todo);
    }

    return (
        <section className='profile'>
            <h1 className='profile__title'>{plant.name}</h1>
            <div className='profile__img'>
                <img className='profile__img__img' src={plant.image} alt={plant.species}/>
            </div>
            <span className='profile__species'><strong>Gatunek:</strong> {plant.species}</span>
            <span className='profile__date'><strong>Od kiedy go mam:</strong> {plant.date}</span>
            <p className='profile__care'>Pielęgnacja:<br/>{plant.care}</p>

            <button className='profile__edit__btn' onClick={() => showEdit(true)}>Edytuj profil</button>
            {/*<button className='profile__add__image' onClick={}>Dodaj zdjęcie</button>*/}

            {/*{openAddImage && <label>Dodaj zdjęcie:
                <input onChange={handleAddImage} type='file'/>
                <button onClick={handleSubmitImage}>upload</button>
            </label>}*/}

            {openEdit && <EditPlant plant={plant} onUpdatePlant={updatePlant} hideAdd={showEdit}/>}
            {openAdd && <AddDiary onAddDiary={addDiary} hideAdd={showAdd} plant={plant}/>}

            <div className='profile__diary'>
                <button className='profile__diary__add' title='Dodaj wpis' onClick={() => showAdd(true)}>+</button>
                <ul className='profile__diary__list'>Dziennik podlewań:
                    {plant.diary && plant.diary.map((plt, idx) => <li key={idx}
                                                                      className='profile__diary__list__item'>
                        <strong>kiedy:</strong> {plt.date}<br/><strong>co zrobione:</strong> {plt.do} / {plt.note}
                    </li>)}
                </ul>
            </div>
            <Link to='/' className='profile__home'>Home</Link>
        </section>
    );
}
