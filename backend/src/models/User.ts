// import mongoose from "mongoose";

// export interface IChainAddress { 
//     address: string,
//     verified: boolean,
//     network: string
// };

// export interface IUser {
//     alias: string,
//     addresses: IChainAddress[]
// }

// const addressSchema = new mongoose.Schema<IChainAddress>({
//     address: String,
//     verified: Boolean,
//     network: String
// });

// const userSchema = new mongoose.Schema<IUser>({
//     alias: {type: String, unique: true},
//     addresses: [addressSchema]
// });

// export const UserModel = mongoose.model<IUser>("User", userSchema);
