import { ParentRoute } from "./parentRoute";
import { UserService } from "../services/userService";

/**
 * User
 */
export class User extends ParentRoute {
    private app: any;
    private userService: UserService;

    constructor(app: any) {
        const CLASS_NAME = '/user'
        super(CLASS_NAME);
        this.app = app;
        this.userService = this.app.get('userService');
    };

    /**
     * registerRoutes
     * override
     * 개별 라우터를 등록한다.
     */
    protected registerRoutes(): void {
        this.route.get('/getUser', this.getUser);
        this.route.get('/getUserStatue', this.getUserStatue);
        this.route.post('/updateUser', this.updateUser);
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
    private getUser = async (req: any, res: any): Promise<void> => {
        const resObj = {
            success: 1,
            data: new Object(),
            message: 'success'
        };

        const userId = req.query.id;
        
        try {
            resObj.data = await this.userService.getUserInfo(userId);
            res.json(resObj);
        } catch (error) {
            resObj.success = 0;
            resObj.message = 'get user info fail';
            res.status(500).json(resObj);
        }        
    };

    /**
     * @param req express.route.request 객체
     * @param res express.route.response 객체
     * getUserStatue
     * /user/getUserStatue 호출
     * 유저의 상태 정보를 반환한다.
     */
    private getUserStatue = async (req: any, res: any): Promise<void> => {
        const resObj = {
            success: 1,
            status: 0,
            message: 'success'
        };

        const userId = req.query.id;

        try {
            resObj.status = await this.userService.getUserStatus(userId);
            res.json(resObj);
        } catch (error) {
            resObj.success = 0;
            resObj.message = 'get user status fail';
            res.status(500).json(resObj);
        }      
    };

    /**
     * 
     * @param req express.route.request 객체
     * @param res express.route.response 객체
     * @returns 
     * updateUser
     * /user/updateUser 호출
     * 유저의 정보를 갱신한다.
     */
    private updateUser = async (req: any, res: any): Promise<void> => {
        const resObj = {
            success: 1,
            data: new Object(),
            message: 'success'
        };

        const { id, name, age } = req.body;
        const userData = { id, name, age };

        try {
            resObj.data = await this.userService.saveUserInfo(id, userData);
            res.json(resObj);
        } catch (error) {
            resObj.success = 0;
            resObj.message = 'save user info fail';
            res.status(500).json(resObj);
        }   
    };
}