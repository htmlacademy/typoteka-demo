import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigUploaderModule } from '@project/config/config-uploader';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
