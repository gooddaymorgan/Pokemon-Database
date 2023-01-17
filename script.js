//Import JSON pokemon deck
import data from "./pokedex.json" assert { type: "json" };
const output = document.getElementById("output"); //for DOM to append to

//variables
let html = "";
let pokemon_array_length = data.pokemon.length; //Wschools says this is faster
let pokemon = data.pokemon;
let averageHeight,
  averageWeight,
  weightString,
  weightTrim,
  cleanWeight,
  cleanHeight,
  heightTrim,
  heightString,
  maxAverageSpawns,
  minAverageSpawns;

function calulateAverage(dataSet) {
  let weightSum = 0;
  let heightSum = 0;

  for (let i = 0; i < dataSet.length; i++) {
    //Step 1. ParseINT data

    //Weight
    weightString = dataSet[i].weight.replace("kg", "");
    weightTrim = weightString.trim();
    cleanWeight = parseFloat(weightTrim);

    //height
    heightString = dataSet[i].height.replace("m", "");
    heightTrim = heightString.trim();
    cleanHeight = parseFloat(heightTrim);

    //Step 2. Calculate Sum
    //adds each pokemon weight & height to sum through loop
    weightSum += cleanWeight;
    heightSum += cleanHeight;
  }

  //calculates average
  averageWeight = (weightSum / pokemon_array_length).toFixed(1); //rounds to 1 decimal
  averageHeight = (heightSum / pokemon_array_length).toFixed(2); //rounds to 2 decimal

  return averageHeight, averageWeight; //expected output: Height: 1.19 Weight: 46.0
}

function calculateMinMax(dataSet) {
  //Step 1. Create Blank Array to Place Parsed Data into
  let array = [];

  //Step 2. Loop Parsed Data Set into Blank Array
  for (let i = 0; i < dataSet.length; i++) {
    let item = parseFloat(dataSet[i].avg_spawns);
    array.push(item);
  }
  //Step 3. Return

  maxAverageSpawns = Math.max(...array);
  minAverageSpawns = Math.min(...array);

  return maxAverageSpawns, minAverageSpawns;
}

calculateMinMax(pokemon);
calulateAverage(pokemon);

//-------------------- HTML ----------------------------------------------------------------->
//add HTML to output

//Block For PokeMon Statistics

function functionFun(a) {
html = `<p>
      <strong>Average Pokemon Height:</strong> ${averageHeight} m<br>
      <strong>Average Pokemon Weight:</strong> ${averageWeight} kg<br>
      <strong>Highest Spawn Chance:</strong> ${maxAverageSpawns}<br>
      <strong>Lowest Spawn Chance:</strong> ${minAverageSpawns}
    </p>
  `;

//Adds pokemon data to HTML Doc
//Loop adds Pokemon's Name + Number
//Expect Output: Bulbasaur (001)
for (let i = 0; i < pokemon.length; i++) {
  html += `
  <h2>Pokemon Data</h2>
  <h3>${pokemon[i].name} (${pokemon[i].num})</h3> 
  `; 

  //Creates Div boxes for each Pokemon Type
  for (let j = 0; j < data.pokemon[i].type.length; j++) {
    html += `<div class="typebox"> ${pokemon[i].type[j]}</div>`;
  }

  //adds pictures + height + weight
  html += `
  <img src="${pokemon[i].img}" alt="picture of ${pokemon[i].name}" width="auto" height="auto">
   <li><strong>Height:</strong> ${pokemon[i].height}
   <li><strong>Weight:</strong> ${pokemon[i].weight}
   `;

  //Adds Pokemon Candy Count Data
  if (pokemon[i].candy_count == null) { //IF NO CANDY Number print just candy name
    html += `
    <li><strong>Candy Type:</strong> ${pokemon[i].candy} 
    `; //expect output: Candy Name or 'None'
  } else {
    html += `
    <li><strong>Candy Type:</strong> ${pokemon[i].candy} (${pokemon[i].candy_count})
    `;  // expected output: Candy Name (#)
  }

  //Adds Rest of JSON Data
  html += `
      <li><strong>Egg Hatch Distance:</strong> ${pokemon[i].egg}
      <li><strong>Spawn Chance:</strong> ${pokemon[i].spawn_chance}
      <li><strong>Average Spawns:</strong> ${pokemon[i].avg_spawns}
      <li><strong>Multiplers:</strong> ${pokemon[i].multipliers}
      <li><strong>Weaknesses:</strong> ${pokemon[i].weaknesses}
      <li><strong>Previous Evolution:</strong> ${pokemon[i].prev_evolution}
      <li><strong>Next Evolution:</strong> ${pokemon[i].next_evolution}
      </p>
    `;
}
}

function pokemonEvolutions(dataSet) {

  for (let i = 0; i < dataSet.length; i++) {

    console.log(dataSet[i].next_evolution[i].name);
  }console.log(dataSet[i].next_evolution[i].name);
}console.log(dataSet[i].next_evolution[i].name);
}ZZ
}

pokemonEvolutions(pokemon);
output.innerHTML = html;
