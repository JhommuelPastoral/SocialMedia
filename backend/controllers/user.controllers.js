import User from "../models/User.js";
import FriendRequest from "../models/friendRequest.js";

export const getRecommendedFriends = async (req,res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = await User.findById(currentUserId);
    const recommendUser = await User.find({
      $and:[
        {_id: {$ne: currentUserId}},
        {_id: {$nin: currentUser.friends}},
        {isOnboarded: true}
      ]
    }).select('-password');
    return res.status(200).json({recommendUser});
  } catch (error) {
    console.log("getRecommendedFriends", error.message);
  }
}

export const getFriends = async (req,res) => {
  try {
    const friends = await User.findById(req.user._id).select("friends").populate('friends', "fullname profileImage");
    res.status(200).json({friends});
  } catch (error) {
    console.log("getFriends", error.message); 
  }

} 

export const addFriend = async (req,res) => {
  try {
    const {id:friendId} = req.params;
    const currentUserId = req.user._id;

    const friendRequest = await FriendRequest.create({
      sender: currentUserId,
      reciptient: friendId,
      status: "pending"
    });
    res.status(200).json({friendRequest});
  } catch (error) {
    
  }
}

 