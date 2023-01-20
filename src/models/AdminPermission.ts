import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';
import AdminClass from './Admin';
import Permission from './Permission';

const Admin = new AdminClass

const AdminPermission = sequelize.define(ModelsTables.AdminPermissions.model, {
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
    tableName: ModelsTables.AdminPermissions.tableName,
    timestamps: false
})

AdminPermission.hasMany(Admin.model(), {
    foreignKey: "id_user",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Admin.model().belongsTo(AdminPermission, {
    foreignKey: "id_user",
    targetKey: "id"
})

AdminPermission.hasMany(Permission, {
    foreignKey: "id_permission",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Permission.belongsTo(AdminPermission, {
    foreignKey: "id_permission",
    targetKey: "id"
})

export = AdminPermission