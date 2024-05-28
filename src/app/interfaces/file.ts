export interface parameterFile{
  folderName: string,
  idCurse: number,
  file: string,
}

export interface getFile{
  contents:{
    id: string,
    name: string,
    mimeType: string,
    webViewLink: string,
    webContentLink: string
  }
}

export interface file{
  id: string,
  name: string,
  mimeType: string,
  webViewLink: string,
  webContentLink: string
}
export interface updateFile{

    folderName: string,
    oldFileName: string,
    newFileName: string,
    parentFolderId: string
}

export interface deleteFile{
  folderName: string,
  fileName: string
}
