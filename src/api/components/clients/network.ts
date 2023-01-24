import { EPermissions } from '../../../constant/TABLES';
import { NextFunction, Request, Response, Router } from 'express';
import { success } from '../../../network/response';
import Controller from './index';
import secure from '../../../auth/secure';
const router = Router();

//internal Functions
const upsert = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.upsert(req.body).then(response => {
        success({ req, res, message: response })
    }).catch(next)
}

const list = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.list(
        Number(req.params.page),
        String(req.query.text || "")
    ).then(dataList => {
        success({ req, res, message: dataList })
    }).catch(next)
}

const remove = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.remove(Number(req.params.id)).then(response => {
        success({ req, res, message: response })
    }).catch(next)
}

//Routes
router
    .get("/:page", secure(EPermissions.clients), list)
    .delete("/:id", secure(EPermissions.clients), remove)
    .post("/", secure(EPermissions.clients), upsert);

export = router;