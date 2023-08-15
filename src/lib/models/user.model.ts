import mongoose, { Schema, Model } from 'mongoose'
import emailValidator from 'email-validator'

export interface User {
    email: string
    password: string
    historyId: string
    createdAt: number
}

export interface UserDTO {
    email: string
    password: string
}

export interface UserDVO {
    email: string
    createdAt: number
}

const userSchema = new Schema<User>(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: (email: string): boolean => {
                    return emailValidator.validate(email)
                },
                message: 'Invalid email format',
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (pass: string): boolean => {
                    return pass?.length > 1
                },
                message: 'Invalid password',
            },
        },
        historyId: { type: String, required: true },
    },
    {
        // createdAt and updatedAt timestamps
        timestamps: true,
    }
)

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret) {
        delete ret._id
    },
})

export const userModel = (): Model<User> => {
    return mongoose.models.User || mongoose.model('User', userSchema)
}
