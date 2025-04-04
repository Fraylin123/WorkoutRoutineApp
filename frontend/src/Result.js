import React from 'react'
import './Result.css'

//Component for the formatted workout routine after user fills out inputs (inner Home.js component)
function Result({ exerciseData }) {
    const copyToClipboard = () => {
        const copyText = exerciseData.map((dayData) => `${dayData.day}\n` + dayData.exercises.map((exercise) => `• ${exercise.name}: ${exercise.sets}x${exercise.reps}`).join("\n")
        ).join("\n\n");
        navigator.clipboard.writeText(copyText)
            .then(() => alert("Copied to clipboard!"))
            .catch((err) => alert("Failed to copy: ", err));
    };

    return (
        <div className="displayResult">
            {
                exerciseData.map((dayData, index) => (
                    <div key={index} className="day">
                        <h4>{dayData.day}</h4>
                        <ul>
                            {
                                dayData.exercises.map((currExercise, index) => (
                                    <li key={index}>{`${currExercise.name}: ${currExercise.sets}x${currExercise.reps}`}</li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
            <button onClick={copyToClipboard} className="copyClipboard">Copy</button>
        </div>
    )
}

export default Result;