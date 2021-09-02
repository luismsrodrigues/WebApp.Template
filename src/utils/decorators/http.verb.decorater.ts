export function Get(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function Post(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function Delete(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function Put(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}