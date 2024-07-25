import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Task],
    migrations: [],
    subscribers: []

});


AppDataSource.initialize()
    .then( () => { console.log("Database initialized"); })
    .catch( (error) => { console.error("Error initializing database", error); });

    