import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';
import Invoice from './Invoice';

const InvoiceItem = sequelize.define(ModelsTables.InvoiceItems.model, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ModelsTables.Invoices.model,
            key: "id"
        }
    },
    detail: {
        type: DataTypes.STRING(250)
    },
    net_amount: {
        type: DataTypes.DOUBLE
    },
    taxes_amount: {
        type: DataTypes.DOUBLE
    },
    discount_amount: {
        type: DataTypes.DOUBLE
    }
}, {
    tableName: ModelsTables.InvoiceItems.tableName,
    timestamps: false
})

InvoiceItem.hasMany(Invoice, {
    foreignKey: "invoice_id",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Invoice.belongsTo(InvoiceItem, {
    foreignKey: "invoice_id",
    targetKey: "id"
})

export = InvoiceItem