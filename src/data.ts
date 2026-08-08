export type Track = { id: string; title: string; artist: string; album: string; cover: string; audio: string; duration: string; lyrics?: { time: number; line: string }[] };
export const media = {
  assets: '/assets',
  entryVideo: '/assets/entry-loop.mp4',
  surpriseVideo: '/assets/birthday-surprise.mp4',
  photos: ['/assets/memory-01.jpg', '/assets/memory-02.jpg', '/assets/memory-03.jpg', '/assets/memory-04.jpg'],
  voiceNotes: ['/assets/voice-note-01.mp3', '/assets/voice-note-02.mp3'],
};
const cover = (name: string) => `${media.assets}/${name}.jpg`;
export const tracks: Track[] = [
 {
  id: 'Mala ved lagle.mp3',
  title: 'Mala ved lagle.mp3',
  artist: 'Tanishka',
  album: 'Songs Dedicated To YOU',
  cover: cover('cover-midnight'),
  audio: `${media.assets}/Mala ved lagle.mp3`,
  duration: '3:30'
},
];
export const playlists = [
  { name: 'Our Story', detail: 'the chapters we wrote together', color: '#b88962', cover: cover('playlist-our-story'), trackIds: ['midnight','orbit','way-home'] },
  { name: 'For Chiku', detail: 'for the hours that belong to us', color: '#7d91a9', cover: cover('playlist-midnight'), trackIds: ['midnight','orbit'] },
  { name: 'Birthday Special', detail: 'made for this exact day', color: '#ad6f76', cover: cover('playlist-birthday'), trackIds: ['golden-hour','orbit'] },
 
  { name: 'Songs Dedicated To YOU', detail: 'a little off-key, completely true', color: '#b8996c', cover: cover('playlist-sang'), trackIds: ['way-home','golden-hour'] },
  { name: 'Forever Us', detail: 'all of it, in one place', color: '#9b6471', cover: cover('playlist-forever'), trackIds: ['midnight','orbit','golden-hour','way-home'] },
];
export const memories = [
  { src: media.photos[0], title: 'The first late night', note: 'somewhere between hello and home' },
  { src: media.photos[1], title: 'A Sunday we kept', note: 'warm light, cold coffee, perfect timing' },
  { src: media.photos[2], title: 'Us, in motion', note: 'the best kind of blurry' },
  { src: media.photos[3], title: 'Still my favorite view', note: 'every version of you' },
];
