import { UserDAO } from '../dao/userDAO';
import { UserDTO } from '../dto/userDTO';

describe('UserDAO 테스트', () => {
    let userDAO: UserDAO;
    const testKey = 'yis4755';
    const testData = { id: 1, name: '양인석', age: 37 };

    beforeEach(async () => {
        // 매 테스트마다 새로운 DAO 생성
        userDAO = new UserDAO('/user');
        if (!userDAO.hasUserData(testKey)) 
            await userDAO.saveDataToDB(testKey, testData);        
    });

    test('데이터를 조회하면 UserDTO 형태로 반환되어야 한다', async () => {
        const key = 'yis4755';
        const userDTO = await userDAO.getDataToDB(key);

        expect(userDTO).toBeInstanceOf(UserDTO);
        expect(userDTO.name).toBe('양인석');
    });

    test('이미 조회한 데이터는 캐시(Map)에서 가져와야 한다', async () => {
        const key = 'yis4755';
        
        // 첫 번째 호출 (DB 접근)
        await userDAO.getDataToDB(key);
        expect(userDAO.hasUserData(key)).toBe(true);

        // 두 번째 호출 (캐시 확인)
        const cachedData = await userDAO.getDataToDB(key);
        expect(cachedData).toBeInstanceOf(UserDTO);
    });


});