import { User, Product} from "./models";
import * as config from "./config";
import { DirWatcher, Importer} from "./modules";

let product = new Product();
let user = new User();
let dirWatcher = new DirWatcher();
new Importer(dirWatcher);
dirWatcher.watch("./data", 10000);

console.log(config.applicationName);