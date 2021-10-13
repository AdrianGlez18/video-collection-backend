import {Schema, model} from 'mongoose'

interface LinkInterface {
    title: string,
    description?: string,
    url: string,
    tags?: string[],
    imageurl?: string
}

const LinkSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    imageurl: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    versionKey: false,
    timestamps: true
});

const Link = model<LinkInterface>('Link', LinkSchema);
export default Link;