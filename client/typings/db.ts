export interface IUser {
  id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkspace[];
}

export interface IWorkspace {
  title: string;
  content: string;
  createdAt: string;
}

export interface ISearchterm {
  searchterm: string;
}
