//Import JSON pokemon data
import data from "./pokedex.json" assert { type: "json" };
const output = document.getElementById("output"); //for DOM to append to

//variables
let html = "";
let pokemon = data.pokemon;

//Calculations Global Variables
let 
averageHeight,
averageWeight,
maxAverageSpawns,
minAverageSpawns;


//Function Calculates average of weight & height of Pokemon
function calulateAverage() {
  let weightSum = 0;
  let heightSum = 0;
  let
  weightString,
  weightTrim,
  cleanWeight,
  cleanHeight,
  heightTrim,
  heightString;

  for (let i = 0; i < pokemon.length; i++) {
    //Step 1. ParseINT data

    //Weight
    weightString = pokemon[i].weight.replace("kg", "");
    weightTrim = weightString.trim();
    cleanWeight = parseFloat(weightTrim);

    //height
    heightString = pokemon[i].height.replace("m", "");
    heightTrim = heightString.trim();
    cleanHeight = parseFloat(heightTrim);

    //Step 2. Calculate Sum
    //adds each pokemon weight & height to sum through loop
    weightSum += cleanWeight;
    heightSum += cleanHeight;
  }

  //calculates average
  averageWeight = (weightSum / pokemon.length).toFixed(1); //rounds to 1 decimal
  averageHeight = (heightSum / pokemon.length).toFixed(2); //rounds to 2 decimal

  return averageHeight, averageWeight; //expected output: Height: 1.19 Weight: 46.0
}
//Function calculates the min & max of of average spawns of each pokemon
function calculateMinMax() {
  
  //Step 1. Create Blank Array to Place Parsed Data into
  let array = [];

  //Step 2. Loop Parsed Data Set into Blank Array
  for (let i = 0; i < pokemon.length; i++) {
    let item = parseFloat(pokemon[i].avg_spawns);
    array.push(item);
  }

  //Step 3. Return
  maxAverageSpawns = Math.max(...array);
  minAverageSpawns = Math.min(...array);

  return maxAverageSpawns, minAverageSpawns;
}

calculateMinMax();
calulateAverage();

//-------------------- HTML ----------------------------------------------------------------->
//add HTML to output

//Block For PokeMon Statistics

function addHTML() {

  //Step 1. Add Pokemon Calculations: average height, average wieght, max average spawns, and min average spawns
  //Adds pokemon data to HTML Doc
  html = `<p>
      <strong>Average Pokemon Height:</strong> ${averageHeight} m<br>
      <strong>Average Pokemon Weight:</strong> ${averageWeight} kg<br>
      <strong>Highest Spawn Chance:</strong> ${maxAverageSpawns} %<br>
      <strong>Lowest Spawn Chance:</strong> ${minAverageSpawns}%
    </p>
    <h2>All Pokemon Data</h2>
  `;

  //----Step 2. Main loop adds Pokemon's infomation from dataset--->

  //Expect Output: Bulbasaur (001)
  for (let i = 0; i < pokemon.length; i++) {
    html += `<h3>${pokemon[i].name} (${pokemon[i].num})</h3> 
    `
  //----Step 3. adds pictures --->
    html += `
      <img src="${pokemon[i].img}" alt="picture of ${pokemon[i].name}" width="auto" height="auto">
      `;

  //---Step 4. New Loop creates Div boxes for each Pokemon Type-->
    for (let j = 0; j < data.pokemon[i].type.length; j++) {
          html += `<div class="typebox"> ${pokemon[i].type[j]}</div>`;
    }

  //--Step 4.5 Add height + weight to HTML ---->
    html += `
      <li><strong>Height:</strong> ${pokemon[i].height}
      <li><strong>Weight:</strong> ${pokemon[i].weight}
    `;

  //----Step 5. Adds Pokemon Candy Count Data--->

    //If no Candy Number print just candy name ('Bulbasaur Candy' OR 'None')
    if (pokemon[i].candy_count == null) {
      html += `
        <li><strong>Candy Type:</strong> ${pokemon[i].candy} 
      `; 
    } 

    // Else: Print ('Bulbasaur (25)')
    else {
      html += `
        <li><strong>Candy Type:</strong> ${pokemon[i].candy} (${pokemon[i].candy_count})
      `; 
    }

  //----Step 6: Check Multiplers--->

    //If multipers have 'Null' output 'None'
    if (pokemon[i].multipliers == null) {
      html += `
        <li><strong>Multipliers:</strong> None 
      `; 
    }
    else { //Outputs string & and add spaces between items

        let multi= data.pokemon[i].multipliers;
        let multiString = multi.toString();
        let multiplier = multiString.replace(/,/g, " , ");

        //add to HTML
        html += `
          <li><strong>Multipliers:</strong> ${multiplier} 
        `; 
    }

  //-----Step 7: Check Weakness------>

    //Convert Array to String & replace commas + add spaces
    let weakData= data.pokemon[i].weaknesses;
    let weakString = weakData.toString();
    let weaknesses = weakString.replace(/,/g, " ??? ");

  //-----Step 8: Find Evolutions ------->

  // Set to 'none' then we check to see if the dataset has data in the arrays
  //If (have data) print out correct evolution
  
    let prev_evolution = "none";
    let next_evolution = "none";
    let prev_evolution_num = "";
    let next_evolution_num = "";

    //If you have data in this JSON dataset change variables
    if (pokemon[i].prev_evolution){

      prev_evolution = pokemon[i].prev_evolution[0].name;
      prev_evolution_num = pokemon[i].prev_evolution[0].num;

      //If you have data at the [1] place- replace previous variables
      if (pokemon[i].prev_evolution[1]){

        prev_evolution = pokemon[i].prev_evolution[1].name;
        prev_evolution_num = pokemon[i].prev_evolution[1].num;
      }
    }

    //Does Previous Statement above but with 'next evolution' dataset
    if (pokemon[i].next_evolution){

      next_evolution = pokemon[i].next_evolution[0].name;
      next_evolution_num = pokemon[i].next_evolution[0].num;

    }

  //------Step 9. Add Rest of JSON data ------>
    //Adds Rest of JSON Data
    html += `
      <li><strong>Egg Hatch Distance:</strong> ${pokemon[i].egg}
      <li><strong>Spawn Chance:</strong> ${pokemon[i].spawn_chance}%
      <li><strong>Average Spawns:</strong> ${pokemon[i].avg_spawns}
      <li><strong>Weaknesses:</strong> ${weaknesses}
      <li><strong>Previous Evolution:</strong> ${prev_evolution} ${prev_evolution_num}
      <li><strong>Next Evolution:</strong> ${next_evolution} ${next_evolution_num}
      </p>
    `;
  }
}

addHTML();
output.innerHTML = html;
