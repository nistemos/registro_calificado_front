export interface createFolder{
  name: string;
  description: string;
  programsYear: number;
  program: number;
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
    courses: [],
    totalPages: number,
    totalPrograms: number
  },
  status: number
}

export interface updateFolder{
  id: number,
  data:{
    name: string,
    description: string,
    program: number;
  },
  status: number
}

export interface deleteFolder{
  id: number
}

export interface deleteFolderResponse{
  message: string,
  data: null,
  status: number
}
