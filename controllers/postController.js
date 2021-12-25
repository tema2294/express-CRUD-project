import {createPost, deletePost, getAllPosts, getOnePost, updatePost} from "../service/PostService.js";

export const postController = async (req, res) => {
    try {
        const post = await createPost(req.body)
        return res.json(post)
    }
    catch(e) {
        res.status(500).json(e)
    }
}
export const getAllController = async (req, res) => {
    try {
        const posts = await getAllPosts()
        return res.json(posts);
    }
    catch(e) {
        res.status(500).json(e)
    }
}
export const getOneController = async (req, res) => {
    try {
        const { id } = req.params
        const post = await getOnePost(id)
        return res.json(post);
    }
    catch (e) {
        res.status(500).json(e)
    }
}
export const updateController = async (req, res) => {
    try {
        const newPost = await updatePost(req.body)
        return res.json(newPost);
    }
    catch(e) {
        res.status(500).json('ошибка')
    }
}
export const deleteController = async (req, res) => {
    try {
        const {id} = req.params
        const post = await deletePost(id)
        res.json(post)
    }
    catch(e) {
        res.status(500).json(e)
    }
}

