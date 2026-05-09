import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { environments } from "../../../../../settings/environments/environments";
import { PropertyController } from "../../controllers/property.controller";
import { PropertyService } from "../../../application/services/property.service";
import { PostgresqlPropertyPersistence } from "../../repositories/postgresql/persistence/postgresql.property.persistence";
import { DatabasePersistenceModule } from "../../../../../shared/connections/database/database-persistence.module";

@Module({
  imports: [
    DatabasePersistenceModule,
    ClientsModule.register([
      {
        name: environments.PROPERTY_KAFKA_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: environments.PROPERTY_KAFKA_CLIENT_ID,
            brokers: [environments.KAFKA_BROKER_URL],
          },
          consumer: {
            groupId: environments.PROPERTY_KAFKA_GROUP_ID,
            allowAutoTopicCreation: true,
          },
        }
      }
    ])
  ],
  controllers: [
    PropertyController
  ],
  providers: [
    PropertyService,
    {
      provide: 'PropertyRepository',
      useClass: PostgresqlPropertyPersistence
    }
  ],
  exports: []
})
export class PostgresPropertyModule { }