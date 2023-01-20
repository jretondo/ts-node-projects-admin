import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';
import AdminClass from './Admin';

const Admin = new AdminClass

const AuthAdmin = sequelize.define(ModelsTables.AuthAdmins.model, {
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
    tableName: ModelsTables.AuthAdmins.tableName,
    timestamps: false
})

AuthAdmin.hasOne(Admin.model(), {
    foreignKey: "id",
    sourceKey: "admin_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Admin.model().belongsTo(AuthAdmin, {
    foreignKey: "id",
    targetKey: "admin_id"
})

export = AuthAdmin