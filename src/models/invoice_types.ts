import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';

const InvoiceType = sequelize.define(ModelsTables.InvoiceTypes.model, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(120)
    },
    letter: {
        type: DataTypes.STRING(10)
    }
}, {
    tableName: ModelsTables.InvoiceTypes.tableName,
    timestamps: false
})

export = InvoiceType