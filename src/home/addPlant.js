import React, {useState} from "react";


export const AddPlant = ({onAdd, hideAdd}) => {
    const [newPlant, setNewPlant] = useState({
        name: '',
        date: '',
        care: '',
        diary: [/*{
            do: '',
            date: '',
            note: ''
        }*/]
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
            diary: [/*{
                do: '',
                date: '',
                note: ''
            }*/]
        })
        setNewPlant({
            name: '',
            date: '',
            care: '',
            diary: [/*{
                do: '',
                date: '',
                note: ''
            }*/]
        })
        hideAdd(false);
    }




    return (
        <div className='add__form'>
            <form onSubmit={handleSubmit}>
                <label>Nazwa:
                    <input name='name' value={newPlant.name} onChange={handleNewPlant}/>
                </label>
                <label>Data sadzenia:
                    <input name='date' value={newPlant.date} onChange={handleNewPlant}/>
                </label>
                <label>Pielęgnacja:
                    <input name='care' value={newPlant.care} onChange={handleNewPlant} type='textarea'/>
                </label>
                {/*<label>Dziennik pielęgnacji:
                    <input name='diary' value={newPlant.diary} onChange={handleNewPlant} />
                </label>*/}
                <button onSubmit={handleSubmit}>Dodaj</button>
            </form>
        </div>
    );
}

