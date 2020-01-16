import React, { useEffect, useCallback, useState } from "react";
import { useRequest } from "../../hooks/request";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./SubsPage.scss";
import { Album } from "../../components/Album";

export function SubsPage() {
  const [albums, setAlbums] = useState([]);
  const { request, isLoading } = useRequest();

  const fetchAlbums = useCallback(() => {
    request("/albums").then(data => {
      setAlbums(data);
    });
  }, [request, setAlbums]);
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  useEffect(() => {
    console.log(albums);
  }, [albums]);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <CircularProgress size={60} color="inherit" />
        </div>
      ) : (
        <div className="albums-container">
          {albums.map(album => (
            <Album key={album.id} album={album} />
          ))}
        </div>
      )}
    </>
  );
}
