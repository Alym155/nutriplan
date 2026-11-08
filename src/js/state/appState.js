export const state = {
  currentMeal: null,
  currentNutrition: null,
  currentProducts: [],
  currentMeals: [],
  recipesView: "grid",
  foodLog: JSON.parse(localStorage.getItem("foodLog")) ?? [],
};

export const saveFoodLog = () => {
  localStorage.setItem("foodLog", JSON.stringify(state.foodLog));
};
