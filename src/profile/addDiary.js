import React, {useState} from "react";


export const AddDiary = ({onAddDiary}) => {
    const [newDiary, setNewDiary] = useState({
        do: '',
        date: '',
        note: ''
    })

    const handleNewDiary = e => {
        setNewDiary({
            ...newDiary,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('newDiary::', newDiary)
        onAddDiary({
            do: newDiary.do,
            date: newDiary.date,
            note: newDiary.note
        })
        setNewDiary({
            do: '',
            date: '',
            note: ''
        })
    }


    return(
        <div className='add__form'>
            <form onSubmit={handleSubmit}>
                <label>Czynność:
                    <input name='do' value={newDiary.do} onChange={handleNewDiary} />
                </label>
                <label>Data sadzenia:
                    <input name='date' value={newDiary.date} onChange={handleNewDiary} />
                </label>
                <label>Notatki:
                    <input name='note' value={newDiary.note} onChange={handleNewDiary} type='textarea'/>
                </label>
                <button onSubmit={handleSubmit}>Dodaj</button>
            </form>
        </div>
    );
}
