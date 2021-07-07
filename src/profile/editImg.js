import React, {useState} from "react";

export const EditImg = ({onUpdateImg, hideAdd, onProgress, onResetProgress}) => {
    const [newImg, setNewImg] = useState('');

    const handleUpdateImage = e => {
        setNewImg(e.target.files[0]);
    }

    const handleSubmitImage = e => {
        e.preventDefault();
        e.stopPropagation();
        onUpdateImg(newImg);
    }

    const handleConfirmButton = e => {
        e.preventDefault();
        e.stopPropagation();
        hideAdd(false);
        onResetProgress(0);
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
                    <button className='add__form__btn' onClick={handleSubmitImage}
                            disabled={onProgress === 100 && true}>Dodaj zdjęcie
                        <div className='add__form__btn__progress'
                             style={{width: `${onProgress}%`}}>{onProgress === 100 && 'Zdjęcie dodano'}</div>
                    </button>
                    {onProgress === 100 &&
                    <button className='add__form__btn__ok' onClick={handleConfirmButton}>Potwierdź</button>}
                </label>
            </form>
        </div>
    );
}
