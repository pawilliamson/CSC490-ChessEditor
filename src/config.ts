import { ConnectionOptions, Connection, createConnection, getConnectionManager, getConnection } from "typeorm";
import "reflect-metadata";

export const config : ConnectionOptions = {
    type: 'mysql',
    name: 'fun',
    port: 3306,
    host: 'localhost',
    database: 'CHESS_APP',
    username: 'root',
    password: 'chess123',
    synchronize: true,
    extra: {
        socketPath: '/cloudsql/chess-app-305819:us-central1:chessapp-instance'
    }
}

export const connection = async () => {
    let connection: Connection;

    try {
        connection = getConnection (config.name);
    }
    catch (err) {
        connection = await createConnection (config);
    }

    return connection;
}