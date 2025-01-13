export interface NPMInfo {
    collected: {
        metadata: {
            name: string;
            version: string;
            description: string;
            links: {
                npm: string;
                homepage: string;
                repository: string;
                bugs: string;
            }
            dependencies: {
                [key: string]: string;
            }
        }
    }
   
}