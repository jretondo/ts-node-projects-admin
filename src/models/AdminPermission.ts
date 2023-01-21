import { Columns, Tables, Restrictions } from './../enums/ETablesDB';
import { IUserPermission } from './../interfaces/ITables';
import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../database';
import Admin from './Admin';
import Permission from './Permission';

type UserPermissionCreationAttributes = Optional<IUserPermission, 'id'>;

class AdminPermission extends Model<IUserPermission, UserPermissionCreationAttributes> { }

AdminPermission.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    id_permission: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    tableName: Tables.USER_PERMISSIONS,
    timestamps: false
})

AdminPermission.hasMany(Admin, {
    foreignKey: Columns.userPermissions.id_permission,
    sourceKey: Columns.admin.id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Admin.belongsTo(AdminPermission, {
    foreignKey: Columns.userPermissions.id_permission,
    targetKey: Columns.admin.id
})

AdminPermission.hasMany(Permission, {
    foreignKey: Columns.userPermissions.id_permission,
    sourceKey: Columns.permissions.id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Permission.belongsTo(AdminPermission, {
    foreignKey: Columns.userPermissions.id_permission,
    targetKey: Columns.permissions.id
})

export = AdminPermission