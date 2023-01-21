import { Columns, Tables, Restrictions } from './../enums/ETablesDB';
import { ISalePoints } from '../interfaces/ITables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import IvaCondition from './IvaCondition';

type SalePointsTypeCreationAttributes = Optional<ISalePoints, 'id'>;

class SalePoint extends Model<ISalePoints, SalePointsTypeCreationAttributes> { }

SalePoint.init({
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
    sequelize,
    tableName: Tables.SALE_POINTS,
    timestamps: false
})

SalePoint.hasMany(IvaCondition, {
    foreignKey: Columns.ivaConditions.id,
    sourceKey: Columns.salePoints.iva_condition_id,
    onDelete: Restrictions.RESTRICT,
    onUpdate: Restrictions.CASCADE
})

IvaCondition.belongsTo(SalePoint, {
    foreignKey: Columns.ivaConditions.id,
    targetKey: Columns.salePoints.iva_condition_id
})

export = SalePoint