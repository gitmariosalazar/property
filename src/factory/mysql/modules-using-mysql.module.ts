import { Module } from '@nestjs/common';
import { MySQLPropertyModule } from '../../modules/properties/infrastructure/modules/mysql/mysql.property.module';

@Module({
  imports: [MySQLPropertyModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppPropertyModulesUsingMySQL {}
