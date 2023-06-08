import { Role } from "../entities/role.entities.ts";

export const findById = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Role.findOne({where: {id:id}})
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };