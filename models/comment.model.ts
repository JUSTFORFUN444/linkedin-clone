import mongoose, { Document, Model } from "mongoose";
import { IUser } from "./user.model";
export interface IComment{
    
    textMessage:string,
    user:IUser
   
}
export interface ICommentDocument extends IComment, Document{
    
    createdAt:Date,
    updatedAt:Date,
    _id: string;
    
}

const commentSchema = new mongoose.Schema<ICommentDocument>({
    textMessage:{
        type:String,
        required:true
    },
    user:{
        userId:{
            type:String,
            required:true
        },
        profilePhoto:{
            type:String,
            require:true
        },
        firstName:{
            type:String,
            require:true
        },
        lastName:{
            type:String,
            require:true
        }
    }
},{timestamps:true});
export const Comment : Model<ICommentDocument> = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);