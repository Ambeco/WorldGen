
export class PageParams {
    private seed: string;
    private location: number;
    private zoom: number;

    constructor() {
        var url = new URL(window.location.href);
        var seed: string | null = url.searchParams.get("s");
        if (seed == null) {
            this.seed = Math.round(Math.random() * 10000000000000000).toString();
            this.onChange();
        } else {
            this.seed = seed;
        }
        this.location = parseInt(url.searchParams.get("l") || "0") || 0;
        this.zoom = parseInt(url.searchParams.get("z") || "0") || 0;
        
    }

    getSeed(): string { return this.seed; }
    getLocation(): number { return this.location; }
    getZoom(): number { return this.zoom; }

    changeLocation(location: number, zoom: number) {
        this.location = location;
        this.zoom = zoom;
        this.onChange();
    }

    private onChange() {
        let args = "?s=" + this.seed;
        if (this.zoom > 0) {
            args += "&l=" + this.location + "&z=" + this.zoom;
        }
        history.replaceState({}, "", args);
    }
};
