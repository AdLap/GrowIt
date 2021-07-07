import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AddDiary} from "./addDiary";
import {EditPlant} from "./editProfile";
import {EditImg} from "./editImg";
import firebase from "firebase";
import {db, storage} from "../firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExchangeAlt, faHome, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

export const Profile = ({match}) => {
    const [plant, setPlant] = useState({});
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openEditImg, setOpenEditImg] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = db.collection('plants')
            .doc(`${match.params.plantId}`)
            .onSnapshot((doc) => {
                setPlant(doc.data());
            })

        return () => unsubscribe();

    }, [])

    const addDiary = (newDiary) => {
        db.collection('plants')
            .doc(`${match.params.plantId}`)
            .update({diary: firebase.firestore.FieldValue.arrayUnion(newDiary)})
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
            .catch(error => console.error('Err', error))
    }

    const updateImage = (newImg) => {
        const uploadImg = storage.ref(`img/${newImg.name}`).put(newImg);
        uploadImg.on(
            'state-changed',
            snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref('img')
                    .child(newImg.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        uploadNewImg(url);
                    });
            }
        )
    }

    const uploadNewImg = url => {
        db.collection('plants')
            .doc(`${match.params.plantId}`)
            .update({
                image: url
            })
            .catch(err => console.log('ERR', err));
    }

    const showAdd = todo => {
        setOpenAdd(todo);
    }

    const showEdit = todo => {
        setOpenEdit(todo);
    }

    const showEditImg = todo => {
        setOpenEditImg(todo)
    }

    const resetProgress = todo => {
        setProgress(todo);
    }

    return (
        <section className='profile'>
            <div className='container'>
                <h1 className='profile__title'>{plant.name}</h1>
                <div className='profile__img'>
                    <img className='profile__img__img' src={plant.image} alt={plant.species}/>
                    <button className='profile__img__btn' onClick={() => showEditImg(true)}>
                        <FontAwesomeIcon icon={faExchangeAlt}/>
                    </button>
                </div>
                <div className='profile__data'>
                    <span className='profile__data__species'><strong>Gatunek:</strong> {plant.species}</span>
                    <span className='profile__data__date'><strong>Od kiedy go mam:</strong> {plant.date}</span>
                </div>
                <p className='profile__care'>Pielęgnacja:<br/>{plant.care}</p>

                <button className='profile__edit__btn' onClick={() => showEdit(true)}>
                    <FontAwesomeIcon icon={faEdit}/>
                </button>

                {openEditImg && <EditImg onUpdateImg={updateImage} hideAdd={showEditImg} onProgress={progress} onResetProgress={resetProgress}/>}
                {openEdit && <EditPlant plant={plant} onUpdatePlant={updatePlant} hideAdd={showEdit}/>}
                {openAdd && <AddDiary onAddDiary={addDiary} hideAdd={showAdd} plant={plant}/>}

                <div className='profile__diary'>
                    <button className='profile__diary__add' title='Dodaj wpis' onClick={() => showAdd(true)}>
                        <FontAwesomeIcon icon={faPlusCircle}/></button>
                    <ul className='profile__diary__list'>Dziennik podlewań:
                        {plant.diary && plant.diary.map((plt, idx) => <li key={idx}
                                                                          className='profile__diary__list__item'>
                            <strong>kiedy:</strong> {plt.date}<br/><strong>co zrobione:</strong> {plt.do} / {plt.note}
                        </li>)}
                    </ul>
                </div>
                <Link to='/' className='profile__home'><FontAwesomeIcon icon={faHome}/></Link>
            </div>
        </section>
    );
}
