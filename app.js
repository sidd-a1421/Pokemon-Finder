async function fetchData() {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const imageElement = document.getElementById("pokemonSprite");
    const errorMessage = document.getElementById("errorMessage");
    const allDetails = document.querySelector(".details");
    allDetails.innerHTML = '';
    errorMessage.style.color = "blue";
    errorMessage.textContent = "Checking...";
    errorMessage.style.display = "block";
    imageElement.style.display = "none";

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data.name.toUpperCase());
        console.log(data.types[0].type.name.toUpperCase());
        const hpStat = data.stats.find(stat => stat.stat.name === "hp");
        const attackStat = data.stats.find(stat => stat.stat.name === "attack");
        const defenseStat = data.stats.find(stat => stat.stat.name === "defense");
        const pokemonSprite = data.sprites.front_default;
        imageElement.onload = () => {
            allDetails.style.display = "block";
            allDetails.innerHTML = `
                <ul>
                    <li>Name: ${data.name.toUpperCase()}</li>
                    <li>Type: ${data.types[0].type.name.toUpperCase()}</li>
                    <li>HP: ${hpStat.base_stat}</li>
                    <li>Attack: ${attackStat.base_stat}</li>
                    <li>Defense: ${defenseStat.base_stat}</li>
                </ul>
            `;
            errorMessage.style.display = "none";
        };
        imageElement.src = pokemonSprite;
        imageElement.style.display = "inline-block";
    } catch (error) {
        console.error(error);
        allDetails.style.display = "none";
        errorMessage.style.color = "red";
        errorMessage.textContent = "Wrong Pokémon Name";
        errorMessage.style.display = "block";
    }
}



document.querySelector(".js-btn").addEventListener("click", fetchData);
document.getElementById("pokemonName").addEventListener("keydown", event => {
    if (event.key === "Enter")
        fetchData();
});