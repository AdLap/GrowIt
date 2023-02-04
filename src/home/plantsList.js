import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export const PlantsList = ({ showPlants, openAdd, onDelete }) => {

    return (
        <section className='plant'>
            <nav className='plant__box'>
                {showPlants.map(plant => <div key={plant.id} className='plant__item'>
                    <Link to={`/profile/${plant.id}`}>
                        <div className='plant__img'>
                            <img src={plant.image} alt={plant.species} className='plant__img__img' />
                        </div>
                        <h2 className='plant__name'>{plant.name}</h2>
                    </Link>
                    <button onClick={() => onDelete(plant.id, plant.image)} className='plant__delete'>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>)}
                <button onClick={() => openAdd(true)} className='plant__add'>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </button>
            </nav>
        </section>
    );
}
