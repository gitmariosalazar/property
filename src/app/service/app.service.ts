import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {
    message: string;
  } {
    return {
      message: 'Hello World!',
    };
  }

  getHealthCheck(): {
    status: string;
    timestamp: Date;
  } {
    return {
      status: 'Property Service is healthy',
      timestamp: new Date(),
    };
  }
}
