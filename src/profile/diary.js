import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExchangeAlt, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";

export const Diary = ({diary, onShowAdd, onDeleteDiary}) => {

    return (
        <div className='profile__diary'>
            <button className='profile__diary__add' title='Dodaj wpis' onClick={() => onShowAdd(true)}>
                <FontAwesomeIcon icon={faPlusCircle}/>
            </button>

            <ul className='profile__diary__list'>Dziennik podlewań:
                {diary && diary.map((plt, idx) => <li key={idx}
                                                      className='profile__diary__list__item'>
                    <strong>kiedy:</strong> {plt.date}<br/><strong>co zrobione:</strong> {plt.do} / {plt.note}

                    <button className='profile__diary__list__delete' onClick={() => onDeleteDiary(plt)}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
                    {/* <button className='profile__diary__list__edit' onClick={() => onShowEditDiary(true)}>
                        <FontAwesomeIcon icon={faExchangeAlt}/>
                    </button>*/}
                </li>)}
            </ul>
        </div>
    )
}
