export interface createFolderProgram{
  name: string;
  description: string;
}

export interface program{
  id: number;
  name: string;
  description: string;
}

export interface getFolder{
  message: string,
  data: {
    programs: [],
    totalPages: number,
    totalPrograms: number
  },
  status: number
}
