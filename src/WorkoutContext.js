import {useState, createContext} from 'react'
import axios from 'axios'

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
    
    const [exercisesList, setExercisesList] = useState([]);
    const [currentDropdown, setCurrentDropdown] = useState(null);

    //Browse.js values
    const [exerciseContainers, setExerciseContainers] = useState([]);
    const [exerciseSearch, setExerciseSearch] = useState('');


    return (
        <WorkoutContext.Provider value = {{routineValues, setRoutineValues,
            fitnessValues, setFitnessValues,
            days, setDays,
            exerciseData, setExerciseData,
            exerciseJSON, setExerciseJSON,
            errors, setErrors,
            buttonClicked, setButtonClicked,
          
            exercisesList, setExercisesList,
            currentDropdown, setCurrentDropdown, 
            exerciseContainers, setExerciseContainers,
            exerciseSearch, setExerciseSearch}}>

            {children}
        </WorkoutContext.Provider>
    )


}
