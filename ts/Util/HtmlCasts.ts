

export function castHTMLDivElement(element: HTMLElement | null): HTMLDivElement {
    if (!(element instanceof HTMLDivElement))
        throw new Error(`Expected e to be an HTMLDivElement, was ${element && element.constructor && element.constructor.name || element}`);
    return <HTMLDivElement>element;
}

export function castHTMLSpanElement(element: HTMLElement | null): HTMLSpanElement {
    if (!(element instanceof HTMLSpanElement))
        throw new Error(`Expected e to be an HTMLSpanElement, was ${element && element.constructor && element.constructor.name || element}`);
    return <HTMLSpanElement>element;
}