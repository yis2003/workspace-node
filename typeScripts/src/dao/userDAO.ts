import { IDBConnector } from '../interfaces/IDBConnector'
import { UserDTO } from '../dto/userDTO';

/**
 * 유저 DAO 클래스
 */
export class UserDAO {
    private dbConnector: IDBConnector;
    private userDataMap: Map<string, any>;
    
    constructor(dbConnector: IDBConnector) {
        this.dbConnector = dbConnector;
        this.userDataMap = new Map();        
    };

    /**
     * @param id 
     * @returns 
     * hasUserData
     * key에 해당하는 유저가 캐싱되어 있는지 확인한다.
     */
    public hasUserData(id: string) {
        return this.userDataMap.has(id);
    };

    /**
     * @param key 
     * @returns 
     * getDataToDB
     * key에 해당하는 유저의 정보를 반환한다.
     * 
     */
    public async getDataToDB(id: string): Promise<UserDTO> {
        if (!!this.hasUserData(id))
            return this.userDataMap.get(id);

        const userDTO = new UserDTO(await this.dbConnector.getData(id));
        this.userDataMap.set(id, userDTO);
        return userDTO;
    };

    /**
     * @param key 
     * @param data 
     * @returns 
     * saveDataToDB
     * key에 해당하는 유저의 data를 저장한다.
     */
    public async saveDataToDB(id: string, data: any): Promise<UserDTO> {
        const isSuccess = await this.dbConnector.saveData(id, data);
        if (!isSuccess)
            throw Error('FAIL SAVE USER DATA!!');

        const userDTO = new UserDTO(data);
        //const newUser = new UserDTO({ ...user, name: "인석" });
        this.userDataMap.set(userDTO.id, userDTO);
        return userDTO;        
    };
};