import { BaseController, IRouter } from "../../controllers/base.controller";

export function Get(route: string) {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        if(!target.Routes){
            target.Routes = [];
        }

        target.Routes.push({
            Path: route,
            Callback: propertyKey,
            Method: "GET"
        });
    };
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