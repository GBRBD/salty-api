import { Module } from '@nestjs/common';
import { FeatureModule } from './feature/feature.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'DATABASE=mongodb://gbrbd:19Gagalino93@ds239055.mlab.com:39055/salty',
      { useNewUrlParser: true },
    ),
    FeatureModule,
  ],
})
export class AppModule {}
