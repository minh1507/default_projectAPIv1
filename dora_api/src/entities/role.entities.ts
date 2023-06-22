import { Table, Model, Column, DataType, HasOne } from "sequelize-typescript";
import { Optional } from "sequelize";
import { User } from "./user.entities.ts";

interface RoleAttributes {
  id: number;
  name: string;
  note: string;
  status: number;
  createDate: Date;
  createBy: number;
  updateDate: Date;
  updateBy: number;
}
interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}
type UserType = typeof User
@Table({
  timestamps: false,
  tableName: "dm_roles",
})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @HasOne(() => User, "roleId")
  user!: UserType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  note!: string;

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
