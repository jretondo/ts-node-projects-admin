import { Op } from 'sequelize';
import { INewUser } from '../../../interfaces/IRequests';
import { IAuth, IUser } from 'interfaces/ITables';
import { Tables } from '../../../enums/ETablesDB';
import StoreType from '../../../store/mysql';
import AuthController from '../auth/index';
import Admin from '../../../models/Admin';
import Client from '../../../models/Client';

export = (injectedStore: typeof StoreType) => {
    let store = injectedStore;

    const list = async (page?: number, item?: string, itemsPerPage?: number) => {

        if (page) {
            const offset = ((page || 1) - 1) * (itemsPerPage || 10)

            const { count, rows } = await Admin.findAndCountAll({
                where: {
                    [Op.and]: {
                        [Op.or]: [
                            { lastname: item },
                            { email: item },
                            { name: item },
                            { user: item },
                            { phone: item }
                        ],
                        admin: true
                    }
                },
                offset: offset,
                limit: itemsPerPage || 10
            })

            return {
                count: count,
                itemsPerPage: itemsPerPage || 10,
                items: rows
            }
        } else {
            const rows = await Admin.findAll({
                where: {
                    [Op.or]: [
                        { lastname: item },
                        { email: item },
                        { name: item },
                        { user: item },
                        { phone: item }
                    ]
                }
            })

            return {
                count: 0,
                itemsPerPage: 0,
                items: rows
            }
        }
    }

    const upsert = async (body: INewUser) => {

        const user: IUser = {
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            user: body.userName,
            phone: body.phone,
            admin: false
        }

        if (body.id) {
            return await store.update(Tables.ADMIN, user, body.id);
        } else {
            const result = await store.insert(Tables.ADMIN, user);
            const newAuth: IAuth = {
                id: result.insertId,
                user: user.user,
                prov: 1,
                admin_id: result.insertId
            }
            return await AuthController.upsert(newAuth, body.email);
        }
    }

    const remove = async (idUser: number) => {
        await store.remove(Tables.ADMIN, { id: idUser })
            .then(async (result: any) => {
                if (result.affectedRows === 0) {
                    throw new Error();
                }
            })
    }

    const getUser = async (idUser: number) => {

        return await Admin.findByPk(idUser)
    }

    return {
        list,
        upsert,
        remove,
        getUser
    }
}
