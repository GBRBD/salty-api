import { Module } from '@nestjs/common';
import { FeatureModule } from './feature/feature.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

@Module({
  imports: [
    MongooseModule.forRoot(new ConfigService(env()).get('MONGO'), {
      useNewUrlParser: true,
    }),
    FeatureModule,
    ConfigModule,
  ],
})
export class AppModule {}

function env() {
  if (!process.env.NODE_ENV) {
    return 'development.env';
  } else {
    return `${process.env.NODE_ENV}.env`;
  }
}
