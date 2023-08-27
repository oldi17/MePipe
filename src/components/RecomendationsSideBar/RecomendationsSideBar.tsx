import videosTest from "../../testData/videosTest";
import VideoCard from "../VideoCard/VideoCard";

function RecomendationsSideBar() {


  return (
    <div>
      <VideoCard 
        video={videosTest[0]} 
        isSmallSize={true}
        />
    </div>
  )
}

export default RecomendationsSideBar