const searchFood = () => {
    const inputField = document.getElementById('search-field')
    const searchValue = inputField.value
    
    const cards = document.getElementById('search-result')
    const foodDetails = document.getElementById('meal-details')
    if(inputField.value == ''){
        foodDetails.innerHTML = ''
        cards.innerHTML = `
            <h2 class="text-center mx-auto text-danger">Search Required,Please Search Any Name of foods.</h2>
        `
        
    }else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals)) 
    }
    inputField.value = ''
}

const displayFood = (foods) => {
    const cards = document.getElementById('search-result')
    // console.log(foods)
    // cards.innerHTML = ''
    cards.textContent = ''

    // if(foods.length == 0){
    //     cards.innerHTML = `
    //     <h2 class="text-center mx-auto text-danger">No Food Found What You Choise.</h2>
    // `
    // }

    foods.forEach(food => {
        // console.log(food)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick="foodDetails(${food.idMeal})" class="card btn">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">${food.strInstructions.slice(0,150)}</p>
            </div>
        </div>
        `
        cards.appendChild(div)
    });
    
}


const foodDetails = (mealId) => {
    // console.log(mealId)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => displayFoodDetails(data.meals[0]))
}

const displayFoodDetails = (meal) => {
    const foodDetails = document.getElementById('meal-details')

    // foodDetails.innerHTML = ''
    foodDetails.textContent = ''

    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary" target="_blank">Go somewhere</a>
        </div>
    `
    foodDetails.appendChild(card)
}