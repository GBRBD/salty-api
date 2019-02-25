import { Module } from '@nestjs/common';
import { FeatureModule } from './feature/feature.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO || new ConfigService('development.env').get('MONGO'),
      {
        useNewUrlParser: true,
      },
    ),
    FeatureModule,
    ConfigModule,
  ],
})
export class AppModule {}
