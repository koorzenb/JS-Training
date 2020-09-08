import {Convert2} from "./convert2.js";
import {Update} from "./update-datasources.js";
import {Lookups} from "./lookups.js";
import {Translations} from "./translations.js";
import {CrudToolbar} from "./crud-toolbar.js";
import {types} from "./schema-types.js";
import {CreateAndUpdate} from "./assist-save-and-update.js"

const main = async () => {

    const createAndUpdate = new CreateAndUpdate();
    await createAndUpdate.setup();
    const files = await createAndUpdate.walk();
    const fileGroups = await createAndUpdate.getFileGroups(files); 
    await createAndUpdate.processGroups(fileGroups);
    // const allTranslations = await crudToolbar.processGroupsGetAllTranslations(files);
    // await crudToolbar.processAllLookupTranslations(files, allTranslations);

    // const convert = new Convert2();
    // await convert.setup();
    // await convert.walk();
    // await convert.getFileGroups(); 
    // await convert.processGroups();

    // const lookups = new Lookups();
    // await lookups.setup();
    // const resources = await lookups.walk();
    // const files = await lookups.getFileGroups(resources); 
    // await lookups.processGroups(files);

    // const update = new Update();
    // await update.setup();
    // await update.walk();
    // await update.getFileGroups(); 
    // await update.processGroups();

    // const update = new Lookups();
    // await update.setup();
    // await update.walk();
    // await update.getFileGroups(); 
    // await update.processGroups();

    // const translations = new Translations();
    // await translations.setup();
    // const resources = await translations.walk();
    // const files = await translations.getFileGroups(resources); 
    // const allTranslations = await translations.processGroupsGetAllTranslations(files);
    // await translations.processAllLookupTranslations(files, allTranslations);
}

main();


