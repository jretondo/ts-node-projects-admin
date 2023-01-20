import { INewUser } from '../../../interfaces/IRequests';
import { IAuth, IUser } from 'interfaces/ITables';
import { Tables } from '../../../enums/ETablesDB';
import StoreType from '../../../store/mysql';
import AuthController from '../auth/index';
import AdminClass from '../../../models/Admin';

export = (injectedStore: typeof StoreType) => {
    let store = injectedStore;
    const Admin = new AdminClass

    const list = async (page?: number, item?: string, itemsPerPage?: number) => {

        const dataAdmin = await Admin.getAdmins(item, page, itemsPerPage)

        return {
            data: dataAdmin
        };
    }

    const upsert = async (body: INewUser) => {

        const user: IUser = {
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            user: body.userName,
            phone: body.phone
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
        return Admin.getAdmin(idUser)
    }

    const getLast = () => {
        return Admin.getState()
    }

    return {
        list,
        upsert,
        remove,
        getUser
    }
}
