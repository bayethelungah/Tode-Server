import { TodeResponseMessageBody } from "./ServerIO";
import { Status } from "./Status";

export interface DependencyNode extends TodeResponseMessageBody {
    name: string;
    version: string;
    status: Status;
    repoLink: string | null;
    dependencies: {[key: string]: DependencyNode} | null;
    description: string | null;
}
