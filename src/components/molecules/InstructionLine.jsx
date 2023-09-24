import React, { useEffect, useState } from 'react'
import { InputTextArea } from '../atoms/Form'
import { useRecipeContext } from '../context/RecipeContext'

export default function InstructionLine({stepNumber, defaultInfo}) {
    const {instructionLineArr, setInstructionLineArr} = useRecipeContext()
    // const [currentInstruction, setCurrentInstruction] = useState({index:stepNumber, desc:''})

    const handleInput = (e) => {
        const {innerText} = e.target
        const newObj = {index:stepNumber, desc:innerText}
        // setCurrentInstruction(newObj)
        
        let newContextInstructions = [...instructionLineArr]
        newContextInstructions[stepNumber] = newObj
        setInstructionLineArr(newContextInstructions)
    }
    
  return (
    <div>
        <InputTextArea defaultValue={defaultInfo?.desc} name={`Step ${stepNumber+1}`} onChange={handleInput} className={'h-fit'}/>
    </div>
  )
}
