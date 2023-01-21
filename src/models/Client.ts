import { Tables, Columns, Restrictions } from './../enums/ETablesDB';
import { IClients } from './../interfaces/ITables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import IvaCondition from './IvaCondition';

type ClientCreationAttributes = Optional<IClients, 'id'>;

class Client extends Model<IClients, ClientCreationAttributes> { }

Client.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    document_type: {
        type: DataTypes.INTEGER
    },
    document_number: {
        type: DataTypes.STRING
    },
    business_name: {
        type: DataTypes.STRING
    },
    fantasie_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    iva_condition_id: {
        type: DataTypes.INTEGER
    }

}, {
    sequelize,
    tableName: Tables.CLIENTS,
    timestamps: false
})

Client.hasMany(IvaCondition, {
    foreignKey: Columns.clients.iva_condition_id,
    sourceKey: Columns.ivaConditions.id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

IvaCondition.belongsTo(Client, {
    foreignKey: Columns.clients.iva_condition_id,
    targetKey: Columns.ivaConditions.id
})

export = Client