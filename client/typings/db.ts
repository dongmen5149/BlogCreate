export interface IUser {
  id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkspace[];
}

export interface IWorkspace {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  viewcnt: number;
}

export interface ISearchterm {
  searchterm: string;
}
