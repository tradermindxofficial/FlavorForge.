import './style.css';

// DOM Element Selectors
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipesGrid = document.getElementById('recipes-grid');
const loadingContainer = document.getElementById('loading-container');
const emptyState = document.getElementById('empty-state');
const noResultsState = document.getElementById('no-results-state');
const recipeModal = document.getElementById('recipe-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalContentBody = document.getElementById('modal-content-body');
const filterBtns = document.querySelectorAll('.filter-btn');
const langSwitcher = document.getElementById('lang-switcher');

// State tracking
let currentMeals = [];
let currentLang = 'en';

const translations = {
  en: {
    heroTitle: "Find Recipes for Your Next Culinary Masterpiece",
    heroSubtitle: "Search over thousands of recipes, get detailed ingredients, step-by-step instructions, and video guides.",
    searchPlaceholder: "Search by dish name (e.g. Pasta, Chicken)...",
    searchBtn: "Search",
    filterAll: "All",
    filterVeg: "Vegetarian",
    filterNonVeg: "Non-Vegetarian",
    filterDessert: "Desserts",
    filterBreakfast: "Breakfast",
    loadingText: "Stirring the pot and gathering ingredients...",
    emptyTitle: "Hungry? Let's Cook!",
    emptyDesc: "Type a dish name or ingredient above to discover hundreds of delicious recipes instantly.",
    noResTitle: "No Recipes Found",
    noResDesc: "We couldn't find any meals matching your search. Try adjusting your spelling or using a different ingredient!",
    footerText: "© 2026 FlavorForge. All rights reserved.",
    viewRecipe: "View Recipe",
    ingredients: "Ingredients",
    instructions: "Instructions",
    watchVideo: "Watch Video Tutorial"
  },
  hi: {
    heroTitle: "अपनी अगली शानदार रेसिपी खोजें",
    heroSubtitle: "हज़ारों रेसिपी खोजें, विस्तृत सामग्री, चरण-दर-चरण निर्देश और वीडियो गाइड प्राप्त करें।",
    searchPlaceholder: "डिश के नाम से खोजें (जैसे पास्ता, चिकन)...",
    searchBtn: "खोजें",
    filterAll: "सभी",
    filterVeg: "शाकाहारी",
    filterNonVeg: "मांसाहारी",
    filterDessert: "मिठाइयाँ",
    filterBreakfast: "नाश्ता",
    loadingText: "सामग्री इकट्ठा कर रहे हैं...",
    emptyTitle: "भूख लगी है? चलिए पकाते हैं!",
    emptyDesc: "सैकड़ों स्वादिष्ट रेसिपी खोजने के लिए ऊपर किसी डिश या सामग्री का नाम टाइप करें।",
    noResTitle: "कोई रेसिपी नहीं मिली",
    noResDesc: "हमें आपकी खोज से मेल खाने वाला कोई भोजन नहीं मिला। अपनी वर्तनी बदलने या किसी अन्य सामग्री का उपयोग करने का प्रयास करें!",
    footerText: "© 2026 FlavorForge. सर्वाधिकार सुरक्षित।",
    viewRecipe: "रेसिपी देखें",
    ingredients: "सामग्री",
    instructions: "निर्देश",
    watchVideo: "वीडियो ट्यूटोरियल देखें"
  },
  te: {
    heroTitle: "మీ తదుపరి అద్భుతమైన వంటకాన్ని కనుగొనండి",
    heroSubtitle: "వేలాది వంటకాలను శోధించండి, వివరణాత్మక పదార్థాలు, దశల వారీ సూచనలు మరియు వీడియో మార్గదర్శకాలను పొందండి.",
    searchPlaceholder: "వంటకం పేరుతో శోధించండి (ఉదాహరణకు పాస్తా, చికెన్)...",
    searchBtn: "శోధించండి",
    filterAll: "అన్నీ",
    filterVeg: "శాకాహారం",
    filterNonVeg: "మాంసాహారం",
    filterDessert: "స్వీట్లు",
    filterBreakfast: "అల్పాహారం",
    loadingText: "పదార్థాలను సేకరిస్తున్నాము...",
    emptyTitle: "ఆకలిగా ఉందా? వంట చేద్దాం!",
    emptyDesc: "వందలాది రుచికరమైన వంటకాలను తక్షణమే కనుగొనడానికి వంటకం పేరు లేదా పదాన్ని టైప్ చేయండి.",
    noResTitle: "వంటకాలు కనుగొనబడలేదు",
    noResDesc: "మీ శోధనకు సరిపోలే వంటకం మాకు కనుగొనబడలేదు. అక్షరదోషం సవరించడానికి లేదా వేరొక పదాన్ని ఉపయోగించడానికి ప్రయత్నించండి!",
    footerText: "© 2026 FlavorForge. సర్వ హక్కులు ప్రత్యేకించబడినవి.",
    viewRecipe: "వంటకాన్ని చూడండి",
    ingredients: "పదార్థాలు",
    instructions: "సూచనలు",
    watchVideo: "వీడియో ట్యుటోరియల్ చూడండి"
  },
  ta: {
    heroTitle: "உங்கள் அடுத்த அற்புதமான சமையல் குறிப்பைக் கண்டறியவும்",
    heroSubtitle: "ஆயிரக்கணக்கான சமையல் குறிப்புகளைத் தேடுங்கள், விரிவான பொருட்கள், படிப்படியான வழிமுறைகள் மற்றும் வீடியோ வழிகாட்டிகளைப் பெறுங்கள்.",
    searchPlaceholder: "உணவின் பெயர் மூலம் தேடுங்கள் (எ.கா. பாஸ்தா, சிக்கன்)...",
    searchBtn: "தேடு",
    filterAll: "அனைத்தும்",
    filterVeg: "சைவம்",
    filterNonVeg: "அசைவம்",
    filterDessert: "இனிப்புகள்",
    filterBreakfast: "காலை உணவு",
    loadingText: "பொருட்களைச் சேகரிக்கிறோம்...",
    emptyTitle: "பசியாக இருக்கிறதா? சமைக்கலாம்!",
    emptyDesc: "நூற்றுக்கணக்கான சுவையான சமையல் குறிப்புகளை உடனடியாகக் கண்டறிய மேலே ஒரு உணவின் பெயர் அல்லது பொருளை உள்ளிடவும்.",
    noResTitle: "சமையல் குறிப்புகள் எதுவும் காணப்படவில்லை",
    noResDesc: "உங்கள் தேடலுக்குப் பொருந்தக்கூடிய எந்த உணவையும் எங்களால் கண்டுபிடிக்க முடியவில்லை. உங்கள் எழுத்துப்பிழையை மாற்றவோ அல்லது வேறு பொருளைப் பயன்படுத்தவோ முயற்சிக்கவும்!",
    footerText: "© 2026 FlavorForge. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    viewRecipe: "சமையல் குறிப்பைப் பார்க்கவும்",
    ingredients: "பொருட்கள்",
    instructions: "வழிமுறைகள்",
    watchVideo: "வீடியோ டுடோரியலைப் பார்க்கவும்"
  },
  kn: {
    heroTitle: "ನಿಮ್ಮ ಮುಂದಿನ ಅದ್ಭುತ ಪಾಕವಿಧಾನವನ್ನು ಹುಡುಕಿ",
    heroSubtitle: "ಸಾವಿರಾರು ಪಾಕವಿಧಾನಗಳನ್ನು ಹುಡುಕಿ, ವಿವರವಾದ ಪದಾರ್ಥಗಳು, ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳು ಮತ್ತು ವೀಡಿಯೊ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಪಡೆಯಿರಿ.",
    searchPlaceholder: "ಭಕ್ಷ್ಯದ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ (ಉದಾ. ಪಾಸ್ತಾ, ಚಿಕನ್)...",
    searchBtn: "ಹುಡುಕಿ",
    filterAll: "ಎಲ್ಲಾ",
    filterVeg: "ಸಸ್ಯಾಹಾರಿ",
    filterNonVeg: "ಮಾಂಸಾಹಾರಿ",
    filterDessert: "ಸಿಹಿತಿಂಡಿಗಳು",
    filterBreakfast: "ಉಪಹಾರ",
    loadingText: "ಪದಾರ್ಥಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತಿದ್ದೇವೆ...",
    emptyTitle: "ಹಸಿವಾಗಿದೆಯೇ? ಅಡುಗೆ ಮಾಡೋಣ!",
    emptyDesc: "ನೂರಾರು ರುಚಿಕರವಾದ ಪಾಕವಿಧಾನಗಳನ್ನು ತಕ್ಷಣವೇ ಕಂಡುಹಿಡಿಯಲು ಭಕ್ಷ್ಯದ ಹೆಸರು ಅಥವಾ ಪದಾರ್ಥವನ್ನು ಟೈಪ್ ಮಾಡಿ.",
    noResTitle: "ಯಾವುದೇ ಪಾಕವಿಧಾನಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    noResDesc: "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಯಾವುದೇ ಊಟವನ್ನು ನಮಗೆ ಹುಡುಕಲಾಗಲಿಲ್ಲ. ನಿಮ್ಮ ಕಾಗುಣಿತವನ್ನು ಸರಿಹೊಂದಿಸಲು ಅಥವಾ ಬೇರೆ ಪದಾರ್ಥವನ್ನು ಬಳಸಲು ಪ್ರಯತ್ನಿಸಿ!",
    footerText: "© 2026 FlavorForge. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    viewRecipe: "ಪಾಕವಿಧಾನವನ್ನು ವೀಕ್ಷಿಸಿ",
    ingredients: "ಪದಾರ್ಥಗಳು",
    instructions: "ಸೂಚನೆಗಳು",
    watchVideo: "ವೀಡಿಯೊ ಟ್ಯುಟೋರಿಯಲ್ ವೀಕ್ಷಿಸಿ"
  }
};

// API Configuration
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Event Listeners
langSwitcher.addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateLanguage(currentLang);
});

function updateLanguage(lang) {
  const dict = translations[lang];
  
  // Update inner text for data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update placeholders for data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // Re-render currently displayed recipe cards to update the "View Recipe" button
  if (currentMeals && currentMeals.length > 0 && !recipesGrid.classList.contains('hidden')) {
    renderRecipeCards(currentMeals);
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Reset filter to 'All'
  filterBtns.forEach(b => b.classList.remove('active'));
  document.getElementById('btn-filter-all').classList.add('active');

  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  }
});

// Filter Event Listeners
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Remove active class from all
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked
    const clickedBtn = e.currentTarget;
    clickedBtn.classList.add('active');
    
    const category = clickedBtn.getAttribute('data-category');
    if (category === 'all') {
      const query = searchInput.value.trim();
      if (query) {
        fetchRecipes(query);
      } else {
        showState('empty');
      }
    } else if (category === 'non-veg') {
      fetchNonVegRecipes();
    } else {
      fetchCategoryRecipes(category);
    }
  });
});

// Close modal on close button click
modalCloseBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the modal container
recipeModal.addEventListener('click', (e) => {
  if (e.target === recipeModal) {
    closeModal();
  }
});

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !recipeModal.classList.contains('hidden')) {
    closeModal();
  }
});

/**
 * Fetch recipes from TheMealDB API
 * @param {string} query - The search search text
 */
async function fetchRecipes(query) {
  showState('loading');
  
  try {
    const response = await fetch(`${API_URL}${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    currentMeals = data.meals || [];
    
    if (currentMeals.length > 0) {
      renderRecipeCards(currentMeals);
      showState('results');
    } else {
      showState('no-results');
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    // Fallback to "no results" state on error, potentially logging the error to console
    showState('no-results');
  }
}

/**
 * Fetch recipes by category
 * @param {string} category 
 */
async function fetchCategoryRecipes(category) {
  showState('loading');
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    currentMeals = data.meals || [];
    if (currentMeals.length > 0) {
      currentMeals.forEach(m => m.strCategory = category);
      renderRecipeCards(currentMeals);
      showState('results');
    } else {
      showState('no-results');
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    showState('no-results');
  }
}

/**
 * Fetch recipes for Non-Vegetarian by combining multiple categories
 */
async function fetchNonVegRecipes() {
  showState('loading');
  const nonVegCategories = ['Beef', 'Chicken', 'Lamb', 'Pork', 'Seafood', 'Goat'];
  try {
    const promises = nonVegCategories.map(cat => 
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`).then(r => r.json())
    );
    const results = await Promise.all(promises);
    
    currentMeals = [];
    results.forEach((res, index) => {
      const catName = nonVegCategories[index];
      if (res && res.meals) {
        res.meals.forEach(m => m.strCategory = catName);
        currentMeals = currentMeals.concat(res.meals);
      }
    });
    
    currentMeals.sort(() => Math.random() - 0.5);
    
    if (currentMeals.length > 0) {
      renderRecipeCards(currentMeals);
      showState('results');
    } else {
      showState('no-results');
    }
  } catch (error) {
    console.error('Error fetching non-veg categories:', error);
    showState('no-results');
  }
}

/**
 * Control UI state visibility
 * @param {'loading' | 'empty' | 'no-results' | 'results'} state 
 */
function showState(state) {
  // Hide all state containers first
  loadingContainer.classList.add('hidden');
  emptyState.classList.add('hidden');
  noResultsState.classList.add('hidden');
  recipesGrid.classList.add('hidden');

  // Show the requested container
  if (state === 'loading') {
    loadingContainer.classList.remove('hidden');
  } else if (state === 'empty') {
    emptyState.classList.remove('hidden');
  } else if (state === 'no-results') {
    noResultsState.classList.remove('hidden');
  } else if (state === 'results') {
    recipesGrid.classList.remove('hidden');
  }
}

/**
 * Render recipes list as cards in the grid
 * @param {Array} meals 
 */
function renderRecipeCards(meals) {
  recipesGrid.innerHTML = '';
  
  meals.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.setAttribute('data-id', meal.idMeal);
    
    const tagsHTML = `
      <div class="card-tags">
        ${meal.strCategory ? `<span class="tag tag-category">${escapeHTML(meal.strCategory)}</span>` : ''}
        ${meal.strArea ? `<span class="tag tag-cuisine">${escapeHTML(meal.strArea)}</span>` : ''}
      </div>
    `;

    card.innerHTML = `
      <div class="card-img-wrapper">
        ${tagsHTML}
        <img class="recipe-img" src="${escapeHTML(meal.strMealThumb)}" alt="${escapeHTML(meal.strMeal)}" loading="lazy">
      </div>
      <div class="card-content">
        <h3 class="recipe-title" title="${escapeHTML(meal.strMeal)}">${escapeHTML(meal.strMeal)}</h3>
        <button class="view-recipe-btn" id="btn-view-${meal.idMeal}">
          <span>${translations[currentLang].viewRecipe}</span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;

    // Add click handler to button
    const viewBtn = card.querySelector('.view-recipe-btn');
    viewBtn.addEventListener('click', () => openRecipeDetails(meal));

    recipesGrid.appendChild(card);
  });
}

/**
 * Retrieve and structure ingredients + measures lists from recipe data
 * @param {Object} meal 
 * @returns {Array<{ingredient: string, measure: string}>}
 */
function parseIngredients(meal) {
  const ingredientsList = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredientsList.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }
  
  return ingredientsList;
}

/**
 * Populates and opens the details modal for a single recipe
 * @param {Object} meal 
 */
function openRecipeDetails(meal) {
  openRecipeDetailsAsync(meal);
}

async function openRecipeDetailsAsync(meal) {
  let fullMeal = meal;
  
  // Show loading in modal while fetching/translating
  recipeModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  modalContentBody.innerHTML = `<div style="text-align: center; padding: 3rem;"><div class="loading-spinner"></div><p style="margin-top: 1rem; color: var(--text-muted);">${translations[currentLang].loadingText || 'Loading...'}</p></div>`;

  // If instructions are missing (filtered result), fetch full details
  if (!meal.strInstructions) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        fullMeal = data.meals[0];
      }
    } catch (err) {
      console.error('Error fetching full recipe details:', err);
    }
  }

  let modalTitle = fullMeal.strMeal;
  let modalCategory = fullMeal.strCategory;
  let modalCuisine = fullMeal.strArea;
  let modalInstructions = fullMeal.strInstructions;
  let modalIngredients = parseIngredients(fullMeal);

  if (currentLang !== 'en') {
    try {
      modalTitle = await translateText(modalTitle, currentLang);
      if (modalCategory) modalCategory = await translateText(modalCategory, currentLang);
      if (modalCuisine) modalCuisine = await translateText(modalCuisine, currentLang);
      if (modalInstructions) modalInstructions = await translateText(modalInstructions, currentLang);
      
      const translatePromises = modalIngredients.map(async (ing) => {
        const translatedName = await translateText(ing.name, currentLang);
        const translatedMeasure = await translateText(ing.measure, currentLang);
        return { name: translatedName, measure: translatedMeasure };
      });
      modalIngredients = await Promise.all(translatePromises);
    } catch (e) {
      console.error('Modal translation error:', e);
    }
  }

  // Create ingredients HTML list elements
  const ingredientsListHTML = modalIngredients.map(ing => `
    <li>
      <span class="ingredient-bullet">&bull;</span>
      <span class="ingredient-measure">${escapeHTML(ing.measure)}</span>
      <span class="ingredient-name">${escapeHTML(ing.name)}</span>
    </li>
  `).join('');

  // YouTube action button HTML structure
  let actionBtnHTML = `
    <div class="modal-actions" style="margin-top: 2rem; display: flex; align-items: center; justify-content: center;">
  `;
  
  let videoId = null;
  if (fullMeal.strYoutube) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&?]*).*/;
    const match = fullMeal.strYoutube.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
  }

  if (videoId) {
    actionBtnHTML += `
      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; background-color: #ff0000; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 500; font-family: 'Outfit', sans-serif; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: var(--shadow-sm);">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px; margin-right: 8px;">
          <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
        </svg>
        ${translations[currentLang].watchVideo}
      </a>
    </div>`;
  } else {
    actionBtnHTML += `
      <p style="color: var(--text-muted); font-style: italic; margin: 0;">No video available for this recipe</p>
    </div>`;
  }

  // Render complete Modal Content Body
  modalContentBody.innerHTML = `
    <div class="modal-hero">
      <img class="modal-hero-img" src="${escapeHTML(fullMeal.strMealThumb)}" alt="${escapeHTML(modalTitle)}">
      <div class="modal-hero-overlay">
        <div class="modal-tags">
          ${modalCategory ? `<span class="tag tag-category">${escapeHTML(modalCategory)}</span>` : ''}
          ${modalCuisine ? `<span class="tag tag-cuisine">${escapeHTML(modalCuisine)}</span>` : ''}
        </div>
        <h2 class="modal-recipe-title" id="modal-recipe-title">${escapeHTML(modalTitle)}</h2>
      </div>
    </div>
    
    <div class="modal-details-grid">
      <!-- Ingredients list (left side) -->
      <section class="modal-ingredients-section">
        <h3 class="section-title">${translations[currentLang].ingredients}</h3>
        <ul class="ingredients-list">
          ${ingredientsListHTML}
        </ul>
      </section>

      <!-- Instructions (right side) -->
      <section class="modal-instructions-section">
        <h3 class="section-title">${translations[currentLang].instructions}</h3>
        <p class="instructions-text">${escapeHTML(modalInstructions)}</p>
        ${actionBtnHTML}
      </section>
    </div>
  `;
}

/**
 * Closes the details modal and restores main page scrolling
 */
function closeModal() {
  recipeModal.classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * Basic HTML escaping to prevent XSS issues when rendering API values
 * @param {string} unsafe 
 * @returns {string}
 */
function escapeHTML(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Translate dynamic text using Google Translate free API
 * @param {string} text 
 * @param {string} targetLang 
 * @returns {string} translated text
 */
async function translateText(text, targetLang) {
  if (targetLang === 'en' || !text) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ q: text })
    });
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch (e) {
    console.error('Translation error:', e);
    return text;
  }
}
