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
  { id: 'midnight', title: 'Midnight in the City', artist: 'Our little soundtrack', album: 'Our Story', cover: cover('cover-midnight'), audio: `${media.assets}/midnight-in-the-city.mp3`, duration: '3:42', lyrics: [{time:0,line:'There is a city asleep beneath us'}, {time:12,line:'and a whole world in the space between our hands'}, {time:25,line:'Stay here, stay close, stay awhile'}, {time:42,line:'I would choose this moment again'}] },
  { id: 'orbit', title: 'Orbit', artist: 'For the two of us', album: 'Forever Us', cover: cover('cover-orbit'), audio: `${media.assets}/orbit.mp3`, duration: '4:08', lyrics: [{time:0,line:'You pull me into your orbit'}, {time:14,line:'where the quiet sounds like home'}, {time:29,line:'Every road becomes a story'}, {time:44,line:'when I am walking it with you'}] },
  { id: 'golden-hour', title: 'Golden Hour, Again', artist: 'A song I kept for you', album: 'Birthday Special', cover: cover('cover-golden-hour'), audio: `${media.assets}/golden-hour-again.mp3`, duration: '3:18' },
  { id: 'way-home', title: 'The Way Home', artist: 'Our Story', album: 'Songs I Sang For You', cover: cover('cover-way-home'), audio: `${media.assets}/the-way-home.mp3`, duration: '2:56' },
  { id: 'signal', title: 'Signal Through the Dark', artist: 'Batman Collection', album: 'Batman Collection', cover: cover('cover-signal'), audio: `${media.assets}/signal-through-the-dark.mp3`, duration: '3:51' },
];
export const playlists = [
  { name: 'Our Story', detail: 'the chapters we wrote together', color: '#b88962', cover: cover('playlist-our-story'), trackIds: ['midnight','orbit','way-home'] },
  { name: 'Midnight Covers', detail: 'for the hours that belong to us', color: '#7d91a9', cover: cover('playlist-midnight'), trackIds: ['midnight','orbit'] },
  { name: 'Birthday Special', detail: 'made for this exact day', color: '#ad6f76', cover: cover('playlist-birthday'), trackIds: ['golden-hour','orbit'] },
  { name: 'Batman Collection', detail: 'for my favorite night guardian', color: '#7d8361', cover: cover('playlist-batman'), trackIds: ['signal','midnight'] },
  { name: 'Songs I Sang For You', detail: 'a little off-key, completely true', color: '#b8996c', cover: cover('playlist-sang'), trackIds: ['way-home','golden-hour'] },
  { name: 'Forever Us', detail: 'all of it, in one place', color: '#9b6471', cover: cover('playlist-forever'), trackIds: ['midnight','orbit','golden-hour','way-home'] },
];
export const memories = [
  { src: media.photos[0], title: 'The first late night', note: 'somewhere between hello and home' },
  { src: media.photos[1], title: 'A Sunday we kept', note: 'warm light, cold coffee, perfect timing' },
  { src: media.photos[2], title: 'Us, in motion', note: 'the best kind of blurry' },
  { src: media.photos[3], title: 'Still my favorite view', note: 'every version of you' },
];