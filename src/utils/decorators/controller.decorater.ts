export function Controller(basePath: string) {
    return function (constructor: Function) {
        constructor.prototype.BasePath = basePath;
    }
}