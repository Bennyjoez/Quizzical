import React from "react";
import {v4 as key} from "uuid"

export default function Quiztile({question, correct_answer, answersArr, id, handleSelect, isSelected, check}) {
    const answers = answersArr.sort().map(ans => {
        const checked = check && ans === correct_answer ? {backgroundColor: "green"} : check && isSelected === correct_answer ? {backgroundColor: "lightGreen"} : check && isSelected.ans != correct_answer ? {backgroundColor: "Red"} : {backgroundColor: "white"}

        const selected = isSelected?.ans === ans ? 
        {
            backgroundColor: "aquamarine",
        } 
        :
        {
            backgroundColor: "white"
        }
        return(
            <div 
                key={key()} 
                style={check ? checked : selected}
                className="answer" 
                dangerouslySetInnerHTML={{__html: ans}} 
                onClick={() => handleSelect(id, ans)}
            />
        )
    })
    return(
        <div className="quiztile">
            <h2 className="question" dangerouslySetInnerHTML={{__html: question}} />
            <div className="answers">
                {answers}
            </div>
        </div>
    )
} 