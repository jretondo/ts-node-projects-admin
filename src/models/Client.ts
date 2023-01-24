import { Tables, Columns, Restrictions } from '../constant/TABLES';
import { IClients } from '../interfaces/Tables';
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
    foreignKey: Columns.ivaConditions.id,
    sourceKey: Columns.clients.iva_condition_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

IvaCondition.belongsTo(Client, {
    foreignKey: Columns.ivaConditions.id,
    targetKey: Columns.clients.iva_condition_id
})

Client.sync({ force: false })

export = Client