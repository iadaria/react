import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class JwtMeddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    next();
  }
}
