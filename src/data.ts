export type Track = { id: string; title: string; artist: string; album: string; cover: string; audio: string; duration: string; lyrics?: { time: number; line: string }[] };
export const media = {
  assets: '/assets',
  mainPhoto: '/assets/main-photo.jpg',
  entryVideo: '/assets/entry-loop.mp4',
  surpriseVideo: '/assets/birthday-surprise.mp4',
  photos: [
    '/assets/memory-01.jpg',
    '/assets/memory-02.jpg',
    '/assets/memory-03.jpg',
    '/assets/memory-04.jpg'
  ],
  voiceNotes: [
    '/assets/voice-note-01.mp3',
    '/assets/voice-note-02.mp3'
  ],
};
const cover = (name: string) => `${media.assets}/${name}.jpg`;
export const tracks: Track[] = [
 {
  id: 'Mala ved lagle.mp3',
  title: 'Mala ved lagle.mp3',
  artist: 'Tanishka',
  album: 'Birthday Special',
  cover: cover('cover-midnight'),
  audio: `${media.assets}/Mala ved lagle.mp3`,
  duration: '3:30'
},
  {
  id: 'Tere Hawale.mp3',
  title: 'Tere Hawale.mp3',
  artist: 'Tanishka',
  album: 'Forever Us',
  cover: cover('cover-midnight'),
  audio: `${media.assets}/Tere Hawale.mp3`,
  duration: '3:30'
},
{
  id: 'Soch na Sake.mp3',
  title: 'Soch na Sake.mp3',
  artist: 'Tanishka',
  album: 'Our Story',
  cover: cover('cover-midnight'),
  audio: `${media.assets}/Soch na Sake.mp3`,
  duration: '4:00'
},
{
  id: 'baton-ko-teri.mp3',
  title: 'Baton Ko Teri.mp3',
  artist: 'Tanishka',
  album: 'Songs Dedicated To YOU',
  cover: cover('cover-midnight'),
  audio: `${media.assets}/baton-ko-teri.mp3`,
  duration: '3:45'
},
{
  id: 'Hum tere pyar me.mp3',
  title: 'Hum tere pyar me.mp3',
  artist: 'Tanishka',
  album: 'Birthday Special',
  cover: cover('cover-midnight'),
  audio: `${media.assets}/Hum tere pyar me.mp3`,
  duration: '3:20'
},
{
  id: 'Kaun tuzhe.mp3',
  title: 'Kaun tuzhe.mp3',
  artist: 'Tanishka',
  album: 'For Chiku',
  cover: cover('cover-midnight'),
  audio: `${media.assets}/Kaun tuzhe.mp3`,
  duration: '4:10'
},
];
export const playlists = [
  {
    name: 'Our Story',
    detail: 'the chapters we wrote together',
    color: '#b88962',
    cover: cover('playlist-our-story'),
    trackIds: [
      'Soch na Sake.mp3',
      'Tere Hawale.mp3',
      'baton-ko-teri.mp3',
    ],
  },
  {
    name: 'For Chiku',
    detail: 'for the hours that belong to us',
    color: '#7d91a9',
    cover: cover('playlist-midnight'),
    trackIds: [
      'Kaun tuzhe.mp3',
      'Tere Hawale.mp3',
    ],
  },
  {
    name: 'Birthday Special',
    detail: 'made for this exact day',
    color: '#ad6f76',
    cover: cover('playlist-birthday'),
    trackIds: [
      'Mala ved lagle.mp3',
      'Hum tere pyar me.mp3',
    ],
  },
  {
    name: 'Songs Dedicated To YOU',
    detail: 'a little off-key, completely true',
    color: '#b8996c',
    cover: cover('playlist-sang'),
    trackIds: [
      'baton-ko-teri.mp3',
      'Tere Hawale.mp3',
      'Soch na Sake.mp3',
      'Mala ved lagle.mp3',
      'Hum tere pyar me.mp3',
      'Kaun tuzhe.mp3',
    ],
  },
  {
    name: 'Forever Us',
    detail: 'the chapters we wrote together ♡',
    color: '#9b6471',
    cover: cover('playlist-forever'),
    trackIds: [
      'baton-ko-teri.mp3',
      'Tere Hawale.mp3',
      'Soch na Sake.mp3',
      'Mala ved lagle.mp3',
      'Hum tere pyar me.mp3',
      'Kaun tuzhe.mp3',
    ],
  },
];


export const memories = [
  {
    src: media.photos[0],
    title: 'Back When We Were Just Friends',
    note: 'Manali, before either of us knew what was coming.',
  },
  {
    src: media.photos[1],
    title: 'A Little More Than Friends',
    note: 'Our first concert together, and somewhere in between the music and the moment, we became us.',
  },
  {
    src: media.photos[2],
    title: 'Goa Looks Better With You',
    note: 'Just us, being cute and doing absolutely nothing important.',
  },
  {
    src: media.photos[3],
    title: 'Forever Looks Like This',
    note: 'You, me, tradition, and a memory I never want to forget.',
  },
];
