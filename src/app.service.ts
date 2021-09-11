import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {

  constructor(@Inject('MONGO') private database: Db) {}

  getHello(): string {
    return 'Hello World!';
  }

  getTags() {
    const tagsCollection = this.database.collection('tags');
    return tagsCollection.find().toArray();
  }
}
