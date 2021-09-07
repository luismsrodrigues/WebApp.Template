/* eslint-disable @typescript-eslint/ban-types */
import { createConnection, getConnectionOptions } from "typeorm";

export class ConfigDatabase {

    static Config(connections: Promise<void>[], callback: Function): void {
        Promise.all(connections).then(() => callback());
    }

    static AddConnection(connectionName: string): Promise<void> {
        return getConnectionOptions(connectionName).then(connectionOptions => {
            createConnection({
                logger: "simple-console",
                logging: true,
                ...connectionOptions
            });
        });
    }
}