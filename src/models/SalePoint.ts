import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';
import IvaCondition from './IvaCondition';

const SalePoint = sequelize.define(ModelsTables.SalePoints.model, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    business_number: {
        type: DataTypes.STRING(20)
    },
    business_name: {
        type: DataTypes.STRING(100)
    },
    sale_point_number: {
        type: DataTypes.INTEGER
    },
    iva_condition_id: {
        type: DataTypes.INTEGER
    },
    logo_name: {
        type: DataTypes.STRING(150)
    },
    activities_start: {
        type: DataTypes.DATE
    },
    email: {
        type: DataTypes.STRING(150)
    },
    address: {
        type: DataTypes.STRING(150)
    }
}, {
    tableName: ModelsTables.SalePoints.tableName,
    timestamps: false
})

SalePoint.hasMany(IvaCondition, {
    foreignKey: "iva_condition_id",
    sourceKey: "id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

IvaCondition.belongsTo(SalePoint, {
    foreignKey: "iva_condition_id",
    targetKey: "id"
})

export = SalePoint