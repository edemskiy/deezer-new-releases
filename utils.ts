const MILLISECONDS_IN_A_DAY: number = 86400000;

export const MY_DEEZER_ID: number = 2281251184;

export function getDaysBeforeNowDate(daysBeforeNow: number): Date {
  return new Date(new Date().getTime() - MILLISECONDS_IN_A_DAY * daysBeforeNow);
}

export function getUserArtistsUrl(userId: number): string {
  return `https://api.deezer.com/user/${userId}/artists`;
}

export function getArtistAlbumsUrl(artistId: number): string {
  return `https://api.deezer.com/artist/${artistId}/albums`;
}
