// UserService 테스트를 위한 전략
import { UserDTO } from '../dto/userDTO';
import { UserService } from '../services/userService';
import axios from 'axios';

// 1. axios를 모킹하여 실제 네트워크 통신 방지
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserService 테스트', () => {
    test('getUserStatus는 외부 API 호출 결과값을 반환해야 한다', async () => {
        // 1. 먼저 생성!
        const service = new UserService('test_service'); 
        
        // 2. 이제 호출!
        const mockUserDTO = new UserDTO({ id: 1, name: '테스트', age: 20 });
        jest.spyOn(service['userDAO'], 'getDataToDB').mockResolvedValue(mockUserDTO);

        mockedAxios.get.mockResolvedValue({ data: { status: 1 } });
        
        const status = await service.getUserStatus('yis4755');
        expect(status).toBe(1);
    });
});