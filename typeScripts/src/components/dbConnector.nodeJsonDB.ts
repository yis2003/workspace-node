import { JsonDB, Config } from "node-json-db";
import path from 'path';
import fs from 'fs';

import { IDBConnector } from "../interfaces/IDBConnector";

/**
 * DB Connector 클래스
 * node-json-db
 */
export class DBConnector implements IDBConnector {
    private db!: JsonDB;

    constructor(serviceName: string) {
        this.init(serviceName);
    };

    /**
     * @param serviceName DB Service 이름
     * init
     * db connector 객체를 생성한다.
     */
    private init(serviceName: string) {
        const fileName = serviceName.startsWith('/') ? serviceName.substring(1) : serviceName;
        const dbPath = path.resolve(__dirname, '..', '..', 'DB', fileName);
        this.db = new JsonDB(new Config(dbPath, false, true, '/'));
    };

    /**
     * @param path 
     * @returns Map
     * getData
     * path에 해당하는 data 를 반환한다.
     */
    async getData(path:string): Promise<any> {        
        let rtnData = new Map<String, undefined>();
        try {
            const formattedPath = path.startsWith('/') ? path : `/${path}`;
            rtnData = await this.db.getData(formattedPath);
        } catch (error) {
            console.log(error);            
        };

        return rtnData;
    };

    /**
     * @param path 
     * @param data 
     * @returns boolean 
     * saveData
     * 데이터를 저장한다.
     */
    async saveData(path: string, data: any): Promise<any> {
        try {
            const formattedPath = path.startsWith('/') ? path : `/${path}`;
            await this.db.push(formattedPath, data, true);
            await this.db.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        };
    };
};