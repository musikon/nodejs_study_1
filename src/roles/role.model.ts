import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface CreateRole {
    value: string
}
@Table({ tableName: 'roles' })
export class Role extends Model<Role, CreateRole> {
    @ApiProperty({ example: 1 })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "Admin" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}