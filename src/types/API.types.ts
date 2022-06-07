import { IComment } from "./comment.types";


export interface IGetFirstByPost {
    count: number
    firstComments: IComment[]
}


export interface IGetAllByPost {
    count: number
    comments: IComment[]
}