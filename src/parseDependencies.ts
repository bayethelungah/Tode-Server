import { DependencyNode } from "./models/DependencyNode";
import { MessageBody } from "./models/MessageBody";

export const parseDependencies = (packageContent: MessageBody): DependencyNode => {
    const content = JSON.parse(packageContent.content);

    return {
        name: content.name,
        version: content.version,
        dependencies: content.dependencies ? Object.entries(content.dependencies).map(([name, version]) => ({
            name,
            version: version as string,
            dependencies: null
        })) : null
    }
}