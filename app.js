const fetchPokemon = () => {

    const promisses = [];
    for(let i = 1; i<= 905; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promisses.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promisses).then(results => {
        const pokemonData = results.map((data) => ({
            name: data.name,
            id: data.id,
            sprite: data.sprites['front_default'], //Por existirem vários sprites, é necessário fazer essa "especificação"
            type: data.types.map( type => type.type.name), //Os tipos são arrays
        }));
        console.log(pokemonData);    

    })
 
}

fetchPokemon();