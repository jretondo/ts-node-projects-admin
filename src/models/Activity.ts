import { ModelsTables } from '../enums/EModels';
import { DataTypes } from 'sequelize';
import sequelize from '../database';
import AdminClass from './Admin';

const Admin = new AdminClass

const Activity = sequelize.define(ModelsTables.Activities.model, {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    activity_description: {
        type: DataTypes.TEXT("long")
    }
}, {
    tableName: ModelsTables.Activities.tableName,
    timestamps: false
})

Activity.hasMany(Admin.model(), {
    foreignKey: "id",
    sourceKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Admin.model().belongsTo(Activity, {
    foreignKey: "id",
    targetKey: "user_id"
})

export = Activity