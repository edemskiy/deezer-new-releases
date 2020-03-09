import express, { Request, Response } from "express";
import path from "path";
import rp from "request-promise";

import {
  MY_DEEZER_ID,
  getDaysBeforeNowDate,
  getUserArtistsUrl,
  getArtistAlbumsUrl
} from "./utils";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get("/albums", async (_req: Request, res: Response) => {
  try {
    const threeMonthAgoDate: string = getDaysBeforeNowDate(90)
      .toISOString()
      .slice(0, 10);
    let response: string = await rp(getUserArtistsUrl(MY_DEEZER_ID));
    let artists: any[] = JSON.parse(response).data;

    let allAlbums = await Promise.all(
      artists.map(artist => rp(getArtistAlbumsUrl(artist.id)))
    );

    let latest_releases = allAlbums
      .map((artistAlbums: string, i: number) =>
        JSON.parse(artistAlbums).data.map((album: object) => ({
          ...album,
          artistName: artists[i].name,
          artistId: artists[i].id
        }))
      )
      .flat()
      .filter(
        album =>
          album.release_date > threeMonthAgoDate &&
          !album.title.toLowerCase().includes("remix")
      )
      .sort((a, b) => (a.release_date <= b.release_date ? 1 : -1));
    res.status(200).send(latest_releases);
  } catch (e) {
    res.status(500).send({ message: "Something wrong", e });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
