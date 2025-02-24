import { type movieVideos } from "../types/tmdb-types";

const findBestVideo = (videos: movieVideos | null) => {
  if (!videos?.results?.length) return "";
  const officialTrailer = videos.results.find(
    (video) =>
      video.official && video.type === "Trailer" && video.site === "YouTube",
  );
  if (officialTrailer) return officialTrailer.key;
  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  if (trailer) return trailer.key;
  const teaser = videos.results.find(
    (video) => video.type === "Teaser" && video.site === "YouTube",
  );
  if (teaser) return teaser.key;
  return videos.results[0]?.key ?? "";
};

export { findBestVideo };
