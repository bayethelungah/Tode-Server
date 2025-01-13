import { DependencyNode } from "./DependencyNode";

export interface TodeFileUploadData {
    name: string;
    version: string;
    dependencies: { [key: string]: string };
}

export interface TodeRequestMessage {
    body: string | TodeFileUploadData;
}

export interface TodeResponseMessage {
    body: TodeResponseMessageBody | null;
    errorMessage: string | null;   
}


export interface TodeResponseMessageBody {
     
}


