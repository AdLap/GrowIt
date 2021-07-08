import React, {useState} from "react";

export const EditPlant = ({plant, onUpdatePlant, hideAdd}) => {
    const [updatedPlant, setUpdatedPlant] = useState({
        name: plant.name,
        species: plant.species,
        date: plant.date,
        care: plant.care,
        image: plant.image
    })

    const handleUpdatedPlant = e => {
        setUpdatedPlant({
            ...updatedPlant,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        onUpdatePlant({
                name: updatedPlant.name,
                species: updatedPlant.species,
                date: updatedPlant.date,
                care: updatedPlant.care,
                image: plant.image
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

                <button className='add__form__btn' onSubmit={handleSubmit}>Dodaj</button>
            </form>
        </div>
    )
}

