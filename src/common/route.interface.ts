import {
  Router, Request, Response, NextFunction,
} from 'express';

export interface IControllerRoute {
  /** путь, который биндим */
  path: string;
  /** исполняемая функция */
  func: (req: Request<any>, res: Response, next: NextFunction) => void;
  /** HTTP метод */
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
}

export type ExpressReturnType = Response<any, Record<string, any>>;
