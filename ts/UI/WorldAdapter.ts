import { World } from "../Layers/A_world/World.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { ContinentStub } from "../Layers/A_world/ContinentStub.js";
import { BasePerson } from "../Universal/Person/BasePerson.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";

export function bindWorldToTree(world: World, ): void {
    const name: HTMLElement = castHTMLElement(document.getElementById("worldTitle"));
    name.innerText = "World: " + world.name;
    const layerUI: HTMLUListElement = castHTMLUListElement(document.getElementById("treeRoot"));
    bindLayerToTree(world, layerUI, "continent");
}

export function bindLayerToTree(world: World, parentList: HTMLUListElement, type: string): void {
    parentList.innerText = "";
    for (let continent of world.continents) {
        const layerItem = createHTMLElement("li", [type + "Layer"]);
        layerItem.appendChild(createHTMLElement("span", ["toggle", "toggle-collapsed"]));
        layerItem.appendChild(createHTMLElement("span", ["layerName"], " " + toTitleCase(type) + ": " + continent.name));
        layerItem.appendChild(createHTMLElement("ul", ["tree"]));
        parentList.appendChild(layerItem);
    }
}

export function bindWorldToDetails(world: World): void {
    const worldName: HTMLElement = castHTMLElement(document.getElementById("title"));
    worldName.innerText = "World: " + world.name;
    bindWorldToByTheNumbers(world);
    bindWorldSummary(world);
}

function bindWorldToByTheNumbers(world: World): void {
    const numbersTable: HTMLTableElement = castHTMLTableElement(document.getElementById("byTheNumbers"));
    numbersTable.innerText = "";
    numbersTable.appendChild(createByTheNumbersHeader(world));
    const areaValue = (world.location.max - world.location.min) + " sq mi";
    numbersTable.appendChild(createByTheNumbersTextRow("Area", areaValue));
    numbersTable.appendChild(createByTheNumbersTextRow("Population", world.population.toString()));
    numbersTable.appendChild(createByTheNumbersListRow("Races", createPopulationList(world)));
}

function bindWorldSummary(world: World): void {
    const summary: HTMLElement = castHTMLElement(document.getElementById("summary"));
    summary.innerHTML = "<p><b>Azaroth </b> is the third planet from the Sun, and the only astranomical object known to harbor life. According to radiometric dating and other sources of evidence, Azaroth formed over 4.5 billion years ago. Azaroth's gravity interacts with other objects in space, especially the Sun and its moon, Azaroth's only natural satellite. Azaroth revolves around the Sun in 365.26 days, a period known as an Azaroth year. During this time, Azaroth rotates about its axis about 366.26 times.</p>"
        + "<p>Azaroth's axis of rotation is tilted with respect to its orbital plane, producing seasons on Azaroth. The gravitational interaction between Azaroth and its moon causes ocean tides, stabilizes Azaroth's orientation on its axis, and gradually slows its rotation.Azaroth is the densest planet in the Solar System and the largest of the four terrestrial planets.</p>"
        + "<p>Azaroth's lithosphere is divided into several rigid tectonic plates that migrate across the surface over periods of many millions of years. About 71% of Azaroth's surface is covered with water, mostly by oceans.The remaining 29 % is land consisting of continents and islands that together have many lakes, rivers and other sources of water that contribute to the hydrosphere.The majority of Azaroth's polar regions are covered in ice, including the Antarctic ice sheet and the sea ice of the Arctic ice pack. Azaroth's interior remains active with a solid iron inner core, a liquid outer core that generates the Azaroth's magnetic field, and a convecting mantle that drives plate tectonics.</p>"
        + "<p>Within the first billion years of Azaroth's history, life appeared in the oceans and began to affect the Azaroth's atmosphere and surface, leading to the proliferation of aerobic and anaerobic organisms.Some geological evidence indicates that life may have arisen as much as 4.1 billion years ago.Since then, the combination of Azaroth's distance from the Sun, physical properties, and geological history have allowed life to evolve and thrive. In the history of the Azaroth, biodiversity has gone through long periods of expansion, occasionally punctuated by mass extinction events. Over 99% of all species that ever lived on Azaroth are extinct. Estimates of the number of species on Azaroth today vary widely; most species have not been described. Over 7.6 billion humans live on Azaroth and depend on its biosphere and natural resources for their survival. Humans have developed diverse societies and cultures; politically, the world has about 200 sovereign states.</p>"
}

function createPopulationList(world: World): string[] {
    const result: string[] = [];
    for (let item of world.raceCounts.entries()) {
        result.push(item[1] + " " + item[0].name);
    }
    return result;
}

function createHTMLElement(tag: string, classList: string[] = [], content: string|null=null): HTMLElement {
    const item = document.createElement(tag);
    for (let clazz of classList) {
        item.classList.add(clazz);
    }
    if (content != null) {
        item.innerText = content;
    }
    return item;
}

function createByTheNumbersHeader(world: World): HTMLElement {
    const row = document.createElement("tr");
    const data = document.createElement("td");
    data.colSpan = 2;
    data.appendChild(createHTMLElement("h4", [], world.name));
    row.appendChild(data);
    return row;
}

function createByTheNumbersTextRow(label: string, value: string): HTMLElement {
    const row = document.createElement("tr");
    row.appendChild(createHTMLElement("td", [], label));
    row.appendChild(createHTMLElement("td", [], value));
    return row;
}

function createByTheNumbersListRow(label: string, list: string[]): HTMLElement {
    const row = document.createElement("tr");
    row.appendChild(createHTMLElement("td", [], label));
    const listData = createHTMLElement("td", []);
    for (let item of list) {
        listData.appendChild(createHTMLElement("span", ["btnListItem"], item));
    }
    row.appendChild(listData);
    return row;
}
