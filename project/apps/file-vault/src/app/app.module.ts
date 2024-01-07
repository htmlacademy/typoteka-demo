import { Module } from '@nestjs/common';

import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FileVaultConfigModule } from '@project/shared/config/file-vault';

@Module({
  imports: [
    FileUploaderModule,
    FileVaultConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
