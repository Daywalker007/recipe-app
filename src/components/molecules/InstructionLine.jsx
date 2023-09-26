import React, { useEffect, useRef, useState } from 'react'
import { InputTextArea } from '../atoms/Form'
import { useRecipeContext } from '../context/RecipeContext'

export default function InstructionLine({stepNumber, defaultInfo}) {
    const {instructionLineArr, setInstructionLineArr} = useRecipeContext()
    const thisInput = useRef()

    const handleInput = (e) => {
      e.preventDefault()
      const {innerText} = e.target
      const newObj = {index:stepNumber, desc:innerText}

      // Stupid hack needed to prevent carat from restting to beginning of line after each keystroke
      thisInput.current.innerText = ''
      thisInput.current.innerText = innerText
      
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
