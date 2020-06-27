// This line below tells the JS that display is the ordered list with id pokemon
const display = document.getElementById("pokedex");

/*
    The function fetchPokemon() creates an array of promises. Then the for loop
    pushes onto the array the data of the pokemon whose national dex number corresponds
    with the value i by recieving this information from pokeapi which is where all the 
    information for all the pokemon in this dex comes from. 
    
    After pushing all the information for all the unova pokemon onto the array we then create
    a "object" called pokemon that recieves a pokemon's name, id, image, abilities, and type from
    each respective url (NOTE: abilities and type are both arrays because a pokemon can have multiple
    abilities and types).
    
    The function then calls the other function displayPokemon().
*/

const fetchPokemon = () => {

    const promises = [];
    
    /*  Note that the number of pokemon displayed can be changed by changing the limits on i. 
        Meaning this dex can be made to display all pokemon up to gen 7 inclusive by initializing
        i = 1 and setting the condition i <= 807 (The data of Galar region pokemon is not yet 
        available on pokeapi).
    */

    for(let i = 494; i <= 649; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            abilities: data.abilities.map((ability) => ability.ability.name).join(', '),
            type: data.types.map((type) => type.type.name).join(', ')
        }));
        displayPokemon(pokemon);
    });
    
};

/*
    This function displayPokemon() creates the data for any given pokedex entry by 
    taking the values stores in the provided pokemon objects and using them as components
    of the <img> <h2> and <p> tags. Essentially pokemon.map takes a given pokemon object
    and assigns it the "pointer" pokedexEntry and then uses that "pointer" to extract
    the required data from each pokemon object and make said data a component of the HTML
    elements.

    Also the images are clickable so if a user clicks an image of a pokemon the site will open
    the bulbapedia page of that pokemon in a new tab
*/

const displayPokemon = (pokemon) => {

    const pokemonHTMLString = pokemon.map (pokedexEntry => 
    `<li class="entry">
        <a href="https://bulbapedia.bulbagarden.net/wiki/${pokedexEntry.name}_(Pok%C3%A9mon)" target="_blank"> <img class="entryIMG" src="${pokedexEntry.image}"/></a>
        <h2 class="entryTitle">${pokedexEntry.id}. ${pokedexEntry.name}</h2>
        <p class="entryType">Type: ${pokedexEntry.type}</p>
        <p class="entryAbility">Abilities: ${pokedexEntry.abilities}</p>
    </li>`).join("");

    display.innerHTML = pokemonHTMLString;

};

fetchPokemon();