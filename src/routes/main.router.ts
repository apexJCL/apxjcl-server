import RootRouter from './root.route';
import APIRouter from './api.router';
import EntryRouter from './entry.route';
import { PathConfiguration } from '../types/definitions';

export const Router: Array<PathConfiguration> = [
    RootRouter,
    APIRouter,
    EntryRouter
];