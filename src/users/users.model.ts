import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user-roles.model";

interface CreateUser {
    email: string
    password: string
}
@Table({ tableName: 'users' })
export class User extends Model<User, CreateUser> {
    @ApiProperty({ example: 1 })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "example@email.com" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: "examplepassword!" })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 21 })
    @Column({ type: DataType.INTEGER, allowNull: true })
    age: number;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}