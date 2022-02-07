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
    OwnerId: number; // 작성자 ID
}
