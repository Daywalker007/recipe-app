import { useRef } from 'react'
import { InputTextArea } from '../atoms/Form'
import { useRecipeContext } from '../context/RecipeContext'
import { RecipeInstructionLine } from '../types/recipe-types'

interface IInstructionLineProps {
  stepNumber: number,
  defaultInfo: RecipeInstructionLine,
}
export default function InstructionLine({stepNumber, defaultInfo}:IInstructionLineProps) {
    const {instructionLineArr, setInstructionLineArr} = useRecipeContext()
    const thisInput = useRef()

    const handleInput = (e:any) => {
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
