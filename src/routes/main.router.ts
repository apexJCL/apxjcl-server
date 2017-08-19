import RootRouter from './root.route';
import AuthRouter from './auth.route';
import { PathConfiguration } from '../types/definitions';

export const Router: Array<PathConfiguration> = [
    RootRouter,
    AuthRouter
];