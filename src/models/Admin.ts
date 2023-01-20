import { IUser } from 'interfaces/ITables';
import { ModelsTables } from '../enums/EModels';
import { DataTypes, Op } from 'sequelize';
import sequelize from '../database';

const Admin = sequelize.define(ModelsTables.Admins.model, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    user: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: ModelsTables.Admins.tableName,
    timestamps: false
})

class AdminClass {
    admin: IUser;
    constructor() {
        this.admin = {
            id: 0,
            user: "",
            name: "",
            lastname: "",
            email: "",
            phone: ""
        }
    }

    async createAdmin(
        user: string,
        name: string,
        lastname: string,
        email: string,
        phone?: string
    ) {
        this.admin = {
            user: user,
            name: name,
            lastname: lastname,
            email: email,
            phone: phone || ""
        }
        return await Admin.create({
            user: this.admin.user,
            name: this.admin.name,
            lastname: this.admin.lastname,
            email: this.admin.email,
            phone: this.admin.phone
        })
    }

    async getAdmin(id: number): (Promise<IUser | any>) {
        return await Admin.findByPk(id)
    }

    async getAdmins(item?: string, page?: number, itemsPerPage?: number):
        (Promise<
            {
                count: number,
                itemsPerPage: number,
                items: Array<IUser> | any
            }>) {
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

    getState() {
        return this.admin
    }

    model() {
        return Admin
    }
}

export = AdminClass