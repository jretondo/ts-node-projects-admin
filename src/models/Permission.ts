import { IPermission } from '../interfaces/Tables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import { Tables } from '../constant/TABLES';

type PermissionTypeCreationAttributes = Optional<IPermission, 'id'>;

class Permission extends Model<IPermission, PermissionTypeCreationAttributes> { }

Permission.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    module_name: {
        type: DataTypes.STRING(200)
    }
}, {
    sequelize,
    tableName: Tables.PERMISSIONS,
    timestamps: false
})

Permission.sync({ force: false })

export = Permission