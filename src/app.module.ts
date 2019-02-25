import { Module } from '@nestjs/common';
import { FeatureModule } from './feature/feature.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    FeatureModule,
  ],
})
export class AppModule {}
