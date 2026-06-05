import express from 'express';

import expressConfig from './config/express.config.json';

import { Index } from './routes/index';

const app = express();

// Express 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 메인 라우트 사용
const index = new Index(); // 인스턴스 생성!
index.registerToApp(app);

// 서버 구동    
app.listen(expressConfig.port, () => {
    console.log(`Server is running on port ${expressConfig.port}`);
});