/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router, Application, Request, Response } from "express";
import { AuthorizeHandler } from "@/lib";

type HttpVerb = "GET" | "POST" | "PUT" | "DELETE";

export interface IRouter {
    Path: string,
    Method: HttpVerb,
    Callback: any
}

export type RouterArgumentType = "BODY" | "QUERY" | "PARAMS";
export interface IRouterArguments {
    MethodName: string,
    Type: RouterArgumentType,
    Index: number
}

export abstract class BaseController {
    public BasePath: string;
    public Routes: IRouter[];
    public AuthorizedMethods: string[];
    public RouterArgumentInjection: IRouterArguments[];

    public Map(app: Application): void {
        const _router = Router();

        this.Routes.forEach(router => {
            switch (router.Method) {
                case "GET":
                    _router.get(
                        router.Path,
                        this.ApplyMiddleware(router.Callback),
                        // @ts-ignore
                        async (request, response, next) => await this.MethodHandler(router, request, response, next));
                    break;
                case "POST":
                    _router.post(
                        router.Path,
                        this.ApplyMiddleware(router.Callback),
                        // @ts-ignore
                        async (request, response, next) => await this.MethodHandler(router, request, response, next));
                    break;
                case "PUT":
                    _router.put(
                        router.Path,
                        this.ApplyMiddleware(router.Callback),
                        // @ts-ignore
                        async (request, response, next) => await this.MethodHandler(router, request, response, next));
                    break;
                case "DELETE":
                    _router.delete(
                        router.Path,
                        this.ApplyMiddleware(router.Callback),
                        // @ts-ignore
                        async (request, response, next) => await this.MethodHandler(router, request, response, next));
                    break;
            }
        });

        app.use(this.BasePath, _router);
    }

    private async MethodHandler(router: IRouter, request: Request, response: Response, next) {
        try {
            const method: Function = router.Callback.bind(this);
            const dependencyInjectionArguments = [];
            const dependencyInjectionArgumentMappeds = this.RouterArgumentInjection.filter(e => e.MethodName == router.Callback.name)
                .sort((a, b) => a.Index - b.Index);

            if (dependencyInjectionArgumentMappeds.length > 0) {
                dependencyInjectionArgumentMappeds.forEach(element => {
                    switch (element.Type) {
                        case "BODY":
                            dependencyInjectionArguments.push(request.body);
                            break;

                        case "QUERY":
                            dependencyInjectionArguments.push(request.query);
                            break;

                        case "PARAMS":
                            dependencyInjectionArguments.push(request.params);
                            break;

                        default:
                            throw new Error("No supported type.");
                    }
                });
            }

            const result = await method(...dependencyInjectionArguments);

            response.status(200);

            if (result != null) {
                response.json({
                    result
                });
            }
            response.end();
        } catch (error) {
            next(error);
        }
    }

    private ApplyMiddleware(method: string): any[] {
        const middleware: any[] = [];

        if (this.AuthorizedMethods) {
            const auth = this.AuthorizedMethods.find(value => value == method);

            if (auth) {
                middleware.push(AuthorizeHandler);
            }
        }

        return middleware;
    }
}