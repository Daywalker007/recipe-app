import { useSetRecoilState } from "recoil";
import { ingredientListState, instructionListState } from "../recoil-state/recipeState";

const useResetRecipe = () => {

    const setIngredientLineArr = useSetRecoilState(ingredientListState)
    const setInstructionLineArr = useSetRecoilState(instructionListState)

  const resetRecipe = () => {
    // Make sure that all fields are blank
    setIngredientLineArr([]);
    setInstructionLineArr([]);

    console.info("Recipe has been reset");
  }

  return resetRecipe;
};

export default useResetRecipe;
