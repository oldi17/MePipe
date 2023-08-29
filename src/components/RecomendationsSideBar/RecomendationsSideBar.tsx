import videosTest from "../../testData/videosTest";
import VideoCard from "../VideoCard/VideoCard";

function RecomendationsSideBar(props: {
  classNames:string[];
}) {


  return (
    <div 
      className={[...props.classNames].join(' ')}
    >
      <VideoCard 
        video={videosTest[0]} 
        isSmallSize={true}
        />
      <VideoCard 
        video={videosTest[0]} 
        isSmallSize={true}
        />
      <VideoCard 
        video={videosTest[0]} 
        isSmallSize={true}
        />
    </div>
  )
}

export default RecomendationsSideBar