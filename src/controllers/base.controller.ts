/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router, Application } from "express";
import { AuthorizeHandler } from "@/utils/handlers";

type HttpVerb = "GET" | "POST" | "PUT" | "DELETE";

export interface IRouter {
    Path: string,
    Method: HttpVerb,
    Callback: string
}

export abstract class BaseController {
    public BasePath: string;
    public Routes: IRouter[];
    public AuthorizedMethods: string[];

    public Map(app: Application): void {
        const _router = Router();

        this.Routes.forEach(router => {
            switch (router.Method) {
                case "GET":
                    _router.get(
                        router.Path,
                        this.ApplyMiddleware(router.Callback),
                        // @ts-ignore
                        (request, response, next) => this[router.Callback](this, request, response, next));
                    break;
                case "POST":
                    _router.post(
                        router.Path,
                        this.ApplyMiddleware(router.Callback),
                        // @ts-ignore
                        (request, response, next) => this[router.Callback](this, request, response, next));
                    break;
                case "PUT":
                    _router.put(
                        router.Path,
                        this.ApplyMiddleware(router.Callback),
                        // @ts-ignore
                        (request, response, next) => this[router.Callback](this, request, response, next));
                    break;
                case "DELETE":
                    _router.delete(
                        router.Path,
                        this.ApplyMiddleware(router.Callback),
                        // @ts-ignore
                        (request, response, next) => this[router.Callback](this, request, response, next));
                    break;
            }
        });

        app.use(this.BasePath, _router);
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