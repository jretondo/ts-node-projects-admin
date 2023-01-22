import AuthAdmin from '../../../models/AuthAdmin';
import bcrypt from 'bcrypt';
import { passCreator } from '../../../utils/functions/passCreator';
import { sendPass } from '../../../utils/sendEmails/sendPass';
import auth from '../../../auth';
import { IAuth } from '../../../interfaces/Tables';
import Admin from '../../../models/Admin';

export = () => {
    const upsert = async (body: IAuth, email: string) => {
        let newAuth: IAuth;
        if (body.pass) {
            newAuth = {
                user: body.user,
                prov: body.prov,
                pass: await bcrypt.hash(body.pass, 5),
                admin_id: body.admin_id
            };
            return await AuthAdmin.update(newAuth, { where: { admin_id: body.admin_id } });
        } else {
            const newPass = await passCreator();
            newAuth = {
                id: body.id,
                user: body.user,
                prov: 1,
                pass: await bcrypt.hash(newPass, 5),
                admin_id: body.id || 0
            };
            const result = await AuthAdmin.create(newAuth);
            if (result.dataValues.id) {
                return await sendPass(body.user, newPass, email, "Nuevo usuario", true, false);
            } else {
                return false;
            }
        }
    }

    const recPass = async (email: string) => {
        const newPass = await passCreator();
        const userData = await Admin.findAll({ where: { email: email } });
        const idUsu = userData[0].dataValues.id;
        const user = userData[0].dataValues.user;
        const data: IAuth = {
            id: idUsu,
            user: user,
            prov: 1,
            pass: newPass,
            admin_id: idUsu || 0
        };

        return await upsert(data, email);
    }

    const login = async (username: string, password: string) => {
        const data3 = await AuthAdmin.findAll({ where: { user: username } });
        const data2 = await Admin.findAll({ where: { user: username } });
        const userData = data2[0]
        const data = {
            ...data2[0].dataValues,
            ...data3[0].dataValues
        }
        const prov = data.prov
        return bcrypt.compare(password, data.pass || "")
            .then(same => {
                if (same) {
                    return {
                        token: auth.sign(JSON.stringify(data)),
                        userData: userData,
                        provisory: prov
                    }
                } else {
                    throw new Error('información invalida')
                }
            })
    }

    return {
        upsert,
        login,
        recPass
    }
}
