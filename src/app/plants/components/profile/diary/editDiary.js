import React, {useState} from "react";

export const EditDiary = ({diary, onUpdateDiary, hideAdd}) => {
    const [updateDiary, setUpdateDiary] = useState({
        diary: {
            date: diary.date,
            do: diary.do,
            note: diary.note
        }
    })
console.log('dairy z edit::', diary)
    const handleUpdateDiary = e => {
        setUpdateDiary({
            ...updateDiary,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        onUpdateDiary({
            diary: {
                date: updateDiary.date,
                do: updateDiary.do,
                note: updateDiary.note
            }
            }
        )
        setUpdateDiary({
            diary: {
                date: diary.date,
                do: diary.do,
                note: diary.note
            }
        })
        hideAdd(false);
    }

    return(
        <div className='add__form'>
            <div className='add__close__btn' onClick={() => hideAdd(false)}>
                <span>{null}</span>
                <span>{null}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Data:
                    <input name='date' value={updateDiary.date} onChange={handleUpdateDiary}/>
                </label>
                <label>Czynność:
                    <input name='do' value={updateDiary.do} onChange={handleUpdateDiary}/>
                </label>
                <label>Notatki:
                    <input name='note' value={updateDiary.note} onChange={handleUpdateDiary} type='textarea'/>
                </label>
                <button className='add__form__btn' onSubmit={handleSubmit}>Dodaj</button>
            </form>
        </div>
    )
}