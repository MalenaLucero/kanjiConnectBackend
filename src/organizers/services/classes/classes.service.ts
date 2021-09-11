import { Injectable } from '@nestjs/common';

import { Class } from 'src/organizers/entities/class.entity';
import { CreateClassDto, UpdateClassDto } from 'src/organizers/dtos/class.dto';

@Injectable()
export class ClassesService {
    findAll(): Array<Class> {
        const classes: Array<Class> = [
            {
                date: new Date,
                link: "www.google.com"
            }
        ]
        return classes;
    }

    findOne(id: string): Class {
        const res: Class = {
            date: new Date,
            link: "www.google.com"
        }
        return res;
    }

    create(payload: CreateClassDto) {
        return payload;
    }

    update(payload: UpdateClassDto) {
        return payload;
    }

    delete(id: string) {
        return id;
    }
}
