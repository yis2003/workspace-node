import express from 'express';

/**
 * IRouter
 * 라우터 인터페이스
 */
export interface IRouter {
    registerToApp(app: express.Application): void;
}