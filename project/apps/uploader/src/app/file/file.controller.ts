import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { fillObject } from '@project/util/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileService.saveFile(file);
    return fillObject(UploadedFileRdo, newFile);
  }

  @Get(':fileId')
  public async show(@Param('fileId') fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    return fillObject(UploadedFileRdo, existFile);
  }
}
