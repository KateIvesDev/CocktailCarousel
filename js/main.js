
document.getElementById('cocktail-button').addEventListener('click', () => {
    document.querySelector('.empty-search').style.display = 'none'
    document.querySelector('.featured-drink').style.display = 'none'
    document.querySelector('.drink-carousel').style.display = "flex"
    getDrinks()
})

addEventListener("load", () => {
    featuredDrink()
});

function featuredDrink(){
    const featured = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
    const parentEl = document.querySelector('.featured-content')
    let fragment = new DocumentFragment();
    fetch(featured)
        .then(response => response.json())
        .then(data => {
            let featDrink = data.drinks[0]
            const drinkCard = document.createElement('div')
            drinkCard.className = "featured-item"
            const contentSection = document.createElement('div')
            contentSection.className = "featured-text-content"
            const title = document.createElement('h2')
            title.textContent = featDrink.strDrink.toUpperCase()
            console.log(title.textContent)
            title.className = "carousel-item-title"
            const ingredientHeading = document.createElement('h3')
            ingredientHeading.textContent = "Ingredients"
            ingredientHeading.className = "carousel-item-subheading"
            const ingredientList = document.createElement('ul')
            ingredientList.className = "carousel-item-list"
            const ingredientsArr = []
            const measureArr = []
            for (const property in featDrink){
                if (property.includes("Ingredient")  && featDrink[property] !== null){
                    ingredientsArr.push(featDrink[property])
                }
                if (property.includes("Measure")  && featDrink[property] !== null){
                    measureArr.push(featDrink[property])
                }
            }

            ingredientsArr.forEach((ingredient,index) => {
                let li = document.createElement('li')
                let measure = measureArr[index] ? measureArr[index] : " "
                li.textContent = measure  + " " + ingredient 
                li.className = "carousel-item-ingredient"
                ingredientList.append(li)
            })
        
            const instructions = document.createElement('p')
            instructions.textContent = featDrink.strInstructions
            instructions.className = "carousel-item-instruct"

            const imgSection = document.createElement('div')
            imgSection.className = "carousel-img-section"
            const img = document.createElement('img')
            img.src = featDrink.strDrinkThumb
            img.className = "carousel-item-img"

            contentSection.appendChild(title)
            contentSection.appendChild(ingredientHeading)
            contentSection.appendChild(ingredientList)
            contentSection.appendChild(instructions)
            imgSection.appendChild(img)

            drinkCard.appendChild(imgSection)
            drinkCard.appendChild(contentSection)
            
            fragment.appendChild(drinkCard)
            parentEl.appendChild(fragment)
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function getDrinks(){
    
    let drink = document.getElementById('cocktail-input').value
    const cocktails = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
    const parentEl = document.querySelector('.carousel-content')
    parentEl.replaceChildren()
    const btnWrapper = document.querySelector('.carousel-button-wrapper')
    btnWrapper.replaceChildren()
    let fragment = new DocumentFragment();
    
    fetch(cocktails)
        .then(response => response.json())
        .then(data => {
            let drinks = data.drinks

            if (drinks){
                drinks.forEach(item => {
                    const drinkCard = document.createElement('div')
                    drinkCard.className = "carousel-item"
                    const contentSection = document.createElement('div')
                    contentSection.className = "carousel-text-content"
                    const title = document.createElement('h2')
                    title.textContent = item.strDrink.toUpperCase()
                    title.className = "carousel-item-title"
                    const ingredientHeading = document.createElement('h3')
                    ingredientHeading.textContent = "Ingredients"
                    ingredientHeading.className = "carousel-item-subheading"
                    const ingredientList = document.createElement('ul')
                    ingredientList.className = "carousel-item-list"
                    const ingredientsArr = []
                    const measureArr = []
                    for (const property in item){
                        if (property.includes("Ingredient")  && item[property] !== null){
                            ingredientsArr.push(item[property])
                        }
                        if (property.includes("Measure")  && item[property] !== null){
                            measureArr.push(item[property])
                        }
                    }
        
                    ingredientsArr.forEach((ingredient,index) => {
                            let li = document.createElement('li')
                            let measure = measureArr[index] ? measureArr[index] : " "
                            li.textContent = measure  + " " + ingredient 
                            li.className = "carousel-item-ingredient"
                            ingredientList.append(li)
                    })
                
                    const instructions = document.createElement('p')
                    instructions.textContent = item.strInstructions
                    instructions.className = "carousel-item-instruct"

                    const imgSection = document.createElement('div')
                    imgSection.className = "carousel-img-section"
                    const img = document.createElement('img')
                    img.src = item.strDrinkThumb
                    img.className = "carousel-item-img"

                    contentSection.appendChild(title)
                    contentSection.appendChild(ingredientHeading)
                    contentSection.appendChild(ingredientList)
                    contentSection.appendChild(instructions)
                    imgSection.appendChild(img)

                    drinkCard.appendChild(imgSection)
                    drinkCard.appendChild(contentSection)
                    
                    fragment.appendChild(drinkCard)
                })
            
                parentEl.appendChild(fragment)
                const cards = document.querySelectorAll('.carousel-item')
        
                if (cards.length > 1){
                
                    btnWrapper.replaceChildren()
            
                    const leftBtn = document.createElement('button')
                    leftBtn.innerHTML = `<span class="material-symbols-outlined">
                    arrow_back_ios</span>`
                    leftBtn.className = "btn prev-arrow"

                    const pauseBtn = document.createElement('button')
                    pauseBtn.innerHTML = `<span class="material-symbols-outlined">
                    play_pause</span>`
                    pauseBtn.className = "btn pause"
                    const rightBtn = document.createElement('button')
                    rightBtn.innerHTML = `<span class="material-symbols-outlined">
                    arrow_forward_ios</span>`
                    rightBtn.className = "btn next-arrow"
                    
                    btnWrapper.appendChild(leftBtn)
                    btnWrapper.appendChild(pauseBtn)
                    btnWrapper.appendChild(rightBtn)
                }
        
               
                cards[0].style.display = "block"
                 
                let timer = setInterval(function(){ 
                    plusSlides(1)
                  }, 4000);

                const pause = document.querySelector('.pause')
                let isOn = true
                pause.addEventListener("click", () => {
                    if(isOn){
                        clearInterval(timer)
                        isOn = false
                    } else {
                        clearInterval(timer)
                        timer = setInterval(function(){plusSlides(slideIndex)}, 4000)
                        isOn = true
                    }
                })

                let slideIndex =1;
                const plusSlides = (n) => {
                    clearInterval(timer)
                    if (n < 0){
                        showSlides(slideIndex -= 1);
                      } else {
                       showSlides(slideIndex += 1); 
                      }
                    
                    if (n === -1){
                    timer = setInterval(function(){plusSlides(n + 2)}, 4000);
                    } else {
                    timer = setInterval(function(){plusSlides(n + 1)}, 4000);
                    }
                }
                
                const showSlides = (n) => {
                    let i;
                    if (n > cards.length){
                        slideIndex = 1
                    }
                    if (n < 1){
                        slideIndex = cards.length
                    }
                    for(i=0; i < cards.length; i++){
                        cards[i].style.display = "none"
                    }
                    cards[slideIndex-1].style.display = "block";
                }

                const nextCard = document.querySelector(".next-arrow");
                nextCard.addEventListener("click", () => plusSlides(1))

                const prevCard = document.querySelector(".prev-arrow");
                prevCard.addEventListener("click", () => plusSlides(-1))

            } else { 
                document.querySelector('.empty-search').style.display = "block"
                document.querySelector('.empty-search').textContent = "Search returned zero results, please try again"
            }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}   