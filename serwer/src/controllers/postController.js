const Post = require('../models/postModel');


exports.getAllPostsByEventId = (req, res) => {
    const eventId = req.params.eventId;

    Post.getAllPostsByEventId(eventId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving posts' });
        } else {
            res.status(200).json(events);
        }
    });
};

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on('error', reject);
    });
}

exports.getAllCommentsByPostId = async (req, res) => {
    const postId = req.params.postId;
    const postInstance = new Post();
    const containerName = process.env.CONTAINERS_NAME;
    const blobClient = postInstance.getBlobClient();
    const containerClient = blobClient.getContainerClient(containerName);

    try {
        const comments = await postInstance.getAllCommentsByPostId(postId);
        await Promise.all(comments.map(async (comment) => {
            if (comment.image) {
                const photoId = comment.image.toString();
                const blobClient = containerClient.getBlobClient(photoId);
                const downloadResponse = await blobClient.download();
                const download = await streamToBuffer(downloadResponse.readableStreamBody);
                comment.image = download.toString();
                console.log('Downloaded blob content done');
            }
            return comment;
        }));
        res.status(201).json(comments);
    } catch (err) {
        console.error('Error in controller getAllCommentsByPostId:', err);
        res.status(500).json({error: 'Error retrieving posts'});
    };
};

exports.addComment = async (req, res) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    const text = req.body.text;
    const image = req.body.image || null;

    const postInstance = new Post();

    try {
        const newCommentId = await postInstance.addComment(postId, userId, text, image);
        console.log("Well done");
        res.status(201).json({newCommentId: newCommentId});
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({error: 'Error adding comment'});
    };
};

exports.addPost = (req, res) => {
    const eventId = req.body.eventId;
    const userId = req.body.userId;
    const text = req.body.text;
    const image = req.body.image || null;

    Post.addPost(eventId, userId, text, image, (err, newPostId) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error adding post' });
        } else {
            res.status(200).json({ post_id: newPostId });
        }
    });
};

exports.deleteComment = (req, res) => {
    const commentId = req.params.commentId;

    Post.deleteComment(commentId, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error deleting comment' });
        } else {
            res.status(200).json({ message: 'Comment deleted successfully' });
        }
    });
};

exports.deletePost = (req, res) => {
    const postId = req.params.postId;

    Post.deletePost(postId, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error deleting post' });
        } else {
            res.status(200).json({ message: 'Post deleted successfully' });
        }
    });
};

