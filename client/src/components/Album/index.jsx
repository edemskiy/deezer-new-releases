import React from "react";
import "./Album.scss";
export function Album({ album }) {
  return (
    <div className="album">
      <img className="album-cover" src={album.cover_medium} alt={album.name} />
      <div className="album-info">
        <div className="album-title">
          <a href={album.link} target="_blank" rel="noopener noreferrer">
            {album.title}
          </a>
        </div>
        <div className="artist-name">
          by{" "}
          <a
            href={`https://www.deezer.com/artist/${album.artistId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {album.artistName}
          </a>
        </div>
        <div className="type-and-date">
          {album.record_type} &#8226;&nbsp;
          {new Date(album.release_date).toLocaleDateString(undefined, {
            month: "long",
            day: "2-digit",
            year: "numeric"
          })}
        </div>
      </div>
    </div>
  );
}
