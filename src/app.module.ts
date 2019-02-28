import { Module } from '@nestjs/common';
import { FeatureModule } from './feature/feature.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    FeatureModule,
    FirebaseModule,
  ],
})
export class AppModule {}
