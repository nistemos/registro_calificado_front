import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as path from 'path';
import { Readable } from 'stream'; // Importa Readable desde el módulo 'stream'

@Injectable()
export class DriveService {
  private drive;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join('./fetedu-9960452275da.json'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  private async createFolder(name: string) {
    const parentFolderId = '1FPRL891brqHsAedXCun9_TIprnLiiBvZ';
    const fileMetadata = {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : [],
    };

    try {
      const file = await this.drive.files.create({
        resource: fileMetadata,
        fields: 'id',
      });
      return file.data.id;
    } catch (error) {
      throw new Error(`Error creating folder: ${error.message}`);
    }
  }

  private async folderExists(name: string): Promise<boolean> {
    try {
      const parentFolderId = '1FPRL891brqHsAedXCun9_TIprnLiiBvZ';
      const response = await this.drive.files.list({
        q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and name='${name}' and trashed=false`,
        fields: 'files(id, name)',
      });

      return response.data.files.length > 0;
    } catch (error) {
      throw new Error(`Error checking folder existence: ${error.message}`);
    }
  }

  async uploadFile(
    folderName: string,
    file: Express.Multer.File,
    parentFolderId: string = '1FPRL891brqHsAedXCun9_TIprnLiiBvZ',
  ): Promise<string> {
    try {
      // Step 1: Check if the folder exists
      const folderId = await this.getFolderId(folderName, parentFolderId);
      // Step 2: Upload the file to the folder
      const fileMetadata = {
        name: file.originalname,
        parents: [folderId],
      };

      const media = {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      };

      const uploadedFile = await this.drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'id',
      });

      return uploadedFile.data.id;
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }

  private async getFolderId(
    folderName: string,
    parentFolderId: string,
  ): Promise<string> {
    const response = await this.drive.files.list({
      q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
      fields: 'files(id, name)',
    });

    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    } else {
      // Folder does not exist, create it
      return await this.createFolder(folderName);
    }
  }

  async listFolderContents(
    folderName: string,
    parentFolderId: string = '1FPRL891brqHsAedXCun9_TIprnLiiBvZ',
  ): Promise<any[]> {
    try {
      const folderId = await this.getFolderId(folderName, parentFolderId);
      try {
        const response = await this.drive.files.list({
          q: `'${folderId}' in parents and trashed=false`,
          fields: 'files(id, name, mimeType, webViewLink, webContentLink)',
        });
        return response.data.files.map((file) => ({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          webViewLink: `https://drive.google.com/file/d/${file.id}/view?usp=sharing`,
          webContentLink: `https://drive.google.com/uc?export=download&id=${file.id}`,
        }));
      } catch (error) {
        throw new Error(`Error listing folder contents: ${error.message}`);
      }
    } catch (error) {
      throw new Error(`Error listing folder contents: ${error.message}`);
    }
  }

  async deleteFile(
    folderName: string,
    fileName: string,
    parentFolderId: string = '1FPRL891brqHsAedXCun9_TIprnLiiBvZ',
  ): Promise<void> {
    try {
      const folderId = await this.getFolderId(folderName, parentFolderId);

      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and name='${fileName}' and trashed=false`,
        fields: 'files(id, name)',
      });

      if (response.data.files.length === 0) {
        throw new Error(
          `File '${fileName}' not found in folder '${folderName}'`,
        );
      }

      const fileId = response.data.files[0].id;

      await this.drive.files.delete({
        fileId,
      });
    } catch (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }

  async renameFile(
    folderName: string,
    oldFileName: string,
    newFileName: string,
    parentFolderId: string = '1FPRL891brqHsAedXCun9_TIprnLiiBvZ',
  ): Promise<void> {
    try {
      // Step 1: Get the folder ID
      const folderId = await this.getFolderId(folderName, parentFolderId);

      // Step 2: Find the file in the folder
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and name='${oldFileName}' and trashed=false`,
        fields: 'files(id, name)',
      });

      if (response.data.files.length === 0) {
        throw new Error(
          `File '${oldFileName}' not found in folder '${folderName}'`,
        );
      }

      const fileId = response.data.files[0].id;

      // Step 3: Update the file name
      await this.drive.files.update({
        fileId,
        requestBody: {
          name: newFileName,
        },
      });
    } catch (error) {
      throw new Error(`Error renaming file: ${error.message}`);
    }
  }
}
