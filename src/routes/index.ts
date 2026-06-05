import fs from "fs";
import path from "path";

// tsc 컴파일 시 명시되지 않는 파일들을 명시적으로 import 하여 컴파일 대상에 포함시킴
import './user';
import './parentRoute';

export class Index {
    private routers: any[] = [];

    constructor() {
        this.registerRouters();
    }

    /**
     * registerRouters
     * routes 폴더 내의 *.ts 파일을 읽어 인스턴스를 생성하여, routers 배열에 저장한다.
     */
    private registerRouters(): void {
        const fileExtension = __filename.endsWith('.ts') ? '.ts' : '.js';
        const routesDir = path.join(__dirname, '../routes');
        const routerFiles = fs.readdirSync(routesDir).filter(file => file.endsWith(fileExtension) && file !== `index${fileExtension}`);
        routerFiles.forEach(file => {
            const routerModule = require(`./${file}`);
            const routerClass = Object.values(routerModule)[0] as any;  // 모듈에서 첫 번째 클래스를 가져옴 / 하나의 route 파일에는 하나의 class만 존재.
            const routerInstance = new routerClass();                   // 인스턴스 생성
            
            if (routerInstance.constructor.name === 'ParentRoute')      // 추상 클래스인 ParentRoute는 init 를 실행하지 않는다.
                return;
                    
            this.routers.push(routerInstance);                          // 인스턴스를 배열에 저장
            routerInstance.init();                                      // 라우트 초기화            
        });
    };

    /**
     * 
     * @param app express 애플리케이션 객체
     * registerToApp
     * route를 등록한다.
     */
    public registerToApp(app: any): void {
        this.routers.forEach(router => {
            router.registerToApp(app);
        });
    }
}