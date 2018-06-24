import { World } from "../Layers/A_world/World.js";
import { castHTMLSpanElement, castHTMLDivElement } from "../Util/HtmlCasts.js";
import { World_Continent } from "../Layers/A_world/World_Continent.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";

export function bindWorld(world: World) {
    const worldName: HTMLSpanElement = castHTMLSpanElement(document.getElementById("worldName"));
    worldName.innerHTML = world.name;
    const worldSizeBlock: HTMLSpanElement = castHTMLSpanElement(document.getElementById("worldSizeBlock"));
    const sizeMSM = Math.round(world.location.max / 1000000);
    worldSizeBlock.innerHTML = "Size:" + sizeMSM + " million sq.mi.";
    const worldPopulationBlock: HTMLSpanElement = castHTMLSpanElement(document.getElementById("worldPopulationBlock"));
    worldPopulationBlock.innerHTML = "Population:" + world.population + ".";
    const worldPop: HTMLDivElement = castHTMLDivElement(document.getElementById("worldPop"));
    worldPop.innerText = "";
    for (let racePopulation of world.raceCounts.entries()) {
        const racePopSpan: HTMLSpanElement = document.createElement("span");
        racePopSpan.innerText = racePopulation[0].name + ":" + racePopulation[1] + ".";
        worldPop.appendChild(racePopSpan);
        worldPop.appendChild(document.createTextNode(" "));
    }
    const worldContinents: HTMLDivElement = castHTMLDivElement(document.getElementById("worldContinents"));
    worldContinents.innerText = "";
    for (let continent of world.continents) {
        worldContinents.appendChild(bindContinent(continent));
    }
    const worldHeroes: HTMLDivElement = castHTMLDivElement(document.getElementById("worldHeroes"));
    worldHeroes.innerText = "";
    for (let hero of world.people) {
        worldHeroes.appendChild(bindHero(world, hero));
    }
}

function bindContinent(continent: World_Continent): HTMLDivElement {
    const continentDiv: HTMLDivElement = document.createElement("div");
    continentDiv.classList.add("childBlock");
    continentDiv.classList.add("worldContinentBlock");
    const nameDiv: HTMLHeadingElement = document.createElement("h3");
    continentDiv.appendChild(nameDiv);
    nameDiv.innerText = "Continent: " + continent.name;
    continentDiv.appendChild(document.createTextNode(" "));
    const sizeSpan: HTMLSpanElement = document.createElement("span");
    continentDiv.appendChild(sizeSpan);
    const sizeMSM = Math.round((continent.location.max - continent.location.min) / 100000) / 10;
    sizeSpan.innerText = "Size:" + sizeMSM + " million sq.mi.";
    continentDiv.appendChild(document.createTextNode(" "));
    const populationSpan: HTMLSpanElement = document.createElement("span");
    continentDiv.appendChild(populationSpan);
    populationSpan.innerText = "Population:" + continent.population + ".";
    continentDiv.appendChild(document.createTextNode(" "));
    const populationBreakdown: HTMLDivElement = document.createElement("div");
    continentDiv.appendChild(populationBreakdown);
    for (let racePopulation of continent.raceCounts.entries()) {
        const racePopSpan: HTMLSpanElement = document.createElement("span");
        racePopSpan.innerText = racePopulation[0].name + ":" + racePopulation[1] + ". ";
        populationBreakdown.appendChild(racePopSpan);
    }
    return continentDiv;
}

function bindHero(world: World, hero: BasePerson): HTMLDivElement {
    const heroDiv: HTMLDivElement = document.createElement("div");
    heroDiv.classList.add("heroBlock");
    const nameDiv: HTMLHeadingElement = document.createElement("h4");
    heroDiv.appendChild(nameDiv);
    nameDiv.innerText = "Hero: " + hero.firstName + " " + hero.familyName;

    const metadataDiv: HTMLDivElement = document.createElement("div");
    heroDiv.appendChild(metadataDiv);
    metadataDiv.classList.add("heroMetadata");
    const raceSpan: HTMLSpanElement = document.createElement("span");
    metadataDiv.appendChild(raceSpan);
    raceSpan.classList.add("heroRace");
    raceSpan.innerText = hero.race.name;
    metadataDiv.appendChild(document.createTextNode(" "));
    const jobSpan: HTMLSpanElement = document.createElement("span");
    metadataDiv.appendChild(jobSpan);
    jobSpan.classList.add("heroJob");
    jobSpan.innerText = hero.jobName;
    metadataDiv.appendChild(document.createTextNode(" "));
    const locationSpan: HTMLSpanElement = document.createElement("span");
    metadataDiv.appendChild(locationSpan);
    locationSpan.classList.add("heroLocation");
    locationSpan.innerText = "from " + world.continentByLocation(hero.location).name;

    const descriptionSpan: HTMLSpanElement = document.createElement("span");
    heroDiv.appendChild(descriptionSpan);
    descriptionSpan.classList.add("heroDescription");
    descriptionSpan.innerText = hero.getDescription();
    heroDiv.appendChild(document.createTextNode(" "));
    const personalitySpan: HTMLSpanElement = document.createElement("span");
    heroDiv.appendChild(personalitySpan);
    personalitySpan.classList.add("heroPersonality");
    personalitySpan.innerText = hero.getPersonality();

    return heroDiv;
}
