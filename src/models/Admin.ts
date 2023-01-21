import { Tables } from '../enums/ETablesDB';
import { IUser } from '../interfaces/ITables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

type UserCreationAttributes = Optional<IUser, 'id'>;

class Admin extends Model<IUser, UserCreationAttributes> { }

Admin.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    user: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    tableName: Tables.ADMIN,
    timestamps: false
})


export = Admin