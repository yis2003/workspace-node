import axios from 'axios';

import { UserDAO } from '../dao/userDAO';
import { UserDTO } from '../dto/userDTO';

/**
 * user Service 클래스
 */
export class UserService {
    private userDAO: UserDAO;
    
    constructor(userDAO: UserDAO) {
        this.userDAO = userDAO;
    };

    /**
     * @param id 
     * @returns 
     * getUserInfo
     * key에 해당하는 유저 정보를 가져온다.
     *  1차 캐싱된 데이터
     *  2차 DB
     */
    public async getUserInfo(id: string): Promise<UserDTO> {
        return await this.userDAO.getDataToDB(id);
    };

    /**
     * @param id 
     * @returns 
     * getUserStatus
     * key에 해당하는 유저의 상태 정보를 가져온다. (외부 통신)
     */
    public async getUserStatus(id: string): Promise<number> {
        const userInfo = await this.getUserInfo(id);

        try {
            const response = await axios.get(`https://api.example.com/status/${userInfo.id}`);
            return response.data.status;
        } catch (error) {
            console.log(error)
            return 0;
        };
    };

    /**
     * @param id 
     * @param data 
     * @returns 
     * saveUserInfo
     * key에 해당하는 유저의 데이터를 저장(갱신) 한다.
     */
    public async saveUserInfo(id: string, data: any): Promise<UserDTO> {
        return await this.userDAO.saveDataToDB(id, data);
    };
};