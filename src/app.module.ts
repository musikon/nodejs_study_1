import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MongooseModule.forRoot(`mongodb+srv://ykosygin:123@cluster1.siuas3a.mongodb.net/?retryWrites=true&w=majority`),
        UsersModule
    ],
})
export class AppModule {}
