import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';
import SalePoint from './SalePoint';
import InvoiceType from './invoice_types';
import AdminClass from './Admin';

const Admin = new AdminClass

const Invoice = sequelize.define(ModelsTables.Invoices.model, {
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
        references: {
            model: ModelsTables.Clients.model,
            key: "id"
        }
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
    tableName: ModelsTables.Invoices.tableName,
    timestamps: false
})

Invoice.hasMany(SalePoint, {
    foreignKey: "sale_point_id",
    sourceKey: "id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
})

SalePoint.belongsTo(Invoice, {
    foreignKey: "sale_point_id",
    targetKey: "id"
})

Invoice.hasMany(InvoiceType, {
    foreignKey: "type_id",
    sourceKey: "id",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
})

InvoiceType.belongsTo(Invoice, {
    foreignKey: "type_id",
    targetKey: "id"
})

Invoice.hasMany(Admin.model(), {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})

Admin.model().belongsTo(Invoice, {
    foreignKey: "user_id",
    targetKey: "id"
})

export = Invoice