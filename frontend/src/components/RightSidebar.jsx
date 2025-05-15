import useAuthUser from '../hooks/useAuthUser.js';
import {getRecommendUser, addFriend, getOutgoingFriendRequests,getIncomingFriendRequests} from '../lib/api.js'
import { io } from "socket.io-client";
import { useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {useLocation} from 'react-router'
import toast from 'react-hot-toast';
import { useState } from 'react';
export default function RightSidebar() {
  const location = useLocation();
  const currectLocation = location.pathname;
  const Socket = useRef(null);
  const { authData } = useAuthUser();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [outgoingRequest, setOutgoingRequest] = useState([]);
  const [ingoingRequest, setIngoingRequest] = useState([]);
  const [filterRecommendAcc, setFilterRecommendAcc] = useState([]);
  
  const {data: recommendAcc=[], refetch: recommendUserRefetch} = useQuery({
    queryKey: ['recommendUser'],
    queryFn: getRecommendUser
  });

  const {data: getOutgoingFriend=[], refetch: outGoingFriendRequestsRefetch} = useQuery({
    queryKey: ['outgoingFriendRequests'],
    queryFn: getOutgoingFriendRequests
  });

  const {data: getIncomingFriend=[], refetch: incomingFriendRequestsRefetch} = useQuery({
    queryKey: ['incomingFriendRequests'],
    queryFn: getIncomingFriendRequests
  });

  const {mutate: handleAddFriendMutation} = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      toast.success('Friend request sent successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });




  useEffect(() => {
    if (!authData?.user?._id) return;
    Socket.current = io(backendUrl);
    Socket.current.on('user-disconnected', ()=>{
      recommendUserRefetch();
    });
    Socket.current.emit('user-connected',(authData?.user?._id));
    Socket.current.on('user-connected', (userId) => {recommendUserRefetch();});
    Socket.current.on('recommendUser', () => {
      recommendUserRefetch();
    });
    
    Socket.current.on(`outgoingFriendRequests${authData?.user?._id.toString()}`, () => {
      outGoingFriendRequestsRefetch();
    });

    Socket.current.on(`incomingFriendRequests${authData?.user?._id.toString()}`, () => {
      incomingFriendRequestsRefetch();
    });

    Socket.current.on(`acceptedFriendRequest${authData?.user?._id.toString()}`, () => {
      recommendUserRefetch();
      incomingFriendRequestsRefetch();
      outGoingFriendRequestsRefetch();
    });

    // Get all the ids in the outgoing friend request
    getOutgoingFriend?.outgoingFriendRequests?.map((friend) => setOutgoingRequest( (prev) => [...prev, friend.reciptient._id.toString()]));
    getIncomingFriend?.incomingFriendRequests?.map((friend) => setIngoingRequest( (prev) => [...prev, friend.sender._id.toString()]));
    const filterAcc = recommendAcc?.recommendUser?.filter((acc) => !outgoingRequest?.includes(acc?._id.toString()) && !ingoingRequest?.includes(acc?._id.toString()));
    setFilterRecommendAcc(filterAcc);
    return () => {
      if (Socket.current) {
        Socket.current.off('user-connected');
        Socket.current.off('recommendUser');
        Socket.current.off(`outgoingFriendRequests${authData?.user?._id}`);
        Socket.current.off(`incomingFriendRequests${authData?.user?._id}`);
        Socket.current.disconnect();
      }
    };
  }, [getOutgoingFriend, getIncomingFriend, recommendAcc]);


  const handleAddFriend = (userId) => {
    handleAddFriendMutation(userId);
  }



  return (
    <div className={`p-5 flex flex-col font-Poppins gap-5 ${currectLocation === '/explore/friends' ? 'hidden' : ''}`}>
      <div className='flex  items-center'>
        <div className='w-15 h-15 rounded-full  '>
          <img src={authData?.user?.profileImage} alt={authData?.user?.fullname} className='w-15 h-15 object-cover object-center rounded-full' />
        </div>
        <div className='flex flex-col ml-3'>
          <p className='text-sm'>{authData?.user?.fullname}</p>
          <p className='text-sm'>Double</p>
        </div>
      </div>
      <p className='text-sm text-current/80'>Suggested for you</p>
      {filterRecommendAcc?.map((user) => (
        user?.isOnline && (          
          <div className='flex items-center flex-col' key={user._id}>
            <div className='flex  items-center w-full'>
              <div className='w-15 h-15 rounded-full  '>
                <img src={user?.profileImage} alt={user?.fullname} className='w-15 h-15  object-cover object-center rounded-full' />
              </div>
              <div className='flex flex-col ml-3'>
                <p className='text-sm'>{user?.fullname}</p>
                <p className='text-sm'>Double</p>
              </div>
              <button className="btn btn-sm ml-auto bg-primary" onClick={() => handleAddFriend(user._id)}>Add Friend</button>
            </div>
          </div>
        )
        
        
      ))}

    </div>
  )
}
