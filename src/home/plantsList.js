import React from "react";

export const PlantsList = ({showPlants, openAdd}) => {
    return(
        <div className='plant__box'>
            {showPlants.map(plant => <div key={plant.id} className='plant__item'>{plant.name} {plant.date}</div>)}
            <button onClick={openAdd} className='plant__item'>Dodaj</button>
        </div>
    );
}
