import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { pushFile } from './dto';
import { Express } from 'express'
import { DriveService } from './drive.service';

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
    async updateExchange(
        @Param('idCurse') idCurse: number,
        @UploadedFile() file: Express.Multer.File, // Cambiado a Express.Multer.File
    ) {
        const rest = this.driveService.uploadFile(idCurse + "", file)
        
        console.log('Received file:', file, idCurse); // Log para verificar el archivo recibido
        // Aquí puedes agregar la lógica para manejar el archivo
        return rest
    }

    @Get('list-contents')
    @ApiQuery({ name: 'folderName', description: 'Name of the folder' })
    @ApiResponse({ status: 200, description: 'Folder contents successfully retrieved.' })
    async listFolderContents(
      @Query('folderName') folderName: string
    ) {
        console.log("folderName", folderName)
      const contents = await this.driveService.listFolderContents(folderName);
      return { contents };
    }

    @Delete('delete-file')
    @ApiQuery({ name: 'folderName', description: 'Name of the folder' })
    @ApiQuery({ name: 'fileName', description: 'Name of the file to delete' })
    @ApiResponse({ status: 200, description: 'File successfully deleted.' })
    async deleteFile(
      @Query('folderName') folderName: string,
      @Query('fileName') fileName: string
    ) {
      await this.driveService.deleteFile(folderName, fileName);
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
          parentFolderId: { type: 'string', nullable: true },
        },
        required: ['folderName', 'oldFileName', 'newFileName'],
      },
    })
    @ApiResponse({ status: 200, description: 'File successfully renamed.' })
    async renameFile(
      @Body('folderName') folderName: string,
      @Body('oldFileName') oldFileName: string,
      @Body('newFileName') newFileName: string
    ) {
      await this.driveService.renameFile(folderName, oldFileName, newFileName);
      return { success: true };
    }

}
