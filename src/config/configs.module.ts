import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Configuration } from "./configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [Configuration],
    }),
  ],
})
export class ConfigsModule {}
