import Router from "express"
import {
    deleteController,
    getAllController,
    getOneController,
    postController,
    updateController
} from "./controllers/postController.js";



const router = new Router()

router.post('/posts',postController)
router.get('/posts',getAllController)
router.get('/posts/:id',getOneController)
router.put('/posts',updateController)
router.delete('/posts/:id',deleteController)

export default router