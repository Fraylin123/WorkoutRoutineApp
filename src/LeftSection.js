import React from 'react'
import './LeftSection.css'
/*Add the icons in the edit div*/
function LeftSection(){
    return(
        <div className='left'>
            <div className='edit'>
                <img></img> 
                <img></img>
            </div>

            <div className='routineType'>
                <label>
                <input type='radio' value='PPL' id='ppl'/>
                    PPL
                </label>
                <label>
                <input type='radio' />
                    Upper Lower
                </label>
                <label>
                <input type='radio' />
                    Bro Split
                </label>

            </div>
            <form>
                <label>Exercise 1:</label>
                <input type="text" placeholder="Type exercise"></input>
                <label>Exercise 2:</label>
                <input type="text" placeholder="Type exercise"></input>
                <label>Exercise 3:</label>
                <input type="text" placeholder="Type exercise"></input>
                <label>Exercise 4:</label>
                <input type="text" placeholder="Type exercise"></input>
                <label>Exercise 5</label>
                <input type="text" placeholder="Type exercise"></input>
                
            </form>
        </div>
    )
}

export default LeftSection;