import  mongoose ,{Schema , Document} from "mongoose";

export interface Message extends Document {
    content: string,
    createdAt:Date,
}

const MessageSchema : Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true,
        default : Date.now
    }

    
})
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verifycodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
    
}
const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        required: [true,"username is Requiered"],
        unique:true,
        trim:true,

    },
    email:{
        type: String,
        required:[true,"Email is Requiered"],
        unique:true,
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,"Enter a vlaid Email"]
    },
    verifycode:{
        type:String,
        required:[true,"Verifycode is required"]
    },
    verifycodeExpiry:{
        type:Date,
        required:[true,"VerifycodeExxpiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
    },
    messages: [MessageSchema]
    
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)
export  default UserModel