import { Columns, Tables, Restrictions } from '../constant/TABLES';
import { IUserPermission } from '../interfaces/Tables';
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
    foreignKey: Columns.admin.id,
    sourceKey: Columns.userPermissions.id_permission,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Admin.belongsTo(AdminPermission, {
    foreignKey: Columns.admin.id,
    targetKey: Columns.userPermissions.id_permission
})

AdminPermission.hasMany(Permission, {
    foreignKey: Columns.permissions.id,
    sourceKey: Columns.userPermissions.id_permission,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Permission.belongsTo(AdminPermission, {
    foreignKey: Columns.permissions.id,
    targetKey: Columns.userPermissions.id_permission
})

AdminPermission.sync({ force: false })

export = AdminPermission