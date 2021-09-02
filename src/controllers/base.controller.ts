/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router, Application } from "express";

type HttpVerb = "GET" | "POST" | "PUT" | "DELETE";

export interface IRouter {
    Path: string,
    Method: HttpVerb,
    Callback: string
}

export abstract class BaseController {
    public BasePath: string;
    public Routes : IRouter[];

    public Map(app: Application) : void{
        const _router = Router();

        this.Routes.forEach(router => {
            switch (router.Method) {
                case "GET":
                    // @ts-ignore
                    _router.get(router.Path, (request, response, next) => this[router.Callback](this, request, response, next));
                    break;
                case "POST":
                    // @ts-ignore
                    _router.post(router.Path, (request, response, next) => this[router.Callback](this, request, response, next));
                break;
                case "PUT":
                    // @ts-ignore
                    _router.put(router.Path, (request, response, next) => this[router.Callback](this, request, response, next));
                break;
                case "DELETE":
                    // @ts-ignore
                    _router.delete(router.Path, (request, response, next) => this[router.Callback](this, request, response, next));
                break;
            }
        });

        app.use(this.BasePath, _router);
    }
}