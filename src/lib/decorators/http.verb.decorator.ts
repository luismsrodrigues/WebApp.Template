import { BaseController } from "@/lib/base.controller";

function ValidateRoute(route: string) {
    if (!route.startsWith("/")) {
        throw new Error("Invalid route - " + route + " - because route need start with /.");
    }
}

export function Get(route: string) {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        ValidateRoute(route);
        if (!target.Routes) {
            target.Routes = [];
        }

        target.Routes.push({
            Path: route,
            Callback: descriptor.value,
            Method: "GET"
        });
    };
}

export function Post(route: string) {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        ValidateRoute(route);
        if (!target.Routes) {
            target.Routes = [];
        }

        target.Routes.push({
            Path: route,
            Callback: descriptor.value,
            Method: "POST"
        });
    };
}

export function Delete(route: string) {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        ValidateRoute(route);
        if (!target.Routes) {
            target.Routes = [];
        }

        target.Routes.push({
            Path: route,
            Callback: descriptor.value,
            Method: "DELETE"
        });
    };
}

export function Put(route: string) {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        ValidateRoute(route);
        if (!target.Routes) {
            target.Routes = [];
        }

        target.Routes.push({
            Path: route,
            Callback: descriptor.value,
            Method: "PUT"
        });
    };
}