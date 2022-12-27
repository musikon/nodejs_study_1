import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";
import {Model} from "mongoose";
import {CreateUserDto, UpdateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createCatDto: CreateUserDto): Promise<User> {
        const createUser = new this.userModel(createCatDto);
        return createUser.save();
    }


    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
