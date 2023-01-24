import { IClients } from './../../../interfaces/Tables';
import Client from '../../../models/Client';
import { Op } from 'sequelize';
import IvaCondition from '../../../models/IvaCondition';

export = () => {
    const upsert = async (client: IClients) => {
        if (client.id) {
            return await Client.update(client, { where: { id: client.id } })
        } else {
            return await Client.create(client)
        }
    }

    const list = async (page: number, text?: string) => {
        const ITEMS_PER_PAGE = 10;

        const offset = ((page || 1) - 1) * (ITEMS_PER_PAGE);
        const { count, rows } = await Client.findAndCountAll({
            where: {
                [Op.or]: [
                    { business_name: { [Op.substring]: text } },
                    { fantasie_name: { [Op.substring]: text } },
                    { document_number: { [Op.substring]: text } },
                    { email: { [Op.substring]: text } }
                ]
            },
            include: IvaCondition,
            offset: offset,
            limit: ITEMS_PER_PAGE
        });
        return {
            totalItems: count,
            itemsPerPage: ITEMS_PER_PAGE,
            items: rows
        }
    }

    const remove = async (idClient: number) => {
        return await Client.destroy({ where: { id: idClient } })
    }

    return {
        upsert,
        list,
        remove
    };
}