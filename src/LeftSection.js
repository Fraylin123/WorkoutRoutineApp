import React, { useState } from 'react'
import './LeftSection.css'
import plusIcon from "./icons/plus.png"
import penIcon from "./icons/pen.png"
/*Add the icons in the edit div*/
function LeftSection() {
    const [exercise, setExercise] = useState("");

    const exerciseList = ['Bench Press', 'Dumbell Press', 'Cable Raises', 'Dumbell Lateral Raises', "Push ups"];




    return (
        <div className='left'>
            <div className='editContainer'>

                <img src={plusIcon} alt="plus icon" />
                <img src={penIcon} alt="pen icon" />

            </div>

            <form>
                <label>Exercise 1:</label>
                <div className="exerciseGroup">
                    <div className="autocomplete">
                        <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => setExercise(event.target.value)} value={exercise}></input>
                        <div className='dropDown'>
                            {exerciseList.filter((item) => {
                                const exerciseSearch = exercise.toLowerCase();
                                const currExercise = item.toLowerCase()
                                return (exerciseSearch && currExercise.startsWith(exerciseSearch) && currExercise !== exerciseSearch)

                            }).map((mapExercise) => (
                                <div className="dropdown-row" onClick={() => setExercise(mapExercise)}>{mapExercise}</div>))}
                        </div>
                    </div>
                  
                    <input type="text" placeholder="Sets" className="sets"></input>
                    <input type="text" placeholder="Reps" className="reps"></input>
                </div>



                <label>Exercise 2:</label>
                <div className="exerciseGroup">
                    <div className="autocomplete">
                        <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => setExercise(event.target.value)} value={exercise}></input>
                        <div className='dropDown'>
                            {exerciseList.filter((item) => {
                                const exerciseSearch = exercise.toLowerCase();
                                const currExercise = item.toLowerCase()
                                return (exerciseSearch && currExercise.startsWith(exerciseSearch) && currExercise !== exerciseSearch)

                            }).map((mapExercise) => (
                                <div className="dropdown-row" onClick={() => setExercise(mapExercise)}>{mapExercise}</div>))}
                        </div>
                    </div>
                  
                    <input type="text" placeholder="Sets" className="sets"></input>
                    <input type="text" placeholder="Reps" className="reps"></input>
                </div>

                <label>Exercise 3:</label>
                <div className="exerciseGroup">
                    <div className="autocomplete">
                        <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => setExercise(event.target.value)} value={exercise}></input>
                        <div className='dropDown'>
                            {exerciseList.filter((item) => {
                                const exerciseSearch = exercise.toLowerCase();
                                const currExercise = item.toLowerCase()
                                return (exerciseSearch && currExercise.startsWith(exerciseSearch) && currExercise !== exerciseSearch)

                            }).map((mapExercise) => (
                                <div className="dropdown-row" onClick={() => setExercise(mapExercise)}>{mapExercise}</div>))}
                        </div>
                    </div>
                  
                    <input type="text" placeholder="Sets" className="sets"></input>
                    <input type="text" placeholder="Reps" className="reps"></input>
                </div>


                <label>Exercise 4:</label>
                <div className="exerciseGroup">
                    <div className="autocomplete">
                        <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => setExercise(event.target.value)} value={exercise}></input>
                        <div className='dropDown'>
                            {exerciseList.filter((item) => {
                                const exerciseSearch = exercise.toLowerCase();
                                const currExercise = item.toLowerCase()
                                return (exerciseSearch && currExercise.startsWith(exerciseSearch) && currExercise !== exerciseSearch)

                            }).map((mapExercise) => (
                                <div className="dropdown-row" onClick={() => setExercise(mapExercise)}>{mapExercise}</div>))}
                        </div>
                    </div>
                  
                    <input type="text" placeholder="Sets" className="sets"></input>
                    <input type="text" placeholder="Reps" className="reps"></input>
                </div>

                <label>Exercise 5:</label>
                <div className="exerciseGroup">
                    <div className="autocomplete">
                        <input type="text" placeholder="Type exercise" className="exercises" onChange={(event) => setExercise(event.target.value)} value={exercise}></input>
                        <div className='dropDown'>
                            {exerciseList.filter((item) => {
                                const exerciseSearch = exercise.toLowerCase();
                                const currExercise = item.toLowerCase()
                                return (exerciseSearch && currExercise.startsWith(exerciseSearch) && currExercise !== exerciseSearch)

                            }).map((mapExercise) => (
                                <div className="dropdown-row" onClick={() => setExercise(mapExercise)}>{mapExercise}</div>))}
                        </div>
                    </div>
                  
                    <input type="text" placeholder="Sets" className="sets"></input>
                    <input type="text" placeholder="Reps" className="reps"></input>
                </div>

               

            </form>

        </div>
    )
}

export default LeftSection;