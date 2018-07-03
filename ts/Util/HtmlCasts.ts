


export function castHTMLElement(element: HTMLElement | null | Element): HTMLElement {
    if (!(element instanceof HTMLElement))
        throw new Error(`Expected e to be an HTMLElement, was ${element && element.constructor && element.constructor.name || element}`);
    return <HTMLElement>element;
}

export function castHTMLDivElement(element: HTMLElement | null | Element): HTMLDivElement {
    if (!(element instanceof HTMLDivElement))
        throw new Error(`Expected e to be an HTMLDivElement, was ${element && element.constructor && element.constructor.name || element}`);
    return <HTMLDivElement>element;
}

export function castHTMLSpanElement(element: HTMLElement | null | Element): HTMLSpanElement {
    if (!(element instanceof HTMLSpanElement))
        throw new Error(`Expected e to be an HTMLSpanElement, was ${element && element.constructor && element.constructor.name || element}`);
    return <HTMLSpanElement>element;
}

export function castHTMLUListElement(element: HTMLElement | null | Element): HTMLUListElement {
    if (!(element instanceof HTMLUListElement))
        throw new Error(`Expected e to be an HTMLUListElement, was ${element && element.constructor && element.constructor.name || element}`);
    return <HTMLUListElement>element;
}

export function castHTMLLIElement(element: HTMLElement | null | Element): HTMLLIElement {
    if (!(element instanceof HTMLLIElement))
        throw new Error(`Expected e to be an HTMLLIElement, was ${element && element.constructor && element.constructor.name || element}`);
    return <HTMLLIElement>element;
}

export function castHTMLTableElement(element: HTMLElement | null | Element): HTMLTableElement {
    if (!(element instanceof HTMLTableElement))
        throw new Error(`Expected e to be an HTMLTableElement, was ${element && element.constructor && element.constructor.name || element}`);
    return <HTMLTableElement>element;
}