import { BaseController } from "../../controllers/base.controller";

export function Authorize() {
    return function (target: BaseController, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.AuthorizedMethods) {
            target.AuthorizedMethods = [];
        }

        target.AuthorizedMethods.push(propertyKey);
    };
}