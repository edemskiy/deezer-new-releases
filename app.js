const express = require("express");
const path = require("path");
const rp = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/albums", (req, res) => {
  let twoMonthAgoDate = new Date(new Date().getTime() - 86400000 * 90)
    .toISOString()
    .slice(0, 10);
  let artistsArr = [];
  rp("https://api.deezer.com/user/2281251184/artists")
    .then(data => JSON.parse(data).data)
    .then(artists => {
      artistsArr = [...artists];
      return Promise.all(
        artists.map(artist =>
          rp(`https://api.deezer.com/artist/${artist.id}/albums`)
        )
      );
    })
    .then(allAlbums => {
      const latest_releases = allAlbums
        .map((artistAlbums, i) =>
          JSON.parse(artistAlbums).data.map(album => ({
            ...album,
            artistName: artistsArr[i].name,
            artistId: artistsArr[i].id
          }))
        )
        .flat()
        .filter(
          album =>
            album.release_date > twoMonthAgoDate &&
            !album.title.toLowerCase().includes("remix")
        )
        .sort((a, b) => (a.release_date <= b.release_date ? 1 : -1));
      res.status(200).send(latest_releases);
    });
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
