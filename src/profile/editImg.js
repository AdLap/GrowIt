import React, {useState} from "react";
import {storage} from "../firebase";

export const EditImg = ({plantImg, onUpdateImg, hideAdd}) => {
    const [newImg, setNewImg] = useState('')

    const handleUpdateImage = e => {
        setNewImg(e.target.files[0]);
    }

    const handleSubmitImage = e => {
        e.preventDefault();
       // e.stopPropagation();
        onUpdateImg(newImg);
    }
    console.log('newImg z edit::', newImg);
/*    const handleSubmit = e => {
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
    }*/

    return (
        <div className='add__form'>
            <div className='add__close__btn' onClick={() => hideAdd(false)}>
                <span>{null}</span>
                <span>{null}</span>
            </div>

            <form onSubmit={handleSubmitImage}>
                <label>Zmień zdjęcie:
                    <input onChange={handleUpdateImage} type='file'/>
                    <button className='add__form__btn' onClick={handleSubmitImage}>Dodaj zdjęcie</button>
                </label>

               {/* <button className='add__form__btn' onSubmit={handleSubmit}>Dodaj</button>*/}
            </form>
        </div>
    );
}
