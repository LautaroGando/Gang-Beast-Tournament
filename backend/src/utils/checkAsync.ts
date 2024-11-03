import { NextFunction, Request, Response } from "express";

type TAsyncController = (req: Request, res: Response) => Promise<void>;

const checkAsync = (controller: TAsyncController) => {

    return (req: Request, res: Response, next: NextFunction) => controller(req, res).catch((err: any) => next(err))

};

export default checkAsync;