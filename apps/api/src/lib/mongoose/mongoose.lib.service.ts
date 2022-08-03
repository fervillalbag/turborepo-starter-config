import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions
} from '@nestjs/mongoose';

import { ConfigLibService } from '@lib/config';

import { MongooseLibConfig } from './mongoose.lib.dto';
import { accessibleRecordsPlugin } from '@casl/mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

@Injectable()
export class MongooseLibService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigLibService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const config = this.configService.validate(
      'MongooseModule',
      MongooseLibConfig
    );
    return {
      uri: config.MONGO_DB_URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectionFactory: (connection) => {
        connection.plugin(mongooseAutoPopulate);
        connection.plugin(accessibleRecordsPlugin);
        return connection;
      }
    };
  }
}
//accessibleRecordsPlugin
