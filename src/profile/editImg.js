import React, {useState} from "react";

export const EditImg = ({onUpdateImg, hideAdd}) => {
    const [newImg, setNewImg] = useState('')

    const handleUpdateImage = e => {
        setNewImg(e.target.files[0]);
    }

    const handleSubmitImage = e => {
        e.preventDefault();
        e.stopPropagation();
        onUpdateImg(newImg);
        hideAdd(false);
    }

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
            </form>
        </div>
    );
}
