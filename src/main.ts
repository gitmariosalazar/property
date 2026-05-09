import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { environments } from './settings/environments/environments';
import * as morgan from 'morgan';
import { DatabaseAbstract } from './shared/connections/database/abstract/abstract.database';

async function bootstrap() {
  const logger: Logger = new Logger('PropertyMain');

  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  await app.listen(environments.NODE_ENV === 'production' ? 3010 : 4010);

  const dbService = app.get(DatabaseAbstract);
  logger.log(await dbService.connect());

  logger.log(
    `🚀🎉 The Property microservice is running on: http://localhost:${environments.NODE_ENV === 'production' ? 3010 : 4010}✅`,
  );

  const microservice = await NestFactory.createMicroservice(AppModule, {
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
    },
  });

  await microservice.listen();
  logger.log(`Nest application successfully started`);
}
bootstrap();
