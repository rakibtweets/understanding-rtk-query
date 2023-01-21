import { useState } from 'react';
import { useEditVideoMutation } from '../../features/api/apiSlice';
import Error from '../ui/Error';
import Success from '../ui/Success';
import TextArea from '../ui/TextArea';
import TextInput from '../ui/TextInput';

export default function Form({ video }) {
  const {
    id,
    title: initialTitle,
    author: initialAuthor,
    date: initialDate,
    description: initaialDescription,
    link: initialLink,
    thumbnail: initialThumbnail,
    duration: initialDuration,
    views: initialViews
  } = video;
  const [editVideo, { isLoading, isSuccess, isError, error }] =
    useEditVideoMutation();

  const [title, setTitle] = useState(initialTitle);
  const [author, setAuthor] = useState(initialAuthor);
  const [description, setDescription] = useState(initaialDescription);
  const [link, setLink] = useState(initialLink);
  const [date, setDate] = useState(initialDate);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [duration, setDuration] = useState(initialDuration);
  const [views, setViews] = useState(initialViews);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedVideoData = {
      title,
      author,
      description,
      link,
      date,
      thumbnail,
      duration,
      views
    };
    editVideo({ videoId: id, data: editedVideoData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                value={link}
                required
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                required
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                required
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {isSuccess && <Success message="Video edited successfully" />}
        {isError && <Error error={error} />}
      </div>
    </form>
  );
}
