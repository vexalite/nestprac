import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgres://nest_ee1a_user:74bIlGRMqErxIOIJ8qj4aGFo1fCOmuhW@dpg-cjop7rr6fquc73f3vgn0-a.oregon-postgres.render.com/nest_ee1a'
                }
            }
        })
    }
}
