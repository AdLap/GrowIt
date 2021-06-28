import React, {useState} from "react";


export const AddPlant = ({onAdd}) => {
    const [newPlant, setNewPlant] = useState({
        name: '',
        date: '',
        care: '',
        diary: ''
    })

    const handleNewPlant = e => {
        setNewPlant({
            ...newPlant,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('newPlant::', newPlant)
          onAdd({
              name: newPlant.name,
              date: newPlant.date,
              care: newPlant.care,
              diary: newPlant.diary
          })
    }


    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Nazwa:
                    <input name='name' value={newPlant.name} onChange={handleNewPlant} />
                </label><br/>
                <label>Data sadzenia:
                    <input name='date' value={newPlant.date} onChange={handleNewPlant} />
                </label><br/>
                <label>Pielęgnacja:
                    <input name='care' value={newPlant.care} onChange={handleNewPlant} type='textarea'/>
                </label><br/>
                <label>Dziennik pielęgnacji:
                    <input name='diary' value={newPlant.diary} onChange={handleNewPlant} />
                </label><br/>
                <button onSubmit={handleSubmit}>Dodaj</button>
            </form>
        </>
    );
}

