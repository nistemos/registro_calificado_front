import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { pushFile } from './dto';
import { Express } from 'express';
import { DriveService } from './drive.service';

// Define el enum con los valores permitidos

enum FolderEnum {
  Folder1 = '1FPRL891brqHsAedXCun9_TIprnLiiBvZ',
  Folder2 = '1yipsbm8lOcau2u-in2aZoTRAePzSHFPr',
  Folder3 = '1aBJDuqI30tYVbJZX9fEuNamoPEGgmSYw',
  Folder4 = '1FWPu9zsx3rmHgGlyJeJihl7RqpqSsrmh',
}

@ApiTags('drive')
@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @Post(':idCurse')
  @ApiParam({ name: 'idCurse', description: 'ID of the curse' })
  @ApiBody({ type: pushFile })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file')) // 'file' debe ser el nombre del campo
  @ApiResponse({ status: 200, description: 'File successfully uploaded.' })
  @ApiQuery({ name: 'folder', enum: FolderEnum, description: 'Folder ID' }) // Documenta el enum en Swagger
  async updateExchange(
    @Param('idCurse') idCurse: number,
    @Query('folder') folderId: FolderEnum = FolderEnum.Folder1,
    @UploadedFile() file: Express.Multer.File, // Cambiado a Express.Multer.File
  ) {
    const rest = this.driveService.uploadFile(idCurse + '', file, folderId);
    return rest;
  }

  @Get('list-contents')
  @ApiQuery({ name: 'folderName', description: 'Name of the folder' })
  @ApiQuery({ name: 'folder', enum: FolderEnum, description: 'Folder ID' }) // Documenta el enum en Swagger
  @ApiResponse({
    status: 200,
    description: 'Folder contents successfully retrieved.',
  })
  async listFolderContents(
    @Query('folderName') folderName: string,
    @Query('folder') folderId: FolderEnum = FolderEnum.Folder1,
  ) {
    const contents = await this.driveService.listFolderContents(folderName, folderId);
    return { contents };
  }

  @Delete('delete-file')
  @ApiQuery({ name: 'folderName', description: 'Name of the folder' })
  @ApiQuery({ name: 'fileName', description: 'Name of the file to delete' })
  @ApiQuery({ name: 'folder', enum: FolderEnum, description: 'Folder ID' }) // Documenta el enum en Swagger
  @ApiResponse({ status: 200, description: 'File successfully deleted.' })
  async deleteFile(
    @Query('folderName') folderName: string,
    @Query('fileName') fileName: string,
    @Query('folder') folderId: FolderEnum = FolderEnum.Folder1,
  ) {
    await this.driveService.deleteFile(folderName, fileName, folderId);
    return { success: true };
  }

  @Patch('rename-file')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        folderName: { type: 'string' },
        oldFileName: { type: 'string' },
        newFileName: { type: 'string' },
      },
      required: ['folderName', 'oldFileName', 'newFileName'],
    },
  })
  @ApiQuery({ name: 'folder', enum: FolderEnum, description: 'Folder ID' }) // Documenta el enum en Swagger
  @ApiResponse({ status: 200, description: 'File successfully renamed.' })
  async renameFile(
    @Body('folderName') folderName: string,
    @Body('oldFileName') oldFileName: string,
    @Body('newFileName') newFileName: string,
    @Query('folder') folderId: FolderEnum = FolderEnum.Folder1,
  ) {
    await this.driveService.renameFile(folderName, oldFileName, newFileName, folderId);
    return { success: true };
  }
}
