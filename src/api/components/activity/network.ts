import { EPermissions } from '../../../constant/TABLES';
import { NextFunction, Request, Response, Router } from 'express';
import { success } from '../../../network/response';
import Controller from './index';
import secure from '../../../auth/secure';
import moment from 'moment';
const router = Router();

//internal Functions
const upsert = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.upsert(req.body.user, req.body.activityDescription).then(response => {
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
        Number(req.query.userId),
        String(req.query.dateFrom),
        String(req.query.dateTo)
    ).then(dataList => {
        success({ req, res, message: dataList })
    }).catch(next)
}

//Routes
router
    .get("/:page", secure(EPermissions.userAdmin), list)
    .post("/", secure(), upsert);

export = router;