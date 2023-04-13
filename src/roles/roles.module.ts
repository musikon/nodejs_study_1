import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";
import { ConfigModule } from '@nestjs/config'

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
