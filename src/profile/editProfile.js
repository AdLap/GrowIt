import React, {useState} from "react";
import {storage} from "../firebase";

export const EditPlant = ({plant, onUpdatePlant, hideAdd}) => {
    const [newImg, setNewImg] = useState(null);
    const [updatedUrl, setUpdatedUrl] = useState(plant.image);
    const [updatedPlant, setUpdatedPlant] = useState({
        name: plant.name,
        species: plant.species,
        date: plant.date,
        care: plant.care,
        image: plant.image
    })

 /*   const updateImage = (newImg) => {
        const uploadImg = storage.ref(`img/${newImg.name}`).put(newImg);
        uploadImg.on(
            'state-changed',
            snapshot => {
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
                        setUpdatedUrl(url);
                    });
            }
        )
    }*/

    const handleUpdatedPlant = e => {
        setUpdatedPlant({
            ...updatedPlant,
            [e.target.name]: e.target.value
        })
    }

   /* const handleUpdateImage = e => {
        setNewImg(e.target.files[0]);
    }*/

    const handleSubmit = e => {
        e.preventDefault();
        onUpdatePlant({
                name: updatedPlant.name,
                species: updatedPlant.species,
                date: updatedPlant.date,
                care: updatedPlant.care,
                image: updatedUrl
            }
        )
        setUpdatedPlant({
            name: plant.name,
            species: plant.species,
            date: plant.date,
            care: plant.care,
            image: plant.image
        })
        hideAdd(false);
    }

    /*const handleSubmitImage = e => {
        e.preventDefault();
        updateImage(newImg);
    }*/

    return (
        <div className='add__form'>
            <div className='add__close__btn' onClick={() => hideAdd(false)}>
                <span>{null}</span>
                <span>{null}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Imię:
                    <input name='name' value={updatedPlant.name} onChange={handleUpdatedPlant}/>
                </label>
                <label>Nazwa (gatunek):
                    <input name='species' value={updatedPlant.species} onChange={handleUpdatedPlant}/>
                </label>
                <label>Data sadzenia:
                    <input name='date' value={updatedPlant.date} onChange={handleUpdatedPlant}/>
                </label>
                <label>Pielęgnacja:
                    <input name='care' value={updatedPlant.care} onChange={handleUpdatedPlant} type='textarea'/>
                </label>

                {/*<label>Zmień zdjęcie:
                    <input onChange={handleUpdateImage} type='file'/>
                    <button className='add__form__btn' onClick={handleSubmitImage}>Dodaj zdjęcie</button>
                </label>*/}

                {/*<label>Dziennik pielęgnacji:
                    <input name='diary' value={updatedPlant.diary} onChange={handleUpdatedPlant} />
                </label>*/}
                <button className='add__form__btn' onSubmit={handleSubmit}>Dodaj</button>
            </form>
        </div>
    )
}

