export interface IDBConnector {
    // async 구현 방식에 대한 것이기 때문에 명시하지 않음.
    saveData(path: string, data: any): Promise<any>;
    getData(path: string): Promise<any>;
};