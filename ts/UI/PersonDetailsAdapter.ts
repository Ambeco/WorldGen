import { castHTMLTableElement, createHTMLElement, castHTMLElement } from "../Util/HtmlCasts.js";
import { PersonStub, AgeCategory } from "../Universal/Person/PersonStub.js";

export class PersonDetailsAdapter {

    bind(person: PersonStub): void {
        const nName: HTMLElement = castHTMLElement(document.getElementById("title"));
        nName.innerText = "Person: " + person.firstName + " " + person.familyName;
        this.bindPersonByTheNumbers(person);
        this.bindSummary(person);
    }

    bindPersonByTheNumbers(person: PersonStub): void {
        const numbersTable: HTMLTableElement = castHTMLTableElement(document.getElementById("byTheNumbers"));
        numbersTable.innerText = "";
        numbersTable.appendChild(this.createByTheNumbersHeader(person));
        numbersTable.appendChild(this.createByTheNumbersTextRow("Age", Math.round(person.age) + " (" + AgeCategory[person.ageCategory] + ")"));
        numbersTable.appendChild(this.createByTheNumbersTextRow("Race", person.race.name));
        numbersTable.appendChild(this.createByTheNumbersTextRow("Gender", person.gender.name));
        numbersTable.appendChild(this.createByTheNumbersTextRow("Profession", person.jobName));
        numbersTable.appendChild(this.createByTheNumbersListRow("Personality", this.createTraitList(person)));
    }

    protected createTraitList(person: PersonStub): string[] {
        const result: string[] = [];
        for (let item of person.traits.getElements()) {
            result.push(item[0] + ": " + Math.round(item[1] * 100));
        }
        return result;
    }


    protected createByTheNumbersHeader(person: PersonStub): HTMLElement {
        const row = document.createElement("tr");
        const data = document.createElement("td");
        data.colSpan = 2;
        data.appendChild(createHTMLElement("h4", [], person.firstName + " " + person.familyName));
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

    protected bindSummary(person: PersonStub): void {
        const summary: HTMLElement = castHTMLElement(document.getElementById("summary"));
        summary.innerHTML = "<p><b>" + person.firstName + " " + person.familyName + "</b> likes Burgers and stuff</p>"
            + "<p>" + person.getPersonality() + "</p>"
            + "<p>" + person.getDescription() + "</p>";
    }
}