import { MealApi } from "./api/mealdb.js";
import { state, saveFoodLog } from "./state/appState.js";
import { ui } from "./ui/components.js";
import { NutritionApi, ProductApi } from "./api/mealdb.js";

const mainContaint = document.querySelector("#main-content");
const searchFiltersSection = document.querySelector("#search-filters-section");
const mealCategoriesSection = document.querySelector("#meal-categories-section");
const allRecipesSection = document.querySelector("#all-recipes-section");
const filterButtons = document.querySelector(
  "#search-filters-section  .overflow-x-auto",
);
const mealType = document.querySelector("#categories-grid");
const mealDetails = document.querySelector("#meal-details");
const mealDetailsContent = document.querySelector("#meal-details-content");
const ProductSection = document.querySelector("#products-section");
const foodlogSection = document.querySelector("#foodlog-section");
const recipesGrid = document.querySelector("#recipes-grid");
const searchInput = document.querySelector("#search-input");
const recipeCount = document.querySelector("#recipes-count");
const backToMealsBtn = document.querySelector("#back-to-meals-btn");
const navLinks = document.querySelectorAll(".nav-link");
const gridViewBtn = document.querySelector("#grid-view-btn");
const listViewBtn = document.querySelector("#list-view-btn");
const headerMenuBtn = document.querySelector("#header-menu-btn");
const sidebarCloseBtn = document.querySelector("#sidebar-close-btn");
const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector("#sidebar-overlay");
const api = new MealApi();
const meals = await api.getRandomMeal();
const categories = await api.getcategories();
const areas = await api.getAreas();
const nutritionApi = new NutritionApi();
const productApi = new ProductApi();
const productsGrid = document.querySelector("#products-grid");
const productsCount = document.querySelector("#products-count");
const productSearchInput = document.querySelector("#product-search-input");
const searchProductBtn = document.querySelector("#search-product-btn");
const productCategories = document.querySelector("#product-categories");
const barcodeInput = document.querySelector("#barcode-input");
const lookupBarcodeBtn = document.querySelector("#lookup-barcode-btn");
const productCategoriesList = await productApi.getCategories();
const nutriScoreBtns = document.querySelectorAll(".nutri-score-filter");
const foodlogToday = document.querySelector("#foodlog-today-section");
const foodlogDate = document.querySelector("#foodlog-date");
const weeklyChart = document.querySelector("#weekly-chart");
const weeklyStats = document.querySelector("#weekly-stats");
const pageTitle = document.querySelector("#page-title");
const pageSubtitle = document.querySelector("#page-subtitle");

const renderRecipes = (meals) => {
  state.currentMeals = meals;
  recipesGrid.innerHTML = meals
    .map((meal) => ui.allRecipes(meal, state.recipesView))
    .join("");
};

const renderFoodLog = () => {
  const today = new Date();
  const todayItems = state.foodLog.filter((item) => item.date === today.toDateString());
  foodlogToday.innerHTML = ui.foodlogToday(todayItems);

  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const dayItems = state.foodLog.filter((item) => item.date === day.toDateString());
    days.push({
      name: day.toLocaleDateString("en-US", { weekday: "short" }),
      date: day.getDate(),
      calories: Math.round(dayItems.reduce((sum, item) => sum + item.calories, 0)),
      items: dayItems.length,
      isToday: day.toDateString() === today.toDateString(),
    });
  }

  const weekCalories = days.reduce((sum, day) => sum + day.calories, 0);
  const weekItems = days.reduce((sum, day) => sum + day.items, 0);
  const daysOnGoal = days.filter((day) => day.calories >= 1600 && day.calories <= 2200).length;

  weeklyChart.innerHTML = ui.weeklyOverview(days);
  weeklyStats.innerHTML = ui.weeklyStats(Math.round(weekCalories / 7), weekItems, daysOnGoal);
};

foodlogDate.textContent = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});
renderFoodLog();

foodlogToday.addEventListener("click", (e) => {
  if (e.target.closest("#browse-recipes-btn")) {
    document.querySelector('.nav-link[data-section="meals"]').click();
  }

  if (e.target.closest("#scan-product-btn")) {
    document.querySelector('.nav-link[data-section="products"]').click();
  }

  if (e.target.closest("#clear-foodlog")) {
    Swal.fire({
      title: "Clear all items?",
      text: "This will remove everything you logged today.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear all",
    }).then((result) => {
      if (result.isConfirmed) {
        const today = new Date().toDateString();
        state.foodLog = state.foodLog.filter((item) => item.date !== today);
        saveFoodLog();
        renderFoodLog();
        Swal.fire({ icon: "success", title: "Cleared!", timer: 1500, showConfirmButton: false });
      }
    });
  }

  const deleteBtn = e.target.closest(".delete-log-item");
  if (deleteBtn) {
    Swal.fire({
      title: "Delete this item?",
      text: "It will be removed from your food log.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        state.foodLog = state.foodLog.filter((item) => item.id !== Number(deleteBtn.dataset.id));
        saveFoodLog();
        renderFoodLog();
        Swal.fire({ icon: "success", title: "Deleted!", timer: 1500, showConfirmButton: false });
      }
    });
  }
});

mealDetails.classList.add("hidden");
ProductSection.classList.add("hidden");
foodlogSection.classList.add("hidden");
// console.log(meals);
// console.log(html);

// fiter by area buttons
filterButtons.innerHTML += ui.areaButtons(areas);
const buttons = document.querySelectorAll(".area-filter-btn");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const area = e.target.dataset.area;
    // console.log(area);
    buttons.forEach((btn) => {
      if (btn !== button) {
        btn.classList.remove("bg-emerald-600", "text-white");
        btn.classList.add(
          "bg-gray-100",
          "text-gray-700",
          "hover:bg-gray-200",
          "hover:text-gray-700",
        );
      } else {
        button.classList.remove(
          "bg-gray-100",
          "text-gray-700",
          "hover:bg-gray-200",
          "hover:text-gray-700",
        );
        button.classList.add(
          "bg-emerald-600",
          "text-white",
          "hover:bg-emerald-700",
          "hover:text-white",
        );
      }
    });
    if (area != "All") {
      recipesGrid.innerHTML = ui.loading();
      api.filterByArea(area).then((meals) => {
        renderRecipes(meals);
        recipeCount.innerHTML = `<span class="text-gray-500 text-sm">Found ${meals.length} recipes for ${area}</span>`;
      });
    } else {
      renderRecipes(meals);
    }
  });
});
// filter by categoty
mealType.innerHTML = categories
  .map((category) => ui.mealType(category.name))
  .slice(0, 12)
  .join("");

mealType.addEventListener("click", (e) => {
  const category = e.target.closest(".category-card")?.dataset.category;
  if (category) {
    recipesGrid.innerHTML = ui.loading();
    api.filterByCategory(category).then((meals) => {
      renderRecipes(meals);
      recipeCount.innerHTML = `<span class="text-gray-500 text-sm">Found ${meals.length} recipes for ${area}</span>`;
    });
  } else {
    renderRecipes(meals);
  }
});

// render all meals
renderRecipes(meals);
recipesGrid.addEventListener("click", (e) => {
  const mealId = e.target.closest(".recipe-card")?.dataset.mealId;
  mealDetails.classList.remove("hidden");
  searchFiltersSection.classList.add("hidden");
  mealCategoriesSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");

  if (mealId) {
    mealDetailsContent.innerHTML = ui.loading();
    api
      .getById(mealId)
      .then((meal) =>
        nutritionApi.analyze(meal).then((nutrition) => {
          state.currentMeal = meal;
          state.currentNutrition = nutrition;
          mealDetailsContent.innerHTML = ui.mealDetails(meal, nutrition);
        }),
      )
      .catch((error) => console.error(error));
  }
});

mealDetailsContent.addEventListener("click", (e) => {
  if (e.target.closest("#log-meal-btn")) {
    document.body.insertAdjacentHTML("beforeend", ui.logMealModal(state.currentMeal, state.currentNutrition));
    const logMealModal = document.querySelector("#log-meal-modal");
    const perServing = state.currentNutrition.perServing;

    logMealModal.addEventListener("click", (e) => {
      if (e.target.closest("#confirm-log-meal")) {
        const servings = Number(document.querySelector("#log-servings").value) || 1;
        state.foodLog.push({
          id: Date.now(),
          name: state.currentMeal.name,
          type: "meal",
          brand: state.currentMeal.category,
          image: state.currentMeal.thumbnail,
          servings: servings,
          calories: perServing.calories * servings,
          protein: perServing.protein * servings,
          carbs: perServing.carbs * servings,
          fat: perServing.fat * servings,
          date: new Date().toDateString(),
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        });
        saveFoodLog();
        renderFoodLog();
        Swal.fire({
          icon: "success",
          title: "Meal logged!",
          text: `${state.currentMeal.name} was added to your food log`,
          timer: 2000,
          showConfirmButton: false,
        });
      }

      if (e.target === logMealModal || e.target.closest("button")) {
        logMealModal.remove();
      }
    });

    document.querySelector("#log-servings").addEventListener("input", (e) => {
      const servings = e.target.value;
      document.querySelector("#log-calories").textContent = perServing.calories * servings;
      document.querySelector("#log-protein").textContent = perServing.protein * servings + "g";
      document.querySelector("#log-carbs").textContent = perServing.carbs * servings + "g";
      document.querySelector("#log-fat").textContent = perServing.fat * servings + "g";
    });
  }
});

gridViewBtn.addEventListener("click", () => {
  state.recipesView = "grid";
  recipesGrid.classList.replace("grid-cols-2", "grid-cols-4");
  renderRecipes(state.currentMeals);
  gridViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
  listViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");
  gridViewBtn.querySelector("i, svg").classList.replace("text-gray-500", "text-gray-700");
  listViewBtn.querySelector("i, svg").classList.replace("text-gray-700", "text-gray-500");
});

listViewBtn.addEventListener("click", () => {
  state.recipesView = "list";
  recipesGrid.classList.replace("grid-cols-4", "grid-cols-2");
  renderRecipes(state.currentMeals);
  listViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
  gridViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");
  listViewBtn.querySelector("i, svg").classList.replace("text-gray-500", "text-gray-700");
  gridViewBtn.querySelector("i, svg").classList.replace("text-gray-700", "text-gray-500");
});

headerMenuBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("active");
});

sidebarCloseBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
});

sidebarOverlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
});

// back to meals button
backToMealsBtn.addEventListener("click", () => {
  mealDetails.classList.add("hidden");
  searchFiltersSection.classList.remove("hidden");
  mealCategoriesSection.classList.remove("hidden");
  allRecipesSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");

    navLinks.forEach((navLink) => {
      navLink.classList.remove("bg-emerald-50", "text-emerald-700");
      navLink.classList.add("text-gray-600");
    });
    link.classList.remove("text-gray-600");
    link.classList.add("bg-emerald-50", "text-emerald-700");

    searchFiltersSection.classList.add("hidden");
    mealCategoriesSection.classList.add("hidden");
    allRecipesSection.classList.add("hidden");
    mealDetails.classList.add("hidden");
    ProductSection.classList.add("hidden");
    foodlogSection.classList.add("hidden");

    if (link.dataset.section === "meals") {
      searchFiltersSection.classList.remove("hidden");
      mealCategoriesSection.classList.remove("hidden");
      allRecipesSection.classList.remove("hidden");
      pageTitle.textContent = "Meals & Recipes";
      pageSubtitle.textContent = "Discover delicious and nutritious recipes tailored for you";
    } else if (link.dataset.section === "products") {
      ProductSection.classList.remove("hidden");
      pageTitle.textContent = "Product Scanner";
      pageSubtitle.textContent = "Search packaged foods by name or barcode";
    } else {
      foodlogSection.classList.remove("hidden");
      pageTitle.textContent = "Food Log";
      pageSubtitle.textContent = "Track your daily nutrition and food intake";
    }
  });
});

// search
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  const meals = async (query) => {
    const [byarea, bycategory, byname] = await Promise.all([
      api.filterByArea(query),
      api.filterByCategory(query),
      api.filterByMeals(query),
    ]);
    const meals = [...byarea, ...bycategory, ...byname];
    return meals;
  };

  if (query.length > 0) {
    recipesGrid.innerHTML = ui.loading();
    meals(query)
      .then((meals) => {
        if (meals.length > 0) {
          recipeCount.innerHTML = `<span class="text-gray-500 text-sm">Found ${meals.length} recipes for ${query}</span>`;
          renderRecipes(meals);
        } else {
          state.currentMeals = [];
          recipeCount.innerHTML = `<span class="text-gray-500 text-sm">No recipes found for ${query}</span>`;
          recipesGrid.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>`;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    renderRecipes(meals);
  }
});

productCategories.innerHTML = ui.productCategoryButtons(productCategoriesList);

productCategories.addEventListener("click", (e) => {
  const category = e.target.closest(".product-category-btn")?.dataset.category;
  if (category) {
    productsGrid.innerHTML = ui.loading();
    productApi.getByCategory(category).then((products) => {
      state.currentProducts = products;
      productsGrid.innerHTML = products
        .map((product) => ui.productCard(product))
        .join("");
      productsCount.innerHTML = `Found ${products.length} products for ${category}`;
    });
  }
});

productsCount.innerHTML = "Search for products to see results";
productsGrid.innerHTML = ui.productsStart();

searchProductBtn.addEventListener("click", () => {
  const query = productSearchInput.value.trim();
  if (query.length > 0) {
    productsGrid.innerHTML = ui.loading();
    productApi
      .search(query)
      .then((products) => {
        state.currentProducts = products;
        if (products.length > 0) {
          productsCount.innerHTML = `Found ${products.length} products for ${query}`;
          productsGrid.innerHTML = products
            .map((product) => ui.productCard(product))
            .join("");
        } else {
          productsCount.innerHTML = `No products found for ${query}`;
          productsGrid.innerHTML = ui.emptyProducts();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    state.currentProducts = [];
    productsCount.innerHTML = "Search for products to see results";
    productsGrid.innerHTML = ui.productsStart();
  }
});

productsGrid.addEventListener("click", async (e) => {
  const barcode = e.target.closest(".product-card")?.dataset.barcode;
  if (barcode) {
    const product = state.currentProducts.find((product) => product.barcode === barcode);
    const details = await productApi
      .getDetails(barcode)
      .catch(() => ({ ingredients: "", allergens: [] }));
    document.body.insertAdjacentHTML("beforeend", ui.productDetailModal(product, details));
    const productDetailModal = document.querySelector("#product-detail-modal");

    productDetailModal.addEventListener("click", (e) => {
      if (e.target.closest(".add-product-to-log")) {
        state.foodLog.push({
          id: Date.now(),
          name: product.name,
          type: "product",
          brand: product.brand,
          image: product.image,
          servings: 1,
          calories: Math.round(product.nutrients.calories ?? 0),
          protein: Number((product.nutrients.protein ?? 0).toFixed(1)),
          carbs: Number((product.nutrients.carbs ?? 0).toFixed(1)),
          fat: Number((product.nutrients.fat ?? 0).toFixed(1)),
          date: new Date().toDateString(),
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        });
        saveFoodLog();
        renderFoodLog();
        Swal.fire({
          icon: "success",
          title: "Product logged!",
          text: `${product.name} was added to your food log`,
          timer: 2000,
          showConfirmButton: false,
        });
      }

      if (e.target === productDetailModal || e.target.closest("button")) {
        productDetailModal.remove();
      }
    });
  }
});

lookupBarcodeBtn.addEventListener("click", () => {
  const code = barcodeInput.value.trim();
  if (code) {
    productsGrid.innerHTML = ui.loading();
    productApi
      .getByBarcode(code)
      .then((product) => {
        state.currentProducts = [product];
        productsCount.innerHTML = `Found product for barcode ${code}`;
        productsGrid.innerHTML = ui.productCard(product);
      })
      .catch((error) => {
        console.error(error);
        state.currentProducts = [];
        productsCount.innerHTML = `No product found for barcode ${code}`;
        productsGrid.innerHTML = ui.emptyProducts();
      });
  }
});

nutriScoreBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const grade = button.dataset.grade;
    nutriScoreBtns.forEach((btn) => {
      if (btn !== button) {
        btn.classList.remove("ring-2", "ring-offset-2", "ring-emerald-600");
      } else {
        button.classList.add("ring-2", "ring-offset-2", "ring-emerald-600");
      }
    });

    const filtered = grade
      ? state.currentProducts.filter((product) => product.nutritionGrade === grade)
      : state.currentProducts;

    if (filtered.length > 0) {
      productsCount.innerHTML = `Found ${filtered.length} products with Nutri-Score ${grade ? grade.toUpperCase() : "All"}`;
      productsGrid.innerHTML = filtered
        .map((product) => ui.productCard(product))
        .join("");
    } else {
      productsCount.innerHTML = `No products with Nutri-Score ${grade.toUpperCase()}`;
      productsGrid.innerHTML = ui.emptyProducts();
    }
  });
});


const loadingOverlay = document.querySelector("#app-loading-overlay");
loadingOverlay.style.opacity = "0";
setTimeout(() => loadingOverlay.remove(), 500);
