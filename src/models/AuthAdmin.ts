import { Columns, Tables, Restrictions } from './../enums/ETablesDB';
import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../database';
import Admin from './Admin';
import { IAuth } from '../interfaces/ITables';

type IAuthCreationAttributes = Optional<IAuth, 'id'>;

class AuthAdmin extends Model<IAuth, IAuthCreationAttributes> { }

AuthAdmin.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user: {
        type: DataTypes.STRING(100)
    },
    pass: {
        type: DataTypes.STRING(250)
    },
    prov: {
        type: DataTypes.BOOLEAN
    },
    admin_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    tableName: Tables.AUTH_ADMIN,
    timestamps: false
})

AuthAdmin.hasOne(Admin, {
    foreignKey: Columns.admin.id,
    sourceKey: Columns.authAdmin.admin_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Admin.belongsTo(AuthAdmin, {
    foreignKey: Columns.admin.id,
    targetKey: Columns.authAdmin.admin_id
})

export = AuthAdmin