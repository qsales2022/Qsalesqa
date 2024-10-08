const getYouTubeVideoId = (url: string) => {
  const match = url.match(/youtu\.be\/([^?&]+)/);
  return match && match[1] ? match[1] : "";
};

export default getYouTubeVideoId;
