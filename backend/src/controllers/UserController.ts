// import { IUser, UserModel, IChainAddress } from "../models/User";
// import { IFollower, FollowerModel } from "../models/Follower";
// import mongoose from "mongoose";

// class UserController {

//     async getUser(alias: string): Promise<IUser> {
//         const user = await UserModel.findOne({alias});
//         return user;
//     }

//     async createUser(userRequest: IUser): Promise<IUser> {
//         const user = new UserModel(userRequest);
//         const result = await user.save();
//         return result;
//     }

//     async updateUser(userRequest: IUser): Promise<IUser> {
//         const updatedUser = await UserModel.findOneAndUpdate({alias: userRequest.alias}, userRequest, {new: true});
//         return updatedUser;
//     }

//     async listUser(): Promise<IUser[]> {
//         const users = await UserModel.find();
//         return users;
//     }

//     async startFollowing(followRequest: IFollower) {
//         const follow = new FollowerModel(followRequest);
//         const result = await follow.save();
//         return result;
//     }

//     async stopFollowing(followRequest: IFollower) {
//         await FollowerModel.findOneAndDelete(followRequest);
//         return true;
//     }

//     async getFollowers(userId: string): Promise<IFollower[]> {
//         const followers = await FollowerModel.find({following: userId}).populate('follower');
//         return followers;
//     }

//     async getFollowing(userId: string): Promise<IFollower[]> {
//         const following = await FollowerModel.find({follower: userId}).populate('following');
//         return following;
//     }

//     async isFollowing(followStateRequest: IFollower): Promise<boolean> {
//         const followingExists = await FollowerModel.find({follower: followStateRequest.follower, following: followStateRequest.following});
//         return followingExists.length === 1;
//     }

    
// }

// export const userController = new UserController();