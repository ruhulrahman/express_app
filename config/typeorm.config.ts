import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "your-username",
    password: "your-password",
    database: "your-database",
    synchronize: false, // Use migrations, don't auto-sync schema
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
});
