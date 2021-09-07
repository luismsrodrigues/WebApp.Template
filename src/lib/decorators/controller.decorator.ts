/* eslint-disable @typescript-eslint/ban-types */
export function Controller(basePath: string) {
    return function (constructor: Function) {
        if (!basePath.startsWith("/")) {
            throw new Error("Invalid Route on " + constructor.name);
        }
        constructor.prototype.BasePath = basePath;
    }
}