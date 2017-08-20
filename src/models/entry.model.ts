import { Document, Schema, model } from 'mongoose'

export interface IEntry extends Document {
    title: string
    subtitle: string
    content: string
}

export const EntrySchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    subtitle: String,
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Entry = model<IEntry>('Entry', EntrySchema);