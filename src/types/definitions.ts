import { Router } from 'express';

export interface PathConfiguration {
    path: string
    router: Router
}