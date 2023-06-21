import { Address } from '../entities/address.entities.ts';

export const findAddressById = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Address.findOne({where: {id:id,status:1}})
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };