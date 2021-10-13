import {Router} from 'express'
import videoRoutes from './video.routes'
import linkRoutes from './link.routes'

class ApiRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (req, res) => {
            res.send("To use the API, you must go to: /video or /link");
        })
        this.router.use(videoRoutes);
        this.router.use(linkRoutes);
    }
}

const apiRoutes = new ApiRoutes();
apiRoutes.routes();
export default apiRoutes.router;