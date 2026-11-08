// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/

export class ui {
  static areaButton(area) {
    return `<button
              class="area-filter-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
              data-area="${area}" >
              ${area}
            </button>`;
  }

  static areaButtons(area) {
    area = area.slice(0, 10);
    return area.map((area) => this.areaButton(area)).join("");
  }

  static mealType(category) {
    const styles = {
      Beef: { card: "from-red-50 to-rose-50 border-red-200", icon: "from-red-400 to-rose-500", name: "fa-drumstick-bite" },
      Chicken: { card: "from-amber-50 to-orange-50 border-amber-200", icon: "from-amber-400 to-orange-500", name: "fa-drumstick-bite" },
      Dessert: { card: "from-pink-50 to-rose-50 border-pink-200", icon: "from-pink-400 to-rose-500", name: "fa-cake-candles" },
      Lamb: { card: "from-orange-50 to-amber-50 border-orange-200", icon: "from-orange-400 to-amber-500", name: "fa-drumstick-bite" },
      Miscellaneous: { card: "from-slate-50 to-gray-50 border-slate-200", icon: "from-slate-400 to-gray-500", name: "fa-bowl-rice" },
      Pasta: { card: "from-yellow-50 to-amber-50 border-yellow-200", icon: "from-yellow-400 to-amber-500", name: "fa-bowl-food" },
      Pork: { card: "from-rose-50 to-red-50 border-rose-200", icon: "from-rose-400 to-red-500", name: "fa-bacon" },
      Seafood: { card: "from-cyan-50 to-blue-50 border-cyan-200", icon: "from-cyan-400 to-blue-500", name: "fa-fish" },
      Side: { card: "from-green-50 to-emerald-50 border-green-200", icon: "from-green-400 to-emerald-500", name: "fa-bowl-rice" },
      Starter: { card: "from-teal-50 to-cyan-50 border-teal-200", icon: "from-teal-400 to-cyan-500", name: "fa-utensils" },
      Vegan: { card: "from-emerald-50 to-green-50 border-emerald-200", icon: "from-emerald-400 to-green-500", name: "fa-leaf" },
      Vegetarian: { card: "from-lime-50 to-green-50 border-lime-200", icon: "from-lime-400 to-green-500", name: "fa-seedling" },
    };
    const style = styles[category] ?? styles.Vegan;

    return `<div
              class="category-card bg-gradient-to-br ${style.card} rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group"
              data-category="${category}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br ${style.icon} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid ${style.name}"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${category}</h3>
                </div>
              </div>
            </div>`;
  }

  static allRecipes(data, view) {
    const description = data.instructions.join(" ").slice(0, 100) + "...";

    if (view === "list") {
      return `<div
              class="recipe-card flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${data.id}"
            >
              <div class="w-48 h-48 shrink-0 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${data.thumbnail}"
                  alt="${data.name}"
                  loading="lazy"
                />
              </div>
              <div class="p-5 flex-1">
                <h3
                  class="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${data.name}
                </h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">${description}</p>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-2"></i>
                    ${data.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-2"></i>
                    ${data.area ?? "International"}
                  </span>
                </div>
              </div>
            </div>`;
    }

    return ` <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${data.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${data.thumbnail}"
                  alt="${data.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${data.category}
                  </span>
                  ${
                    data.area
                      ? `<span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${data.area}
                  </span>`
                      : ""
                  }
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${data.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">${description}</p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${data.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${data.area ?? "International"}
                  </span>
                </div>
              </div>
            </div>`;
  }

  static productCard(data) {
    const gradeColors = {
      a: "bg-green-500",
      b: "bg-lime-500",
      c: "bg-yellow-500",
      d: "bg-orange-500",
      e: "bg-red-500",
    };

    return `<div
              class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-barcode="${data.barcode}"
            >
              <div
                class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
              >
                ${
                  data.image
                    ? `<img
                  class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  src="${data.image}"
                  alt="${data.name}"
                  loading="lazy"
                />`
                    : `<i class="fa-solid fa-image text-4xl text-gray-300"></i>`
                }
                <div
                  class="absolute top-2 left-2 ${gradeColors[data.nutritionGrade] ?? "bg-gray-400"} text-white text-xs font-bold px-2 py-1 rounded uppercase"
                >
                  Nutri-Score ${data.nutritionGrade === "unknown" ? "?" : data.nutritionGrade}
                </div>
                ${
                  data.novaGroup
                    ? `<div
                  class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                  title="NOVA ${data.novaGroup}"
                >
                  ${data.novaGroup}
                </div>`
                    : ""
                }
              </div>
              <div class="p-4">
                <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                  ${data.brand ?? "Unknown brand"}
                </p>
                <h3
                  class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                >
                  ${data.name}
                </h3>
                <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span
                    ><i class="fa-solid fa-fire mr-1"></i>${Math.round(data.nutrients.calories ?? 0)} kcal/100g</span
                  >
                </div>
                <div class="grid grid-cols-4 gap-1 text-center">
                  <div class="bg-emerald-50 rounded p-1.5">
                    <p class="text-xs font-bold text-emerald-700">${(data.nutrients.protein ?? 0).toFixed(1)}g</p>
                    <p class="text-[10px] text-gray-500">Protein</p>
                  </div>
                  <div class="bg-blue-50 rounded p-1.5">
                    <p class="text-xs font-bold text-blue-700">${(data.nutrients.carbs ?? 0).toFixed(1)}g</p>
                    <p class="text-[10px] text-gray-500">Carbs</p>
                  </div>
                  <div class="bg-purple-50 rounded p-1.5">
                    <p class="text-xs font-bold text-purple-700">${(data.nutrients.fat ?? 0).toFixed(1)}g</p>
                    <p class="text-[10px] text-gray-500">Fat</p>
                  </div>
                  <div class="bg-orange-50 rounded p-1.5">
                    <p class="text-xs font-bold text-orange-700">${(data.nutrients.sugar ?? 0).toFixed(1)}g</p>
                    <p class="text-[10px] text-gray-500">Sugar</p>
                  </div>
                </div>
              </div>
            </div>`;
  }

  static logMealModal(meal, nutrition) {
    return `<div
              id="log-meal-modal"
              class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <div class="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
                <div class="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <i class="fa-solid fa-clipboard-list text-blue-600"></i>
                    Log This Meal
                  </h2>
                  <button
                    id="close-log-modal"
                    class="w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div class="p-5">
                  <div class="flex items-center gap-4 mb-6">
                    <img
                      src="${meal.thumbnail}"
                      alt="${meal.name}"
                      class="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 class="font-bold text-gray-900">${meal.name}</h3>
                      <p class="text-sm text-gray-500">${meal.category} · ${meal.area ?? "International"}</p>
                    </div>
                  </div>

                  <label for="log-servings" class="block text-sm font-medium text-gray-700 mb-2">
                    Number of servings
                  </label>
                  <input
                    id="log-servings"
                    type="number"
                    min="1"
                    value="1"
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <div class="grid grid-cols-4 gap-2 text-center">
                    <div class="bg-emerald-50 rounded-xl p-2">
                      <p id="log-calories" class="font-bold text-emerald-700">${nutrition.perServing.calories}</p>
                      <p class="text-xs text-gray-500">kcal</p>
                    </div>
                    <div class="bg-blue-50 rounded-xl p-2">
                      <p id="log-protein" class="font-bold text-blue-700">${nutrition.perServing.protein}g</p>
                      <p class="text-xs text-gray-500">Protein</p>
                    </div>
                    <div class="bg-purple-50 rounded-xl p-2">
                      <p id="log-carbs" class="font-bold text-purple-700">${nutrition.perServing.carbs}g</p>
                      <p class="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-orange-50 rounded-xl p-2">
                      <p id="log-fat" class="font-bold text-orange-700">${nutrition.perServing.fat}g</p>
                      <p class="text-xs text-gray-500">Fat</p>
                    </div>
                  </div>
                </div>

                <div class="flex gap-3 p-5 border-t border-gray-100">
                  <button
                    id="cancel-log-meal"
                    class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    id="confirm-log-meal"
                    class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                  >
                    Log Meal
                  </button>
                </div>
              </div>
            </div>`;
  }

  static productDetailModal(product, details) {
    const nutriScore = {
      a: { color: "#038141", label: "Excellent" },
      b: { color: "#85bb2f", label: "Good" },
      c: { color: "#fecb02", label: "Fair" },
      d: { color: "#ee8100", label: "Poor" },
      e: { color: "#e63e11", label: "Bad" },
    }[product.nutritionGrade];

    const nova = {
      1: { color: "#038141", label: "Unprocessed" },
      2: { color: "#85bb2f", label: "Processed ingredients" },
      3: { color: "#ee8100", label: "Processed" },
      4: { color: "#e63e11", label: "Ultra-processed" },
    }[product.novaGroup];

    const protein = product.nutrients.protein ?? 0;
    const carbs = product.nutrients.carbs ?? 0;
    const fat = product.nutrients.fat ?? 0;
    const sugar = product.nutrients.sugar ?? 0;

    return `<div
              id="product-detail-modal"
              class="modal-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                  <div class="flex items-start gap-6 mb-6">
                    <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                      ${
                        product.image
                          ? `<img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain" />`
                          : `<i class="fa-solid fa-image text-4xl text-gray-300"></i>`
                      }
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand ?? "Unknown brand"}</p>
                      <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
                      <p class="text-sm text-gray-500 mb-3">Barcode: ${product.barcode}</p>

                      <div class="flex items-center gap-3">
                        ${
                          nutriScore
                            ? `<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${nutriScore.color}20">
                          <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold uppercase" style="background-color: ${nutriScore.color}">
                            ${product.nutritionGrade}
                          </span>
                          <div>
                            <p class="text-xs font-bold" style="color: ${nutriScore.color}">Nutri-Score</p>
                            <p class="text-[10px] text-gray-600">${nutriScore.label}</p>
                          </div>
                        </div>`
                            : ""
                        }
                        ${
                          nova
                            ? `<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${nova.color}20">
                          <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${nova.color}">
                            ${product.novaGroup}
                          </span>
                          <div>
                            <p class="text-xs font-bold" style="color: ${nova.color}">NOVA</p>
                            <p class="text-[10px] text-gray-600">${nova.label}</p>
                          </div>
                        </div>`
                            : ""
                        }
                      </div>
                    </div>
                    <button class="close-product-modal text-gray-400 hover:text-gray-600">
                      <i class="fa-solid fa-xmark text-2xl"></i>
                    </button>
                  </div>

                  <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                    <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                      Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
                    </h3>

                    <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                      <p class="text-4xl font-bold text-gray-900">${Math.round(product.nutrients.calories ?? 0)}</p>
                      <p class="text-sm text-gray-500">Calories</p>
                    </div>

                    <div class="grid grid-cols-4 gap-4">
                      <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div class="bg-emerald-500 h-2 rounded-full" style="width: ${Math.min(100, (protein / 50) * 100)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-emerald-600">${protein.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Protein</p>
                      </div>
                      <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(100, carbs)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-blue-600">${carbs.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Carbs</p>
                      </div>
                      <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min(100, (fat / 65) * 100)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-purple-600">${fat.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Fat</p>
                      </div>
                      <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(100, (sugar / 50) * 100)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-orange-600">${sugar.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Sugar</p>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-emerald-200">
                      <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${(product.nutrients.fiber ?? 0).toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Fiber</p>
                      </div>
                      <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${(product.nutrients.sodium ?? 0).toFixed(2)}g</p>
                        <p class="text-xs text-gray-500">Sodium</p>
                      </div>
                    </div>
                  </div>

                  ${
                    details.ingredients
                      ? `<div class="bg-gray-50 rounded-xl p-5 mb-6">
                    <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <i class="fa-solid fa-list text-gray-600"></i>
                      Ingredients
                    </h3>
                    <p class="text-sm text-gray-600 leading-relaxed">${details.ingredients}</p>
                  </div>`
                      : ""
                  }

                  ${
                    details.allergens.length > 0
                      ? `<div class="bg-red-50 rounded-xl p-5 mb-6 border border-red-200">
                    <h3 class="font-bold text-red-700 mb-2 flex items-center gap-2">
                      <i class="fa-solid fa-triangle-exclamation"></i>
                      Allergens
                    </h3>
                    <p class="text-sm text-red-600">${details.allergens.join(", ")}</p>
                  </div>`
                      : ""
                  }

                  <div class="flex gap-3">
                    <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="${product.barcode}">
                      <i class="fa-solid fa-plus mr-2"></i>Log This Food
                    </button>
                    <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
  }

  static foodlogToday(items) {
    const calories = items.reduce((sum, item) => sum + item.calories, 0);
    const protein = items.reduce((sum, item) => sum + item.protein, 0);
    const carbs = items.reduce((sum, item) => sum + item.carbs, 0);
    const fat = items.reduce((sum, item) => sum + item.fat, 0);

    return `<h3 class="text-lg font-bold text-gray-900 mb-4">
              <i class="fa-solid fa-fire text-orange-500 mr-2"></i>
              Today's Nutrition
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="font-medium text-gray-700">Calories</span>
                  <span class="text-sm text-emerald-600">${Math.round((calories / 2000) * 100)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                  <div class="bg-emerald-500 h-2.5 rounded-full" style="width: ${Math.min(100, (calories / 2000) * 100)}%"></div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-bold text-emerald-600">${Math.round(calories)} kcal</span>
                  <span class="text-gray-400">/ 2000 kcal</span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="font-medium text-gray-700">Protein</span>
                  <span class="text-sm text-blue-600">${Math.round((protein / 50) * 100)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                  <div class="bg-blue-500 h-2.5 rounded-full" style="width: ${Math.min(100, (protein / 50) * 100)}%"></div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-bold text-blue-600">${Math.round(protein)} g</span>
                  <span class="text-gray-400">/ 50 g</span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="font-medium text-gray-700">Carbs</span>
                  <span class="text-sm text-amber-600">${Math.round((carbs / 250) * 100)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                  <div class="bg-amber-500 h-2.5 rounded-full" style="width: ${Math.min(100, (carbs / 250) * 100)}%"></div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-bold text-amber-600">${Math.round(carbs)} g</span>
                  <span class="text-gray-400">/ 250 g</span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="font-medium text-gray-700">Fat</span>
                  <span class="text-sm text-purple-600">${Math.round((fat / 65) * 100)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                  <div class="bg-purple-500 h-2.5 rounded-full" style="width: ${Math.min(100, (fat / 65) * 100)}%"></div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-bold text-purple-600">${Math.round(fat)} g</span>
                  <span class="text-gray-400">/ 65 g</span>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-gray-700">
                  Logged Items (${items.length})
                </h4>
                ${
                  items.length > 0
                    ? `<button id="clear-foodlog" class="text-red-500 hover:text-red-600 text-sm font-medium">
                  <i class="fa-solid fa-trash mr-1"></i>Clear All
                </button>`
                    : ""
                }
              </div>

              <div id="logged-items-list" class="space-y-2">
                ${
                  items.length > 0
                    ? items.map((item) => this.loggedItem(item)).join("")
                    : `<div class="text-center py-12">
                  <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fa-solid fa-utensils text-4xl text-gray-300"></i>
                  </div>
                  <p class="text-lg font-medium text-gray-600 mb-2">No food logged today</p>
                  <p class="text-gray-400 mb-6">Start tracking your nutrition by logging meals or scanning products</p>
                  <div class="flex items-center justify-center gap-3">
                    <button
                      id="browse-recipes-btn"
                      class="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all"
                    >
                      <i class="fa-solid fa-plus mr-2"></i>Browse Recipes
                    </button>
                    <button
                      id="scan-product-btn"
                      class="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
                    >
                      <i class="fa-solid fa-barcode mr-2"></i>Scan Product
                    </button>
                  </div>
                </div>`
                }
              </div>
            </div>`;
  }

  static loggedItem(item) {
    const isProduct = item.type === "product";

    return `<div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div class="w-14 h-14 rounded-xl ${isProduct ? "bg-blue-100" : "bg-emerald-100"} flex items-center justify-center flex-shrink-0">
                <i class="fa-solid ${isProduct ? "fa-box text-blue-600" : "fa-utensils text-emerald-600"} text-xl"></i>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900">${item.name}</p>
                <p class="text-sm text-gray-500">
                  ${item.brand ? `${item.brand} • ` : ""}<span class="${isProduct ? "text-blue-600" : "text-emerald-600"}">${isProduct ? "Product" : "Meal"}</span>
                </p>
                <p class="text-xs text-gray-400">${item.time}</p>
              </div>
              <div class="text-center">
                <p class="text-xl font-bold text-emerald-600">${Math.round(item.calories)}</p>
                <p class="text-xs text-gray-500">kcal</p>
              </div>
              <div class="flex gap-2">
                <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">${item.protein}g P</span>
                <span class="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded">${item.carbs}g C</span>
                <span class="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">${item.fat}g F</span>
              </div>
              <button
                class="delete-log-item text-gray-400 hover:text-red-500 transition-all"
                data-id="${item.id}"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>`;
  }

  static weeklyOverview(days) {
    return days
      .map(
        (day) => `<div class="rounded-xl py-3 ${day.isToday ? "bg-indigo-100" : ""}">
              <p class="text-sm text-gray-500">${day.name}</p>
              <p class="text-lg font-semibold text-gray-900">${day.date}</p>
              <p class="text-xl font-bold mt-2 ${day.calories > 0 ? "text-emerald-600" : "text-gray-300"}">${day.calories}</p>
              <p class="text-xs ${day.calories > 0 ? "text-emerald-600" : "text-gray-300"}">kcal</p>
              ${day.items > 0 ? `<p class="text-xs text-gray-400 mt-1">${day.items} items</p>` : ""}
            </div>`,
      )
      .join("");
  }

  static weeklyStats(average, totalItems, daysOnGoal) {
    return `<div class="bg-white rounded-xl p-5 border-2 border-gray-200 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <i class="fa-solid fa-chart-line text-emerald-600 text-xl"></i>
              </div>
              <div>
                <p class="text-gray-500">Weekly Average</p>
                <p class="text-2xl font-bold text-gray-900">${average} kcal</p>
              </div>
            </div>
            <div class="bg-white rounded-xl p-5 border-2 border-gray-200 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <i class="fa-solid fa-utensils text-blue-600 text-xl"></i>
              </div>
              <div>
                <p class="text-gray-500">Total Items This Week</p>
                <p class="text-2xl font-bold text-gray-900">${totalItems} items</p>
              </div>
            </div>
            <div class="bg-white rounded-xl p-5 border-2 border-gray-200 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <i class="fa-solid fa-bullseye text-purple-600 text-xl"></i>
              </div>
              <div>
                <p class="text-gray-500">Days On Goal</p>
                <p class="text-2xl font-bold text-gray-900">${daysOnGoal} / 7</p>
              </div>
            </div>`;
  }

  static productCategoryButton(category) {
    return `<button
              class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all"
              data-category="${category.id}"
            >
              ${category.name}
            </button>`;
  }

  static productCategoryButtons(categories) {
    categories = categories.slice(0, 10);
    return categories.map((category) => this.productCategoryButton(category)).join("");
  }

  static loading() {
    return `<div class="flex items-center justify-center py-12" style="grid-column: 1 / -1">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>`;
  }

  static productsStart() {
    return `<div class="flex flex-col items-center justify-center py-12 text-center" style="grid-column: 1 / -1">
              <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <i class="fa-solid fa-box-open text-gray-400 text-3xl"></i>
              </div>
              <p class="text-lg text-gray-600 mb-2">No products to display</p>
              <p class="text-gray-400">Search for a product or browse by category</p>
            </div>`;
  }

  static emptyProducts() {
    return `<div class="flex flex-col items-center justify-center py-12 text-center" style="grid-column: 1 / -1">

              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-box-open text-gray-400 text-2xl"></i>
              </div>
              <p class="text-gray-500 text-lg">No products found</p>
              <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>`;
  }

  static mealDetails(data, nutrition) {
    const videoId = data.youtube?.match(
      /(?:v=|youtu\.be\/|embed\/)([\w-]{11})/,
    )?.[1];

    return `  <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${data.thumbnail}"
                alt="${data.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${data.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${data.area ?? 'Internationl'}</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${data.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">${nutrition.servings} servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">${nutrition.perServing.calories} cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id=${data.id}
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${data.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${data.ingredients
                    .map(
                      (item) => `
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${item.measure}</span>
                      ${item.ingredient}
                    </span>
                  </div>`
                    )
                    .join("")}
                </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                  ${data.instructions
                    .map(
                      (step, index) => `
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      ${index + 1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${step}
                    </p>
                  </div>`
                    )
                    .join("")}
                </div>
              </div>

              <!-- Video Section -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  ${
                    videoId
                      ? `<iframe
                    src="https://www.youtube.com/embed/${videoId}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>`
                      : `<div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <i class="fa-solid fa-video-slash text-3xl mb-2"></i>
                    <p>No video available for this recipe</p>
                  </div>`
                  }
                </div>
              </div>
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${nutrition.perServing.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${nutrition.totals.calories} cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.protein}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: ${Math.min(100, Math.round((nutrition.perServing.protein / 50) * 100))}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${Math.min(100, Math.round((nutrition.perServing.carbs / 275) * 100))}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${Math.min(100, Math.round((nutrition.perServing.fat / 78) * 100))}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: ${Math.min(100, Math.round((nutrition.perServing.fiber / 28) * 100))}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutrition.perServing.sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${Math.min(100, Math.round((nutrition.perServing.sugar / 50) * 100))}%"
                      ></div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                      Other Nutrients (% Daily Value)
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Saturated Fat</span>
                        <span class="font-medium">${Math.round((nutrition.perServing.saturatedFat / 20) * 100)}%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${Math.round((nutrition.perServing.cholesterol / 300) * 100)}%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${Math.round((nutrition.perServing.sodium / 2300) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
  }
}
