import express from "express";

import { IRouter } from "../interfaces/IRoute";

export abstract class ParentRoute implements IRouter {
    protected route: express.Router;
    private routePath: string;

    constructor(path: string) {
        this.routePath = path;
        this.route = express.Router();        
    };

    //  각 라우터 클래스에서 라우트 설정을 구현하도록 강제
    protected abstract registerRoutes(): void;

    /**
     * init
     * 초기화
     */
    public init(): void {
        this.registerRoutes();
    };

    /**
     * 
     * @param app express 애플리케이션 객체
     * registerToApp
     * 라우트를 등록한다.
     * 
     */
    public registerToApp(app: any): void {
        app.use(this.routePath, this.route);
    };
}