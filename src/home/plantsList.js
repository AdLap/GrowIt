import React from "react";
import {Link} from "react-router-dom";

export const PlantsList = ({showPlants, openAdd, onDelete}) => {

    return (
        <section className='plant'>
            <nav className='plant__box'>
                {showPlants.map(plant => <div key={plant.id} className='plant__item'>
                    <Link to={`/profile/${plant.id}`}>
                        <div className='plant__img'>
                            <img src={plant.image} alt={plant.species} className='plant__img__img'/>
                        </div>
                        <h2 className='plant__name'>{plant.name}</h2>
                    </Link>
                    <div onClick={() => onDelete(plant.id)} className='plant__delete'>{null}</div>
                </div>)}
                <button onClick={() => openAdd(true)} className='plant__add'>{null}</button>
            </nav>
        </section>
    );
}
