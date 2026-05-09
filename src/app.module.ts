import { Module } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { AppService } from './app/service/app.service';
import { HomeModule } from './app/module/home.module';
import { AppPropertyModulesUsingPostgreSQL } from './factory/postgresql/modules-using-postgresql.module';
import { AppPropertyModulesUsingMySQL } from './factory/mysql/modules-using-mysql.module';
import { environments } from './settings/environments/environments';
import { DatabasePersistenceModule } from './shared/connections/database/database-persistence.module';

const propertyModules = environments.DATABASE_TYPE === 'mysql'
  ? AppPropertyModulesUsingMySQL
  : AppPropertyModulesUsingPostgreSQL;

@Module({
  imports: [
    HomeModule, 
    propertyModules,
    DatabasePersistenceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
