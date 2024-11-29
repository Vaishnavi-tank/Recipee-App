const searchBtn=document.getElementById("search-btn");
const searchInput=document.getElementById("search-input");
const mealList=document.getElementById("meal");
const mealDetailsContent=document.querySelector(".meal-details-content ");
const recipeeCloseBtn=document.getElementById("recipee-close-btn"); 
searchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click', getMealRecipee);
recipeeCloseBtn.addEventListener("click",()=>{
    mealDetailsContent.parentElement.classList.remove("showRecipee");
})
function getMealList(){
    let searchInputText=document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data.meals);
        let html="";
        if(data.meals){
            data.meals.forEach(meal =>{
                html += `
                 <div class="meal-item" data-id="${meal.idMeal}">
                 <div class="meal-img" >
                 <img src="${meal.strMealThumb}" alt="food">
                 </div>
                 <div class="meal-name">
                 <h3>${meal.strMeal}</h3>
                 <a href="#" class="recipee-btn">Get Recipee</a>
                 </div>
                 </div>
                `;
            });
        mealList.classList.remove('notFound');
        }else{
            html="Sorry, We didn't find any meal";
            mealList.classList.add('not Found');
        }
        mealList.innerHTML=html;
    });
}
function getMealRecipee(e){
    e.preventDefault();
    if(e.target.classList.contains('recipee-btn')){
        let mealItem= e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response =>response.json())
        .then(data=>mealRecipeeModal(data.meals));
    }
}
function mealRecipeeModal(meal){
  console.log(meal);
  meal=meal[0];
  let html=`
  <h2 class='recipee-title'>${meal.strMeal}</h2>
  <p class="recipee-category">${meal.strCategory}</p>
  <div class="recipee-instruction">
  <h3>Instructions:</h3>
   <p>${meal.strInstructions}</p>

  </div>
  <div class="recipee-meal-img">
  <img src="${meal.strMealThumb}">
  </div>
  <div class="recipee-link">
  <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>
  `;
  mealDetailsContent.innerHTML=html;
  mealDetailsContent.parentElement.classList.add("showRecipee");
}