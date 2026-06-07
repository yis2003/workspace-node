import express from 'express';

import expressConfig from './config/express.config.json';

import { Index } from './routes/index';

import { DBConnector } from './components/dbConnector.nodeJsonDB';

import { UserDAO } from './dao/userDAO';
import { UserService } from './services/userService';
import { User } from './routes/user';

const app = express();

// Express 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User 관련 설정 

const userDB = new DBConnector('/user');
const userDAO = new UserDAO(userDB);
const userService = new UserService(userDAO);

//  서비스 set
app.set('userService', userService);


// 메인 라우트 사용
const index = new Index(app);   // 인스턴스 생성!
index.registerToApp(app);

// 서버 구동    
app.listen(expressConfig.port, () => {
    console.log(`Server is running on port ${expressConfig.port}`);
});