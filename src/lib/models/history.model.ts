import mongoose, { Schema, Model } from 'mongoose'

interface History {
    id: string
    expression: string
    createdAt: number
}

const historySchema = new Schema<History>(
    {
        expression: {
            type: String,
            required: true,
            validate: {
                validator: (expression: string): boolean => {
                    return expression?.length > 1
                },
                message: 'Invalid expression',
            },
        },
        id: {
            type: String,
            required: true,
        },
    },
    {
        // createdAt and updatedAt timestamps
        timestamps: true,
    }
)

historySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret) {
        delete ret._id
    },
})

export const historyModel = (): Model<History> => {
    return (
        mongoose.models.HistoryModel ||
        mongoose.model('HistoryModel', historySchema)
    )
}
