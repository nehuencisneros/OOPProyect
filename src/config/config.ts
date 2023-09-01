import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.CreatePathEnv(this.nodeEnv)
    dotenv.config({
      path: nodeNameEnv
    })
  }

  public getEnviroment(key: string) {
    return process.env[key];
  }

  public getNumberEnv(key: string): number {
    return Number(this.getEnviroment(key));
  }

  public get nodeEnv(): string {
    return this.getEnviroment("NODE_ENV")?.trim() || "";
  }

  public CreatePathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"]

    if (path.length > 0) {
      const stringToArray = path.split(".")
      arrEnv.unshift(...stringToArray)
    }
    return "." + arrEnv.join(".")
  }

  public get typeORMConfig(): DataSourceOptions {
    return {
      type: "mysql",
      host: this.getEnviroment("DB_HOST"),
      port: this.getNumberEnv("DB_PORT"),
      username: this.getEnviroment("DB_USER"),
      password: this.getEnviroment("DB_PASSWORD"),
      database: this.getEnviroment("DB_DATABASE"),

      //LECTURA DE ENTIDADES
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}