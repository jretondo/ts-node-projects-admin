import { Op } from 'sequelize';
import { INewPermissions } from '../../../interfaces/Others';
import AdminPermission from '../../../models/AdminPermission';
import { IUserPermission } from '../../../interfaces/Tables';
import Permission from '../../../models/Permission';

export = () => {
    const upsert = async (body: INewPermissions) => {
        if (body.permissions.length > 0) {
            await AdminPermission.destroy({ where: { id_user: body.idUser } })

            const permissions: Array<IUserPermission> =
                body.permissions.map((item) => {
                    return {
                        id_permission: item.idPermission,
                        id_user: body.idUser
                    }
                })

            return await AdminPermission.bulkCreate(permissions);
        } else {
            await AdminPermission.destroy({ where: { id_user: body.idUser } })
        }
    }

    const getPermission = async (idUser: number, idPermission: number) => {
        return await AdminPermission.findAll({
            where: {
                [Op.and]:
                    [
                        { id_permission: idPermission },
                        { id_user: idUser }
                    ]
            }
        })
    }

    const get2 = async (idUser: number) => {
        const allPermissions = await Permission.findAll();

        const userPermissions = await AdminPermission.findAll({
            where: {
                id_user: idUser
            },
            include: Permission
        });

        const permissions: Array<any> = await new Promise((resolve, reject) => {
            const list: Array<any> = [];
            allPermissions.map((item: any, key: number) => {
                const PERMISSION_ID = item.id
                const found = userPermissions.find((element: any) => element.id_permission === PERMISSION_ID)
                if (!found) {
                    list.push(item);
                }
                if (key === allPermissions.length - 1) {
                    resolve(list);
                }
            });
        })

        return {
            userPermissions,
            permissions
        };
    }

    const get = async (idUser: number) => {
        return await AdminPermission.findAll({ where: { id_user: idUser } });
    }

    const getPermissions = async () => {
        return await Permission.findAll()
    }

    return {
        upsert,
        getPermission,
        get,
        get2,
        getPermissions
    };
}