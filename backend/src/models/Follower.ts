// import mongoose from "mongoose";

// export interface IFollower { 
//     follower: string,
//     following: string
// };

// const followerSchema = new mongoose.Schema<IFollower>({
//     follower: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
//     following: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
// });
// followerSchema.index({follower: 1, following: 1}, {unique: true});

// export const FollowerModel = mongoose.model<IFollower>("Follower", followerSchema);