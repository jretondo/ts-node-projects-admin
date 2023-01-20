import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';

const IvaCondition = sequelize.define(ModelsTables.IvaConditions.model, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: ModelsTables.IvaConditions.tableName,
    timestamps: false
})

export = IvaCondition