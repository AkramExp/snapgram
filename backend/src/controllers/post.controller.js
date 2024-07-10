import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createPost = asyncHandler(async (req, res) => {
  const { caption, location, tags } = req.body;
  const userId = req.user._id;
  const imageLocalPath = req.file.path;

  const imageFile = await uploadOnCloudinary(imageLocalPath);

  if (!imageFile)
    throw new ApiError(400, "Something went wrong while uploading image");

  const tagsArray = tags.split(",");

  const post = await Post.create({
    userId,
    caption,
    tags: tagsArray,
    location,
    imageUrl: imageFile.url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post Created Successfully"));
});

export const getRecentPosts = asyncHandler(async (req, res) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              username: 1,
              imageUrl: 1,
              name: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        user: {
          $first: "$user",
        },
      },
    },
    {
      $project: {
        userId: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 20,
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Recent posts fetched successfully"));
});
