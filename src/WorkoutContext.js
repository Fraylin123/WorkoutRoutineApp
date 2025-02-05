import {useState, createContext} from 'react'

export const WorkoutContext = createContext();


export const WorkoutProvider = ({children}) => {
    //Home.js values
    const [routineValues, setRoutineValues] = useState([false, false, false]);
    const [fitnessValues, setFitnessValues] = useState([false, false, false]);
    const [days, setDays] = useState([]);
    const [exerciseData, setExerciseData] = useState([{}, {}, {}, {}, {}, {}, {}]);
    const [exerciseJSON, setExerciseJSON] = useState([]);
    const [errors, setErrors] = useState({});
    const [buttonClicked, setButtonClicked] = useState(false);

    //Left.js Values

    const [editMode, setEditMode] = useState(false);
    const [exercisesList, setExercisesList] = useState([]);
    const [currentDropdown, setCurrentDropdown] = useState(null);


    return (
        <WorkoutContext.Provider value = {{routineValues, setRoutineValues,
            fitnessValues, setFitnessValues,
            days, setDays,
            exerciseData, setExerciseData,
            exerciseJSON, setExerciseJSON,
            errors, setErrors,
            buttonClicked, setButtonClicked,
          
            editMode, setEditMode,
            exercisesList, setExercisesList,
            currentDropdown, setCurrentDropdown}}>

            {children}
        </WorkoutContext.Provider>
    )


}
