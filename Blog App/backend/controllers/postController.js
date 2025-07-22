import Post from "../models/Post.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "username profilePictureUrl")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username profilePictureUrl"
    );
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, content, category, tags, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized, no user token" });
  }

  if (!title || !content || !category) {
    return res.status(400).json({
      message: "Please enter all required fields: title, content, category",
    });
  }

  try {
    const post = new Post({
      user: req.user._id,
      title,
      content,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      imageUrl,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { title, content, category, tags, imageUrl } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.user.toString() !== req.user._id.toString()) {
        return res
          .status(401)
          .json({ message: "Not authorized to update this post" });
      }

      post.title = title || post.title;
      post.content = content || post.content;
      post.category = category || post.category;
      post.tags = tags ? tags.split(",").map((tag) => tag.trim()) : post.tags;
      post.imageUrl = imageUrl || post.imageUrl;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.user.toString() !== req.user._id.toString()) {
        return res
          .status(401)
          .json({ message: "Not authorized to delete this post" });
      }
      await Post.deleteOne({ _id: post._id });
      res.json({ message: "Post removed" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
