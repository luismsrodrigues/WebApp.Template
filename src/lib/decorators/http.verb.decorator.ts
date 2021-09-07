import { BaseController, RouterArgumentType } from "@/lib";

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

export function RequestBody(target: BaseController, propertyKey: string, parameterIndex: number) {
    AddArgumentInjection("BODY", target, propertyKey, parameterIndex);
}

export function RequestQuery(target: BaseController, propertyKey: string, parameterIndex: number) {
    AddArgumentInjection("QUERY", target, propertyKey, parameterIndex);
}

export function RequestParams(target: BaseController, propertyKey: string, parameterIndex: number) {
    AddArgumentInjection("PARAMS", target, propertyKey, parameterIndex);
}

function AddArgumentInjection(type: RouterArgumentType, target: BaseController, propertyKey: string, parameterIndex: number) {
    if (!target.RouterArgumentInjection) {
        target.RouterArgumentInjection = [];
    }
    target.RouterArgumentInjection.push({
        MethodName: propertyKey,
        Type: type,
        Index: parameterIndex
    });
}