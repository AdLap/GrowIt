import React, {useState} from "react";

export const HandleImg = ({onUpdateImg, hideAdd, onProgress, onResetProgress, onAddImage}) => {
    const [newImg, setNewImg] = useState('');
    const [err, setErr] = useState('');

    const handleUpdateImage = e => {
        let selectedImage = e.target.files[0];
    //    setNewImg(selectedImage);
        if (selectedImage.type.includes('image/jpeg' || 'image/png')) {
            setNewImg(selectedImage);
            setErr('');
        } else {
            setNewImg(null);
            setErr('Wybierz plik z obrazem (jpg lub png)')
        }
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
                    {newImg && <div className='add__form__selected'>{newImg.name}</div> }
                    {err && <div className='add__form__err'>{err}</div> }
                    <button className='add__form__btn' onClick={handleSubmitImage}
                            disabled={onProgress === 100}>Dodaj zdjęcie
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
