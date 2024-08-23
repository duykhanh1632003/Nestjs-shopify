import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../database/schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModle: Model<UserDocument>;
    ) { }
    
    async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

}