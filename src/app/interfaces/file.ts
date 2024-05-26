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
