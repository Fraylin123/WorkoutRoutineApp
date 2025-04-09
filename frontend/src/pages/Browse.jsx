import "../assets/styles/Browse.css";
import axios from 'axios'
import { useEffect } from 'react'
import Video from '../components/Video.jsx'
import { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext.jsx'
import Navigation from '../components/Navigation.jsx'
import Footer from "../components/Footer.jsx"

//Component for the Browse section
function Browse() {
    const { exerciseContainers, setExerciseContainers } = useContext(WorkoutContext)
    const { exerciseSearch, setExerciseSearch } = useContext(WorkoutContext)

    useEffect(() => {
        if (exerciseContainers.length == 0) {
            axios.get("http://localhost:5000/api/exercises", {withCredentials:true})
                .then((response) => {
                    setExerciseContainers(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, []);

    const handleSearch = (newVal) => {
        setExerciseSearch(newVal);
    }

    return (
        <div className="browse-main">
            <Navigation />
            <h1>Exercise Browser</h1>
            <div className="searchBar">
                <input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} value={exerciseSearch}></input>
            </div>
            <div className="searchResults">
                {
                    exerciseContainers.filter((item) => {
                        const search = exerciseSearch.toLowerCase();
                        const currExercise = item._id.toLowerCase();
                        return (currExercise.startsWith(search));
                    }).map((currExercise) => (
                        <div key={currExercise['_id']} className="childContainer">
                            <h3>{currExercise['_id']}</h3>
                            <Video vidId={currExercise.video} />
                            <span>Primary Muscle: {currExercise.primaryMuscle}</span>
                            <span>Secondary Muscles: {currExercise.secondaryMuscles}</span>
                            <span>Equipment: {currExercise.equipment}</span>
                            <span>Level: {currExercise.level}</span>
                            <span>Type: {currExercise.type}</span>
                        </div>
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default Browse;