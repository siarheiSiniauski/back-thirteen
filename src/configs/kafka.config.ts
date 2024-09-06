import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.KAFKA_BROKER);
console.log(process.env.KAFKA_GROUP_ID);

export const getConfigKafka = (): ClientsModuleOptions => {
  return [
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER], // Используйте переменную окружения
        },
        consumer: {
          groupId: process.env.KAFKA_GROUP_ID,
        },
      },
    },
  ];
};

export const getConfigKafkaMicroservice = (): MicroserviceOptions => {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID,
      },
    },
  };
};

export const JOIN_USER_TO_GAME = 'JOIN_USER_TO_GAME';
