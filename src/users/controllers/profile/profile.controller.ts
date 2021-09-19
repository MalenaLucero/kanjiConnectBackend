import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { ExpressionsService } from 'src/data/services/expressions/expressions.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard) 
@Controller('profile')
export class ProfileController {
    constructor(private expressionsService: ExpressionsService) {}

    @Roles(Role.DEVELOPER)
    @Get('my-expressions')
    getOrders(@Req() req: Request) {
        const user = req.user as PayloadToken;
        console.log(user.sub)
        return this.expressionsService.findByUser('123');
    }
}
