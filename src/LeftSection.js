import React from 'react'
import './LeftSection.css'
import plusIcon from "./icons/plus.png"
import penIcon from "./icons/pen.png"
/*Add the icons in the edit div*/
function LeftSection() {


    return (
        <div className='left'>
            <div className="leftContainer">
                <div className='edit'>
                    <img src={plusIcon} alt="plus icon" />
                    <img src={penIcon} alt="pen icon" />
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
        </div>
    )
}

export default LeftSection;