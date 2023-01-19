import { useGetVideosQuery } from '../../features/api/apiSlice';
import Error from '../ui/Error';
import VideoLoader from '../ui/loaders/VideoLoader';
import Video from './Video';

export default function Videos() {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error error={error} />;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }
  if (!isLoading && !isError && videos.length === 0) {
    content = <Error error={error} message="No videos found !" />;
  }
  return <>{content}</>;
}
