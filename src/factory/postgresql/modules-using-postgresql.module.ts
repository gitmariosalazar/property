import { Module } from "@nestjs/common";
import { PostgresPropertyModule } from "../../modules/properties/infrastructure/modules/postgresql/postgresql.property.controller";


@Module({
  imports: [PostgresPropertyModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppPropertyModulesUsingPostgreSQL { }