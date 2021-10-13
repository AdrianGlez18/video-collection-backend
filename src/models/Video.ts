import {Schema, model} from 'mongoose'

interface VideoInterface {
    title: string,
    description?: string,
    url: string,
    tags?: string[]
    seen?: boolean
}

const VideoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    seen: {
        type: Boolean
    }
}, {
    versionKey: false,
    timestamps: true
});

const Video = model<VideoInterface>('Video', VideoSchema);
export default Video;