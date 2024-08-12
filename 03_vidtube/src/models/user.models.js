import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase : true,
        index : true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    watchHistory : [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
},
{
    timestamps: true
}
)

export const User = mongoose.model("User", userSchema)