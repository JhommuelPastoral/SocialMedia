import PostCard from '../components/PostCard.jsx';
import CreatePost from '../components/CreatePost.jsx';
export default function HomePage() {


  return (
    <div className='max-w-[800px] mx-auto min-h-screen space-y-5 p-5 font-Poppins'>
      <CreatePost />
      {/* My Day */}
      <div className='w-full h-[80px] border items-center flex justify-center skeleton'>
        <p>Still Working On Myday Features</p>
      </div>

      <div className='max-w-[600px] mx-auto '>
        <PostCard />
      </div>
    </div>
  )
}
