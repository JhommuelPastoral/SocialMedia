import { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { OnboardingData } from '../lib/api.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export default function OnboradingPage() {

  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { authData } = useAuthUser();
  
  const [onboardingData, setOnboardingData] = useState({
    fullname: authData?.user?.fullname || "", 
    bio: "",
    profileImage: authData?.user?.profileImage || ""
  });
  const queryClient = useQueryClient();
  const{mutate: onboardingMutation} = useMutation({
    mutationFn: OnboardingData,
    onSuccess: () => {
      toast.success('Onboarding successfully!');
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedFile(reader.result); // base64
      setPreviewUrl(reader.result);   // update image preview
      setOnboardingData(prev => ({ ...prev, profileImage: reader.result }));

    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onboardingMutation(onboardingData);
  };
  return (
    <div className="bg-base-300 md:bg-base-100 max-w-[600px] min-h-screen mx-auto flex justify-center items-center font-Poppins">
      <div className="bg-base-300  p-6 md:p-10 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className='flex flex-col items-center space-y-3'>
            <p>Profile Picture</p>
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={previewUrl || authData?.user?.profileImage}
                  alt="Profile Preview"
                />
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-xs"
            />

          </div>
          <div className='flex flex-col items-start justify-start space-y-3'>
            <p className='text-left text-sm'>Full Name</p>
            <input type="text" value={onboardingData.fullname} onChange={(e) => setOnboardingData({ ...onboardingData, fullname: e.target.value })} placeholder="Full Name" className="input" />
            <p className='text-left text-sm'>Bio (Max 300 letters) </p>
            <textarea className="textarea resize-none" placeholder="Bio" maxLength={300} value={onboardingData.bio} onChange={(e) => setOnboardingData({ ...onboardingData, bio: e.target.value })} > </textarea>
          </div>
          <button className='btn btn-primary'> Submit </button>


        </form>
      </div>
    </div>
  );
}
