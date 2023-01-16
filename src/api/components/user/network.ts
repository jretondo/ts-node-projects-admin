import { EPermissions } from '../../../enums/ETablesDB';
import { Router, NextFunction, Response, Request } from 'express';
import { success } from '../../../network/response';
const router = Router();
import Controller from './index';
import secure from '../../../auth/secure';

const list = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.list(undefined, req.body.query)
        .then((list: any) => {
            success({
                req,
                res,
                status: 200,
                message: list
            });
        })
        .catch(next)
};

const listPagination = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.list(
        Number(req.params.page),
        String(req.query.query ? req.query.query : ""),
        Number(req.query.cantPerPage),
        Number(req.body.user.id)
    )
        .then((list: any) => {
            success({
                req,
                res,
                status: 200,
                message: list
            });
        })
        .catch(next)
};

const upsert = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.upsert(req.body)
        .then(response => {
            if (response) {
                success({
                    req,
                    res,
                    status: 201
                });
            } else {
                next(response);
            }
        })
        .catch(next)
}

const remove = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.remove(Number(req.params.id))
        .then(() => {
            success({ req, res });
        })
        .catch(next)
}

const get = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.getUser(Number(req.params.id))
        .then((data) => {
            success({ req, res, message: data });
        })
        .catch(next)
}

const myDataUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Controller.getUser(req.body.user.id)
        .then((data) => {
            success({ req, res, message: data });
        })
        .catch(next)
}

router
    .get("/details/:id", secure(EPermissions.userAdmin), get)
    .get("/mydata", secure(), myDataUser)
    .get("/:page", secure(EPermissions.userAdmin), listPagination)
    .get("/", secure(EPermissions.userAdmin), list)
    .post("/", secure(EPermissions.userAdmin), upsert)
    .put("/", secure(EPermissions.userAdmin), upsert)
    .delete("/:id", secure(EPermissions.userAdmin), remove);

export = router;