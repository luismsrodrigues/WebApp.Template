import { getConnection, Connection } from "typeorm";

export class DatabaseContext {
    static CommunityCsGoServers(): Connection {
        return getConnection();
    }
}