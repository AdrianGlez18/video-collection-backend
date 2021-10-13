import {Request, Response, Router} from 'express'
import Link from '../models/Link'

class LinkRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    async getLink(req: Request, res: Response) {
        const filter = req.query.title?{title: req.query.title.toString()}:{};

        const linkFound = await Link.find(filter);
        try {
            if (linkFound.length !== 0) {
                res.send(linkFound);
            } else {
                res.status(404).send();
            }
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async getLinkById(req: Request, res: Response) {
        try {
            const linkFound = await Link.findById(req.params.id);
            if(!linkFound) {
                res.status(404).send();
            } else {
                res.send(linkFound);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async postLink(req: Request, res: Response) {
        const linkFound = await Link.findOne({url: req.body.url});
        if(linkFound) {
            return res.status(301).json({message: 'The link already exists!'});
        }

        const link = new Link(req.body);
        try {
            const storedLink = await link.save();
            res.status(201).send(storedLink);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async putLink(req: Request, res: Response) {
        try {
            const linkFound = await Link.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!linkFound) {
                res.status(404).send();
            } else {
                res.send(linkFound);
            }
        } catch(error) {
            res.status(400).send(error);
        };
    }

    deleteLink(req: Request, res: Response) {
        if(!req.query.title) {
            res.status(400).send({
                error: 'A title must be provided',
            });
        } else {
            try {
                const linkFound = Link.findOneAndDelete({title: req.query.title.toString()})
                if(!linkFound) {
                    res.status(404).send();
                } else {
                    res.send(linkFound);
                }
            } catch(error) {
                res.status(400).send(error);
            };
        }
    }

    routes() {
        this.router.get('/link', this.getLink);
        this.router.get('/link/:id', this.getLinkById);
        this.router.post('/link', this.postLink);
        this.router.put('/link/:id', this.putLink);
        this.router.delete('/link', this.deleteLink);
    }
}

const linkRoutes = new LinkRoutes();
linkRoutes.routes();
export default linkRoutes.router;