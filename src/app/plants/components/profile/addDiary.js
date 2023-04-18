import React, {useState} from "react";

export const AddDiary = ({onAddDiary, hideAdd}) => {
    const [newDiary, setNewDiary] = useState({
                date: new Date().toLocaleDateString(),
                do: '',
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
        console.log('addDiary/newDiary::', newDiary)
        onAddDiary({
                    date: new Date().toLocaleDateString(),
                    do: newDiary.do,
                    note: newDiary.note
            })
        setNewDiary({
                    date: new Date().toLocaleDateString(),
                    do: '',
                    note: ''
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
                <label>Data:
                    <input name='date' value={newDiary.date} onChange={handleNewDiary}/>
                </label>
                <label>Czynność:
                    <input name='do' value={newDiary.do} onChange={handleNewDiary}/>
                </label>
                <label>Notatki:
                    <input name='note' value={newDiary.note} onChange={handleNewDiary} type='textarea'/>
                </label>
                <button className='add__form__btn' onSubmit={handleSubmit}>Dodaj</button>
            </form>
        </div>
    );
}
