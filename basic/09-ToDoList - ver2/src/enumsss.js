export const MaterialType = Object.freeze({
    BASIC   : "MeshBasicMaterial",
    LINE    : "MeshLineMaterial"
})

export class Materials {
    constructor() {
        this.materials = {
            [MaterialType.BASIC]: {},
            [MaterialType.LINE]: {}
        };
    }

    dispose() {
        this.materials[MaterialType.BASIC] = null;
        this.materials[MaterialType.LINE] = null;
    }

    get(type, color) {
        let material = this.materials[type][color];
        if (material == null) {
            material = this[type](color);
            this.materials[type][color] = material;
        }
        return material;
    }

    [MaterialType.BASIC](color) {
        console.log(MaterialType.BASIC);
        return {type: color}
    }

    [MaterialType.LINE](color) {
        return {type: "line"}
    }
}

const materials = new Materials();
const mat = materials.get(MaterialType.BASIC, "0x000000");
console.log(mat);