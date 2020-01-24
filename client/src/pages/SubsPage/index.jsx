import React, { useEffect, useCallback, useState } from "react";
import { useRequest } from "../../hooks/request";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./SubsPage.scss";
import { Album } from "../../components/Album";
import { useRef } from "react";

export function SubsPage() {
  const [albums, setAlbums] = useState([]);
  const [activeTypeFilter, setActiveTypeFilter] = useState("");
  const { request, isLoading } = useRequest();

  const fetchAlbums = useCallback(() => {
    request("/albums").then(data => {
      setAlbums(data);
    });
  }, [request, setAlbums]);
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  function onTypeChange(event) {
    const activeButton = event.currentTarget.querySelector(".active");
    if (activeButton) {
      activeButton.classList.toggle("active");
    }
    event.target.classList.toggle("active");
    setActiveTypeFilter(event.target.dataset.record_type);
  }

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <CircularProgress size={60} color="inherit" />
        </div>
      ) : (
        <>
          <div className="filter-buttons" onClick={onTypeChange}>
            <button className="active" data-record_type="">
              All
            </button>
            <button data-record_type="album">Albums</button>
            <button data-record_type="single">Singles</button>
          </div>
          <div className="albums-container">
            {albums
              .filter(album => album.record_type.includes(activeTypeFilter))
              .map(album => (
                <Album key={album.id} album={album} />
              ))}
          </div>
        </>
      )}
    </>
  );
}
