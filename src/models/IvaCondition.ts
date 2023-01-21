import { IIvaConditions } from '../interfaces/ITables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import { Tables } from '../enums/ETablesDB';

type IvaConditionTypeCreationAttributes = Optional<IIvaConditions, 'id'>;

class IvaCondition extends Model<IIvaConditions, IvaConditionTypeCreationAttributes> { }

IvaCondition.init({
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
    sequelize,
    tableName: Tables.IVA_CONDITIONS,
    timestamps: false
})

export = IvaCondition