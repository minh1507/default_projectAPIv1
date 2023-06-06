import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Role } from "./role.entities.ts";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  roleId: number;
  accessToken: string;
  refreshToken: string;
  status: number;
  createDate: Date;
  createBy: number;
  updateDate: Date;
  updateBy: number;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
type RoleType = typeof Role;

@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  accessToken!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  refreshToken!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status!: number 

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

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId!: number;

  @BelongsTo(() => Role, "roleId")
  role!: RoleType;
}
