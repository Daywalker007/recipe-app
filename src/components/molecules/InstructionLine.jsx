import React, { useEffect, useRef, useState } from 'react'
import { InputTextArea } from '../atoms/Form'
import { useRecipeContext } from '../context/RecipeContext'

export default function InstructionLine({stepNumber, defaultInfo}) {
    const {instructionLineArr, setInstructionLineArr} = useRecipeContext()
    const thisInput = useRef()
    const [selection, setSelection] = useState(null);

    // Function to save the current selection
    const saveSelection = () => {
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        setSelection(range);
      }
    };

    // Function to restore the selection
    const restoreSelection = () => {
      if (thisInput.current && selection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(selection);
      }
    };

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
