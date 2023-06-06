import { Table, Model, Column, DataType } from "sequelize-typescript";
import { Optional } from "sequelize";

interface CatAttributes {
  id: number;
  name: string;
  fileUrl: string;
  age: number;
  status: number;
  createDate: Date;
  createBy: number;
  updateDate: Date;
  updateBy: number;
}
interface CatCreationAttributes extends Optional<CatAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "cats",
})
export class Cat extends Model<CatAttributes, CatCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  age!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  fileUrl!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createDate!: Date 

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updateDate!: Date 

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  createBy!: number; 

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updateBy!: number; 
}
