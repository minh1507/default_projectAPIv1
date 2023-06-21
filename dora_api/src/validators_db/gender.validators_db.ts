import { Gender } from "../entities/gender.entities.ts";

export const findGenderById = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Gender.findOne({where: {id:id, status:1}})
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };