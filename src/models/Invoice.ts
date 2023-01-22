import { Columns, Tables, Restrictions } from '../constant/TABLES';
import { IInvoice } from '../interfaces/Tables';
import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../database';
import SalePoint from './SalePoint';
import InvoiceType from './InvoiceTypes';
import Admin from './Admin';

type InvoiceCreationAttributes = Optional<IInvoice, 'id'>;

class Invoice extends Model<IInvoice, InvoiceCreationAttributes> { }

Invoice.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    created_time: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW
    },
    date: {
        type: DataTypes.DATE
    },
    sale_point_id: {
        type: DataTypes.INTEGER
    },
    type_id: {
        type: DataTypes.INTEGER
    },
    cae: {
        type: DataTypes.STRING(100)
    },
    cae_expiration: {
        type: DataTypes.DATE
    },
    client_id: {
        type: DataTypes.INTEGER,
    },
    canceled_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    observations: {
        type: DataTypes.TEXT("long")
    }
}, {
    sequelize,
    tableName: Tables.INVOICES,
    timestamps: false
})

Invoice.hasMany(SalePoint, {
    foreignKey: Columns.salePoints.id,
    sourceKey: Columns.invoices.sale_point_id,
    onDelete: Restrictions.RESTRICT,
    onUpdate: Restrictions.RESTRICT
})

SalePoint.belongsTo(Invoice, {
    foreignKey: Columns.salePoints.id,
    targetKey: Columns.invoices.sale_point_id
})

Invoice.hasMany(InvoiceType, {
    foreignKey: Columns.invoiceTypes.id,
    sourceKey: Columns.invoices.type_id,
    onDelete: Restrictions.RESTRICT,
    onUpdate: Restrictions.RESTRICT
})

InvoiceType.belongsTo(Invoice, {
    foreignKey: Columns.invoiceTypes.id,
    targetKey: Columns.invoices.type_id
})

Invoice.hasMany(Admin, {
    foreignKey: Columns.admin.id,
    sourceKey: Columns.invoices.user_id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.CASCADE
})

Admin.belongsTo(Invoice, {
    foreignKey: Columns.admin.id,
    targetKey: Columns.invoices.user_id
})

Invoice.sync({ force: false })

export = Invoice