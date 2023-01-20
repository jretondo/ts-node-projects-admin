import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';
import IvaCondition from './IvaCondition';

const Client = sequelize.define(ModelsTables.Clients.model, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    document_type: {
        type: DataTypes.INTEGER
    },
    document_number: {
        type: DataTypes.STRING(20)
    },
    business_name: {
        type: DataTypes.STRING(150)
    },
    fantasie_name: {
        type: DataTypes.STRING(100)
    },
    email: {
        type: DataTypes.STRING
    },
    iva_condition_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: ModelsTables.Clients.tableName,
    timestamps: false
})

Client.hasMany(IvaCondition, {
    foreignKey: "iva_condition_id",
    sourceKey: "id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

IvaCondition.belongsTo(Client, {
    foreignKey: "iva_condition_id",
    targetKey: "id"
})

export = Client