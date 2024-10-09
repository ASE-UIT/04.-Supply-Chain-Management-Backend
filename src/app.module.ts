import { AuthModule } from '@gstb/modules/AuthModule';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { DocumentModule } from '@gstb/modules/DocumentModule';
// import { DeviceCategoryModule } from './modules/DeviceCategoryModule';
// import { DeviceModule } from './modules/DeviceModule';
// import { MaintainanceHistoryModule } from './modules/MaintainanceHistoryModule';
// import { UsageHistoryModule } from './modules/UsageHistoryModule';
// import { UpdateScheduleModule } from './modules/UpdateScheduleModule';
import { UserModule } from './modules/UserModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['local.env', 'staging.env', 'production.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    AuthModule,
    UserModule,
    // DocumentModule,
    // DeviceCategoryModule,
    // DeviceModule,
    // MaintainanceHistoryModule,
    // UsageHistoryModule,
    // UpdateScheduleModule,
  ]
})
export class AppModule { }