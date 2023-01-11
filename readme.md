# Find Your Cocktail

This is a fun vanilla JavaScript project utilizing TheCocktailDB API. It provides the user with a random cocktail recipe on initial page load. The user can also search for cocktail recipes by the name/partial name of a drink (e.g., search term "mary" might return Blood Mary or a Mary Pickford). If the search returns more the one recipe matching the search term, it will return a card carousel of the matching recipes, showing 1 card at a time. The carousel advances automatically, but it also includes a pause/play button as well as manual arrow controls. If the search result only returns 1 recipe, a single card is displayed without the carousel controls. If the search does not return any recipes, a message appears that zero results were found and asks the user to try again. A new search clears the carousel a returns new results.

Link to project:

## How It's Made
Tech used: HTML, CSS, JavaScript, APIs

### Cocktail Carousel
If the API returns an array of objects(recipes), we use the forEach method to iterate through each recipe object to create the elements that comprise each recipe card. One of the trickier parts here is to create the list of ingredients and their measurements from the recipe object since this data is stored in individual object properties. Here, we iterate through the object properties using for/in loop to find the properties that include "Ingredient" and "Measurements" and push those values to new arrays. then we iterate through the new ingredient array using the forEach method to add list elements (li) containing each ingredient and corresponding measurement to an ingredient list (ul). There is probably a better way to do this, but it works for now. 

The control buttons for the carousel are added if the search results include more than 1 recipe object. The carousel cards are shown or hidden by changing the display property to "none" to "block", based on the current index of the card. setInterval() method is used advance the cards automatically; eventListeners on the buttons are used to clear and reset the interval.

## Optimizations
Used the documentFragment constructor to compose DOM nodes before updating them to the active DOM tree to get better performance. 

ToDo: I will be refactoring some of the js and css that is repetitive.

## Lessons Learned
I played around with the CocktailDB API back at the beginning of my coding journey, and  decided to revisit this project to show myself the progress that I've made. Looking back at my original code was kind of 🥴, but this time around it felt good to be able to manipulate the API object data with relative ease. As a baby coder, I was totally confused by how to make a list of the ingredients and measurements from the object properties. Now as a junior coder who's been spending lots of time practicing array methods, I was able to figure it out in minutes. I also spent time learning about and using the documentFragment constructor to improve performance. I used the documentFragment to create the elements of each card for the carousel of recipes. This was also my first time using the replaceChildren() method - I used this method to remove the existing recipes from the DOM and return new recipes for every new search. I also spent a bit of time working with setInterval()/clearInterval() to make the carousel advance automatically as well as use buttons to control the carousel (back, forward and pause/play).

## Future Upgrades
I'd like to add more search filter options (e.g., to search by ingredient or category). It would also be fun to turn this into more of a cocktail journal, where the user can create a profile, save their favorite recipes, make notes or add new recipes. Future React project!


