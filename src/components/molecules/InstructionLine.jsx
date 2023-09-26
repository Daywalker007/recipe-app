import React, { useRef } from 'react'
import { InputTextArea } from '../atoms/Form'
import { useRecipeContext } from '../context/RecipeContext'

export default function InstructionLine({stepNumber, defaultInfo}) {
    const {instructionLineArr, setInstructionLineArr} = useRecipeContext()
    const thisInput = useRef()

    const handleInput = (e) => {
      e.preventDefault()

      const {innerText} = e.target
      const newObj = {index:stepNumber, desc:innerText}
      
      let newContextInstructions = [...instructionLineArr]
      newContextInstructions[stepNumber] = newObj
      setInstructionLineArr(newContextInstructions)
    }
    
  return (
    <div>
        <InputTextArea ref={thisInput} defaultValue={defaultInfo?.desc} name={`Step ${stepNumber+1}`} onChange={handleInput} className={'h-fit'}/>
    </div>
  )
}
