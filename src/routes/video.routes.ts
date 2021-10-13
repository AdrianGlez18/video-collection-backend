import {Request, Response, Router} from 'express'
import Video from '../models/Video'

class VideoRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    async getVideo(req: Request, res: Response) {
        const filter = req.query.title?{title: req.query.title.toString()}:{};

        const videoFound = await Video.find(filter);
        try {
            if (videoFound.length !== 0) {
                res.send(videoFound);
            } else {
                res.status(404).send();
            }
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async getVideoById(req: Request, res: Response) {
        try {
            const videoFound = await Video.findById(req.params.id);
            if(!videoFound) {
                res.status(404).send();
            } else {
                res.send(videoFound);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async postVideo(req: Request, res: Response) {
        const videoFound = await Video.findOne({url: req.body.url});
        if(videoFound) {
            return res.status(301).json({message: 'The video already exists!'});
        }

        const video = new Video(req.body);
        try {
            const storedVideo = await video.save();
            res.status(201).send(storedVideo);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async putVideo(req: Request, res: Response) {
        try {
            const videoFound = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!videoFound) {
                res.status(404).send();
            } else {
                res.send(videoFound);
            }
        } catch(error) {
            res.status(400).send(error);
        };
    }

    deleteVideo(req: Request, res: Response) {
        if(!req.query.title) {
            res.status(400).send({
                error: 'A title must be provided',
            });
        } else {
            try {
                const videoFound = Video.findOneAndDelete({title: req.query.title.toString()})
                if(!videoFound) {
                    res.status(404).send();
                } else {
                    res.send(videoFound);
                }
            } catch(error) {
                res.status(400).send(error);
            };
        }
    }

    routes() {
        this.router.get('/video', this.getVideo);
        this.router.get('/video/:id', this.getVideoById);
        this.router.post('/video', this.postVideo);
        this.router.put('/video/:id', this.putVideo);
        this.router.delete('/video', this.deleteVideo);
    }
}

const videoRoutes = new VideoRoutes();
videoRoutes.routes();
export default videoRoutes.router;