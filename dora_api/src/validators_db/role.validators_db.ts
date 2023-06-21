import { Role } from "../entities/role.entities.ts";

export const findRoleById = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Role.findOne({where: {id:id, status:1}})
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };