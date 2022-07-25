const pokedex = document.getElementById('pokedex');
console.log(pokedex);

const fetchPokemon = () => {

    const promisses = [];
    for(let i = 1; i<= 287; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promisses.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promisses).then(results => {
        const pokemonData = results.map((data) => ({
            name: data.name,
            id: data.id,
            sprite: data.sprites.other.home['front_default'], //Por existirem vários sprites, é necessário fazer essa "especificação"
            type: data.types.map( type => type.type.name), //Os tipos são arrays
        }));
        displayPokemon(pokemonData);

    })
 
    const displayPokemon = (pokemonData) =>{
        console.log(pokemonData);
        const pokemonHTMLString = pokemonData.map(indPokemon => `
        <li class = "card">
            <img class = "card-image" src = "${indPokemon.sprite}"/>
            <h2 class = "card-title" >${indPokemon.name}</h2>
            <p class = "card-subtitle" >Type: ${indPokemon.type}</p>
        </li>
        `).join("") // ind = individual
        pokedex.innerHTML = pokemonHTMLString;
    }

}

fetchPokemon();