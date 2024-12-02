
export interface DependencyNode {
    name: string;
    dependencies: DependencyNode[];
}