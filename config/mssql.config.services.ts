import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SqlServerConfigService implements TypeOrmOptionsFactory {
    constructor(private config: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mssql", // Use o driver mssql para SQL Server
            host: this.config.get<string>("DB_HOST"),
            port: this.config.get<number>("DB_PORT"),
            username: this.config.get<string>("DB_USERNAME"),
            password: this.config.get<string>("DB_PASSWORD"),
            database: this.config.get<string>("DB_NAME"),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true // Sincronizar as entidades com o banco de dados (use apenas em desenvolvimento)
        };
    }
}
