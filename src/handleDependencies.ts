import { DependencyNode } from "./models/DependencyNode";
import { TodeFileUploadData, TodeRequestMessage, TodeResponseMessage } from "./models/ServerIO";
import { NPMInfo } from "./models/NPMInfo";
import { Status } from "./models/Status";
import { log } from "./utils";

const getNPMInfo = async (name: string): Promise<NPMInfo> => {
    const response = await fetch(`https://api.npms.io/v2/package/${name}`);
    const data = await response.json();

    return data;
}

const getStatus = async (clientVersionNumber: string, npmVersionNumber: string): Promise<Status> => {
 
    if(clientVersionNumber === npmVersionNumber) {
        return Status.OK;
    }

    return Status.Outdated;
}

const buildDependencyNode = async (name: string, version: string, depth: number): Promise<DependencyNode> => {

    const npmInfo = await getNPMInfo(name);
    const status = await getStatus(version, npmInfo?.collected?.metadata?.version);

    if (depth <= 0) {
        return {
            name,
            version,
            dependencies: null,
            status: status,
            repoLink: npmInfo?.collected?.metadata?.links?.repository,
            description: npmInfo?.collected?.metadata?.description
        };
    }

    const hasDependencies = npmInfo?.collected?.metadata?.dependencies !== undefined;
    
    const dependencies = hasDependencies ? await getDependencies(npmInfo?.collected?.metadata?.dependencies, depth) : null;

    return {    
        name,
        version,
        dependencies,
        status,
        repoLink: npmInfo?.collected?.metadata?.links?.repository,
        description: npmInfo?.collected?.metadata?.description
    };
};


export const handleUploadDependencies = async (packageContent: TodeRequestMessage, searchDepth: number): Promise<TodeResponseMessage> => {
    console.log("packageContent: ", packageContent.body);
    const content = packageContent.body as TodeFileUploadData;


    const response: TodeResponseMessage = {
        body: null,
        errorMessage: null
    }

    const dependencyTree = {
        name: content.name,
        version: content.version,
        dependencies: await getDependencies(content.dependencies, searchDepth),
        status: Status.OK,
        repoLink: null
    }

    response.body = dependencyTree;

    return response;

}


const getDependencies = async (dependencies: {[key: string]: string}, searchDepth: number): Promise<{[key: string]: DependencyNode}> => {
   const dependencyNodeArray: DependencyNode[] = await Promise.all(Object.entries(dependencies).map(
    ([depName, depVersion]) => buildDependencyNode(depName, depVersion as string, searchDepth - 1)))

    const properDependencyStructure: {[key: string]: DependencyNode} = Object.fromEntries(dependencyNodeArray.map(d => [d.name, d]))
    return properDependencyStructure
}

 
 export const handleSearchDependencies = async (packageContent: TodeRequestMessage, searchDepth: number): Promise<TodeResponseMessage> => {
    const packageName = packageContent.body as string;
    const npmInfo = await getNPMInfo(packageName);
    const packageVersion = npmInfo?.collected?.metadata?.version;

    const response: TodeResponseMessage = {
        body: null,
        errorMessage: null
    }

    if(!npmInfo.collected)
    {
        response.errorMessage = "Package not found";
        return response
    }

    
    response.body = await buildDependencyNode(packageName as string, packageVersion, searchDepth);

    return response 
 }
 

