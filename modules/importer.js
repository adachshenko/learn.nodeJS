export class Importer {

    constructor(dirWatcher) {
        dirWatcher.on("dirwatcher:changed", this.import);
    }

    import(files) {
        console.log("Was changed!!! " + files);
    }
}