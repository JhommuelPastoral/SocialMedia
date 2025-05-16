import Post from "../models/Post.js";
import cloudinary from "../config/cloud.js";

export const post = async (req,res,io) => {
  try {
    let {userId, message, img} = req.body;
    if(!message || !img || !userId) {
      return res.status(400).json({message: "All fields are required"});
    }
    const uploadResult = await cloudinary.uploader.upload(img, {
      folder: "post-images",
    });
    
    const post = await Post.create({userId, message, img: uploadResult.secure_url});
    io.emit("newPost", post);
    res.status(200).json({message: "Post created successfully", post});

  } catch (error) {
    console.log("post error", error.message);
    res.status(500).json({message: error.message});
  }
}

export const getPosts = async (req,res) => {
  try {
    const posts = await Post.find({}).populate("userId", "fullname profileImage isOnline").sort({createdAt: -1});
    res.status(200).json({posts});
  } catch (error) {
    console.log("getPosts error", error.message);
    res.status(500).json({message: error.message});
  }
}