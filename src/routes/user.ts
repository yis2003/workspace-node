import { ParentRoute } from "./parentRoute";

/**
 * User
 */
export class User extends  ParentRoute {
    constructor() {
        super('/user');        
    };

    /**
     * registerRoutes
     * override
     * 개별 라우터를 등록한다.
     */
    protected registerRoutes(): void {
        this.route.get('/getUser', this.getUser);
    };

    /**
     * 
     * @param req express.route.request 객체
     * @param res express.route.response 객체
     * getUser
     * /user/getUser 호출
     * 유저의 정보를 반환한다.
     */ 
    // arrow function으로 작성하여 this 바인딩 문제 해결
    private getUser = (req: any, res: any): void => {
        res.send('User Route!');
    };
}