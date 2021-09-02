import { BaseController } from "../../controllers/base.controller";

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

export function Post(route: string) {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        if(!target.Routes){
            target.Routes = [];
        }

        target.Routes.push({
            Path: route,
            Callback: propertyKey,
            Method: "POST"
        });
    };
}

export function Delete(route: string) {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        if(!target.Routes){
            target.Routes = [];
        }

        target.Routes.push({
            Path: route,
            Callback: propertyKey,
            Method: "DELETE"
        });
    };
}

export function Put(route: string) {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        if(!target.Routes){
            target.Routes = [];
        }

        target.Routes.push({
            Path: route,
            Callback: propertyKey,
            Method: "PUT"
        });
    };
}