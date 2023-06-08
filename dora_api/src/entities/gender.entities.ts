import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo, HasOne,
  } from "sequelize-typescript";
  import { Optional } from "sequelize";
import { User } from "./user.entities.ts";
  
  interface GenderAttributes {
    id: number;
    name: string;
    status: number;
    createDate: Date;
    createBy: number;
    updateDate: Date;
    updateBy: number;
  }
  interface GenderCreationAttributes extends Optional<GenderAttributes, "id"> {}
  type UserType = typeof User

  @Table({
    timestamps: false,
    tableName: "genders",
  })
  export class Gender extends Model<GenderAttributes, GenderCreationAttributes> {
    @HasOne(() => User, "genderId")
    user!: UserType;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string;
  
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
  }
  