const MILLISECONDS_IN_A_DAY = 86400000;
const MY_DEEZER_ID = 2281251184;

function getDaysBeforeNowDate(daysBeforeNow) {
  return new Date(new Date().getTime() - MILLISECONDS_IN_A_DAY * daysBeforeNow);
}

function getUserArtistsUrl(userId) {
  return `https://api.deezer.com/user/${userId}/artists`;
}

function getArtistAlbumsUrl(artistId) {
  return `https://api.deezer.com/artist/${artistId}/albums`;
}

module.exports = {
  MY_DEEZER_ID,
  getDaysBeforeNowDate,
  getUserArtistsUrl,
  getArtistAlbumsUrl
};
