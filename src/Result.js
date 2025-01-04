import React from 'react'



function Result({ exerciseData }) {


    return (
        <div className="displayResult">
            {
                exerciseData.map((dayData, index) => (
                    <div key={index} className="day">
                        <h4>{dayData.day}</h4>
                        <ul>
                            {
                                dayData.exercises.map((currExercise, index) => (
                                    <li key ={index}>{`${currExercise.name}: ${currExercise.sets}x${currExercise.reps}`}</li>
                                ))
                            }
                        </ul>

                    </div>

                ))

            }


        </div>
    )
}

export default Result;