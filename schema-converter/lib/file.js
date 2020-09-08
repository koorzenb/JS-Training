import {promises} from "fs";
import {extname, basename} from "path";
import * as walker from "walkdir";

const readJson = async (file) => {
    const result = {
        data: null,
        error: null
    }
    const template = await promises.readFile(file, {encoding: "utf8"}).catch((error) => {
        result.error = error;
    });

    try {
        template && (result.data = JSON.parse(template.trim()));
    }
    catch (error) {
        result.error = error;
    }

    return result;
}

const writeJson = async (path, object) => {
    const result = {
        error: null
    }

    await promises.writeFile(path, object, {encoding: "utf8"}).catch((error) => {
        result.error = error;
    });

    return result;
}

const walkDirectory = async (rootDirectory, extensions) => {
    return new Promise((resolve, reject) => {
        const files = [];

        const emitter = walker.default.walk(rootDirectory, (filePath) => {
            extensions.includes(extname(basename(filePath))) && files.push(filePath);
        });

        emitter.on("end", () => {
            resolve(files);
        });

        emitter.on("error", () => reject());
        emitter.on("fail", () => resolve());
    });
}

const fileLibrary = {
    readJson, 
    writeJson,
    walkDirectory
}

export {fileLibrary};