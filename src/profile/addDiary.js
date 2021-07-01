import React, {useState} from "react";

export const AddDiary = ({onAddDiary}) => {
    const [newDiary, setNewDiary] = useState({
        name: '',
        date: '',
        care: '',
        diary: [{
            do: '',
            date: '',
            note: ''
        }]
    })

    const handleNewDiary = e => {
        setNewDiary({
            ...newDiary,
            [e.target.name]: e.target.value
    })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('addDiary/newDiary::', newDiary)
        onAddDiary({
            name: '',
            date: '',
            care: '',
            diary: [{
                do: newDiary.do,
                date: newDiary.date,
                note: newDiary.note
            }]
        })
        setNewDiary({
            name: '',
            date: '',
            care: '',
            diary: [{
                do: '',
                date: '',
                note: ''
            }]
        })
    }


    return (
        <div className='add__form'>
            <form onSubmit={handleSubmit}>
                <label>Czynność:
                    <input name='do' value={newDiary.diary.do} onChange={handleNewDiary}/>
                </label>
                <label>Data:
                    <input name='date' value={newDiary.diary.date} onChange={handleNewDiary}/>
                </label>
                <label>Notatki:
                    <input name='note' value={newDiary.diary.note} onChange={handleNewDiary} type='textarea'/>
                </label>
                <button onSubmit={handleSubmit}>Dodaj</button>
            </form>
        </div>
    );
}
