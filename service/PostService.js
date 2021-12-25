import Post from "../Post.js";

export const createPost = async (post) => {
    return await Post.create(post)
}

export const getAllPosts = async () => {
    return Post.find()
}

export const getOnePost = async (id) => {
    if (!id) throw new Error('не указан id')
    return Post.find({_id: id})
}

export const updatePost = async (post) => {
    const {id} = post
    if (!id) throw new Error('не указан id')
    return Post.findByIdAndUpdate(id, post, {new: true})
}
export const deletePost = async (id) => {
        return Post.findByIdAndDelete(id)
}

