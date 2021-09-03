/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createConnection, getConnectionOptions } from "typeorm";

export function DatabaseConfig(callback: Function) {
    getConnectionOptions().then(connectionOptions => {
        createConnection(connectionOptions).then(connection => {
            callback(connection);
        });
    });
}