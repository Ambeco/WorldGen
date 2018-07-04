import { castHTMLTableElement, createHTMLElement, castHTMLElement } from "../Util/HtmlCasts.js";
import { Layer } from "../Layers/Layer.js";

export abstract class DetailsAdapter {
    abstract bind(layer: Layer): void;

    bindLayerToByTheNumbers(layer: Layer): void {
        const numbersTable: HTMLTableElement = castHTMLTableElement(document.getElementById("byTheNumbers"));
        numbersTable.innerText = "";
        numbersTable.appendChild(this.createByTheNumbersHeader(layer));
        numbersTable.appendChild(this.createByTheNumbersTextRow("Area", this.getAreaString(layer)));
        numbersTable.appendChild(this.createByTheNumbersTextRow("Population", layer.population.toLocaleString()));
        numbersTable.appendChild(this.createByTheNumbersListRow("Races", this.createPopulationList(layer)));
    }

    getAreaString(layer: Layer): string {
        const areaMiles = (layer.location.max - layer.location.min);
        const areaFeet = areaMiles / 3.58701e-8;
        if (areaMiles > 1000) {
            return Math.round(areaMiles).toLocaleString() + " sq mi";
        } else if (areaMiles > 1) {
            return areaMiles.toFixed() + " sq mi";
        } else if (areaFeet > 1000) {
            return Math.round(areaFeet).toLocaleString() + " sq ft";
        } else {
            return areaFeet.toFixed() + " sq ft";
        }
    }



    protected createPopulationList(layer: Layer): string[] {
        const result: string[] = [];
        for (let item of layer.raceCounts.entries()) {
            result.push(item[1].toLocaleString() + " " + item[0].name);
        }
        return result;
    }

    protected createByTheNumbersHeader(layer: Layer): HTMLElement {
        const row = document.createElement("tr");
        const data = document.createElement("td");
        data.colSpan = 2;
        data.appendChild(createHTMLElement("h4", [], layer.name));
        row.appendChild(data);
        return row;
    }

    protected createByTheNumbersTextRow(label: string, value: string): HTMLElement {
        const row = document.createElement("tr");
        row.appendChild(createHTMLElement("td", [], label));
        row.appendChild(createHTMLElement("td", [], value));
        return row;
    }

    protected createByTheNumbersListRow(label: string, list: string[]): HTMLElement {
        const row = document.createElement("tr");
        row.appendChild(createHTMLElement("td", [], label));
        const listData = createHTMLElement("td", []);
        for (let item of list) {
            listData.appendChild(createHTMLElement("span", ["btnListItem"], item));
        }
        row.appendChild(listData);
        return row;
    }

    protected bindSummary(layer: Layer): void {
        const summary: HTMLElement = castHTMLElement(document.getElementById("summary"));
        summary.innerHTML = "<p><b>Azaroth </b> is the third planet from the Sun, and the only astranomical object known to harbor life. According to radiometric dating and other sources of evidence, Azaroth formed over 4.5 billion years ago. Azaroth's gravity interacts with other objects in space, especially the Sun and its moon, Azaroth's only natural satellite. Azaroth revolves around the Sun in 365.26 days, a period known as an Azaroth year. During this time, Azaroth rotates about its axis about 366.26 times.</p>"
            + "<p>Azaroth's axis of rotation is tilted with respect to its orbital plane, producing seasons on Azaroth. The gravitational interaction between Azaroth and its moon causes ocean tides, stabilizes Azaroth's orientation on its axis, and gradually slows its rotation.Azaroth is the densest planet in the Solar System and the largest of the four terrestrial planets.</p>"
            + "<p>Azaroth's lithosphere is divided into several rigid tectonic plates that migrate across the surface over periods of many millions of years. About 71% of Azaroth's surface is covered with water, mostly by oceans.The remaining 29 % is land consisting of continents and islands that together have many lakes, rivers and other sources of water that contribute to the hydrosphere.The majority of Azaroth's polar regions are covered in ice, including the Antarctic ice sheet and the sea ice of the Arctic ice pack. Azaroth's interior remains active with a solid iron inner core, a liquid outer core that generates the Azaroth's magnetic field, and a convecting mantle that drives plate tectonics.</p>"
            + "<p>Within the first billion years of Azaroth's history, life appeared in the oceans and began to affect the Azaroth's atmosphere and surface, leading to the proliferation of aerobic and anaerobic organisms.Some geological evidence indicates that life may have arisen as much as 4.1 billion years ago.Since then, the combination of Azaroth's distance from the Sun, physical properties, and geological history have allowed life to evolve and thrive. In the history of the Azaroth, biodiversity has gone through long periods of expansion, occasionally punctuated by mass extinction events. Over 99% of all species that ever lived on Azaroth are extinct. Estimates of the number of species on Azaroth today vary widely; most species have not been described. Over 7.6 billion humans live on Azaroth and depend on its biosphere and natural resources for their survival. Humans have developed diverse societies and cultures; politically, the world has about 200 sovereign states.</p>"
    }
}