import { Continent } from "../Layers/B_continent/Continent.js";
import { castHTMLSpanElement, castHTMLDivElement, castHTMLUListElement, castHTMLElement, castHTMLTableElement, castHTMLLIElement } from "../Util/HtmlCasts.js";
import { PersonStub } from "../Universal/Person/PersonStub.js";
import { toCamelCase, toTitleCase } from "../Util/casing.js";
import { LayerDetailsAdapter } from "./DetailsAdapter.js";
import { TreeAdapter } from "./TreeAdapter.js";
import { LayerStub } from "../Layers/LayerStub.js";
import { Layer } from "../Layers/Layer.js";
import { PersonDetailsAdapter } from "./PersonDetailsAdapter.js";

export class PersonTreeAdapter extends TreeAdapter<PersonStub, PersonStub> {
    readonly detailsAdapter: PersonDetailsAdapter;

    constructor(listItemElement: HTMLLIElement, stub: PersonStub) {
        super(listItemElement, stub, false);
        this.detailsAdapter = new PersonDetailsAdapter();
        this.name.innerText = "Person: " + stub.firstName + " " + stub.familyName;
    }

    expand(parent: PersonStub): void {
        this.collapse();
    }

    collapse(): void {
        this.expandedWithData = this.stub;
        this.toggleIcon.classList.remove("toggle-expanded");
        this.toggleIcon.classList.remove("toggle-collapsed");
        this.toggleIcon.classList.add("toggle-hidden");
        this.subList.innerText = "";
    }

    protected generateFullData(stub: PersonStub): PersonStub {
        return stub;
    }

    onTreeToggleClick(): void {
        this.collapse();
    }

    onNameClick(): PersonStub {
        const person = super.onNameClick();
        this.detailsAdapter.bind(person);
        return person;
    }
}
