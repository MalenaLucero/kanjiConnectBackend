import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';

import config from '../config'

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, password, dbName, host } = configService.mongo;
                return {
                    uri: `mongodb+srv://${user}:${password}@${host}`,
                    dbName: dbName,
                    useFindAndModify: false
                }
            },
            inject: [config.KEY]
        })
    ],
    providers: [
        {
            provide: 'MONGO',
            useFactory: async (configService: ConfigType<typeof config>) => {
                const { user, password, dbName } = configService.mongo;
                const uri = `mongodb+srv://${user}:${password}@vocabcardsdb.vhszt.mongodb.net/vocabCardsDB?retryWrites=true&w=majority`;
                const client = new MongoClient(uri);
                await client.connect();
                const database = client.db(dbName);
                return database;
            },
            inject: [config.KEY]
        }
    ],
    exports: ['MONGO', MongooseModule]
})
export class DatabaseModule {}
