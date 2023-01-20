import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';

const Permission = sequelize.define(ModelsTables.Permissions.model, {
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
    tableName: ModelsTables.Permissions.tableName,
    timestamps: false
})

export = Permission