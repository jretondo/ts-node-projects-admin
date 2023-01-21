import { Columns, Restrictions } from './../enums/ETablesDB';
import { IInvoiceItems } from './../interfaces/ITables';
import { Tables } from '../enums/ETablesDB';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import Invoice from './Invoice';

type InvoiceItemCreationAttributes = Optional<IInvoiceItems, 'id'>;

class InvoiceItem extends Model<IInvoiceItems, InvoiceItemCreationAttributes> { }

InvoiceItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    invoice_id: {
        type: DataTypes.INTEGER,
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
    sequelize,
    tableName: Tables.INVOICE_ITEMS,
    timestamps: false
})

InvoiceItem.hasMany(Invoice, {
    foreignKey: Columns.invoices.id,
    sourceKey: Columns.invoiceItems.invoice_id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

Invoice.belongsTo(InvoiceItem, {
    foreignKey: Columns.invoices.id,
    targetKey: Columns.invoiceItems.invoice_id
})

export = InvoiceItem