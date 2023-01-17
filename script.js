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
  heightString;

let weightSum = 0;
let heightSum = 0;
let item = 0;

//fix pokemon 

function calulateAverage(pokemon) {
  for (let i = 0; i < pokemon_array_length; i++) {
    //ParseINT data

    //Weight
    weightString = pokemon[i].weight.replace("kg", "");
    weightTrim = weightString.trim();
    cleanWeight = parseFloat(weightTrim);

    //height
    heightString = pokemon[i].height.replace("m", "");
    heightTrim = heightString.trim();
    cleanHeight = parseFloat(heightTrim);

    //adds each pokemon weight & height to sum through loop
    weightSum += cleanWeight;
    heightSum += cleanHeight;
  }

  //calculates average
  averageWeight = (weightSum / pokemon_array_length).toFixed(1); //rounds to 1 decimal
  averageHeight = (heightSum / pokemon_array_length).toFixed(2); //rounds to 2 decimal

  return averageHeight, averageWeight; //expected output: Height: 1.19 Weight: 46.0
}

function calculateMinMax(pokemon) {

  let array = [];
  for (let i = 0; i < pokemon.length ; i++) {
    let item = parseFloat(pokemon[i].avg_spawns);
    array.push(item);
  }
  console.log("H???????????????????????????????????????????????????????????????????????????????????????????????");
  console.log(Math.max(...array));
}

calculateMinMax(pokemon);
//calulateAverage(pokemon);

//-------------------------------------------------------------------------------------->
html = `<p>Most Common Pokemon Type:<br>
      Average Pokemon Height: ${averageHeight} m<br>
      Average Pokemon Weight: ${averageWeight} kg<br>
      Highest Spawn Chance:<br>
      Lowest Spawn Chance:
    </p>
  `;
//grass, fire
for (let i = 0; i < pokemon.length; i++) {
  html += `<h3>${pokemon[i].name} (${pokemon[i].num})</h3>`;

  //Let LOL
  for (let j = 0; j < data.pokemon[i].type.length; j++) {
   html += `<div class="typebox"> ${pokemon[i].type[j]}</div>`;
  }

  html +=`
  <img src="${pokemon[i].img}" alt="picture of ${pokemon[i].name}" width="auto" height="auto">
   <li><strong>Height:</strong> ${pokemon[i].height}
   <li><strong>Weight:</strong> ${pokemon[i].weight}
   `;

  if (pokemon[i].candy_count == null) {
    html += `<li><strong>Candy Type:</strong> ${pokemon[i].candy} `;
  } else {
    html += `<li><strong>Candy Type:</strong> ${pokemon[i].candy} (${pokemon[i].candy_count})`;
  }

  html += `<li><strong>Egg Hatch Distance:</strong> ${pokemon[i].egg}
      <li><strong>Spawn Chance:</strong> ${pokemon[i].spawn_chance}
      <li><strong>Average Spawns:</strong> ${pokemon[i].avg_spawns}
      </p>
    `;
}

output.innerHTML = html;
