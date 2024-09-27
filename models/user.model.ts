import mongoose, { Document, Model } from "mongoose";
import ProfilePhoto from './../components/shared/ProfilePhoto';
export interface IUser{
    firstName:string,
    lastName:string,
    userId:string,
    profilePhoto?:string,
    bio?:string
}
export interface IUserDocument extends IUser, Document{
createdAt:DataTransfer,
updatedAt:Date
}
const userSchema =  new mongoose.Schema<IUserDocument>({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    profilePhoto:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    }
},{timestamps:true});
export const User : Model<IUserDocument> = mongoose.models?.User || mongoose.model<IUserDocument>("User", userSchema);
