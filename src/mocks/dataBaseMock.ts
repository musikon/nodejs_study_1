import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from './dataBaseConfig';
import {Module} from "@nestjs/common";

@Module({
  imports: [
    SequelizeModule.forRoot({
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      autoLoadModels: true,
      synchronize: databaseConfig.synchronize,
    }),
  ],
})
export class AppTestModule {}