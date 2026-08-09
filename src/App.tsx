import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Archive, ArrowLeft, ArrowRight, AudioLines, BarChart3, Bell, BookOpen, ChevronDown, CircleHelp,
  Clock3, Disc3, Download, Heart, Home as HomeIcon, Image as ImageIcon, ListMusic, LockKeyhole,
  Menu, MessageCircleHeart, Mic2, MoreHorizontal, Pause, Play, Repeat2, Search, Settings2,
  Shuffle, SkipBack, SkipForward, Sparkles, Volume2, VolumeX, X, Zap
} from 'lucide-react';
import { media, memories, playlists, tracks, type Track } from './data';
import './index.css';

type View = 'home' | 'playlists' | 'lyrics' | 'memories' | 'voice' | 'timeline' | 'wrapped' | 'surprise';
const fallback = (title: string, tone = '#1c332d') => `linear-gradient(145deg, ${tone}, #0d1714 72%, #c39a67)`;
const formatTime = (value: number) => `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, '0')}`;

function Mark({ small = false }: { small?: boolean }) {
  return <div className={`flex items-center gap-3 ${small ? 'scale-90 origin-left' : ''}`}><span className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--primary)/.5)] text-primary"><span className="serif text-2xl italic">∞</span></span><span className="serif text-xl tracking-wide">Forever Us</span></div>;
}

function Particles() {
  return <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-60">{Array.from({ length: 16 }, (_, i) => <span key={i} className="particle absolute h-1 w-1 rounded-full bg-primary/60" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 61) % 100}%`, animationDelay: `${i * -.35}s`, animationDuration: `${4 + (i % 4)}s` }} />)}</div>;
}

function Entry({ onEnter }: { onEnter: () => void }) {
  return <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-[100dvh] overflow-hidden bg-[#08100d]">
    <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-35" src={media.entryVideo} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 72% 25%, rgba(171,128,78,.2), transparent 28%), linear-gradient(110deg, #07100cf2 0%, #07100caa 45%, #0e1c14e8 100%)' }} />
    <Particles />
    <div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-7 py-8 md:px-16 md:py-12">
      <div className="flex items-center justify-between"><Mark /><span className="mono text-[10px] uppercase tracking-[.3em] text-primary/65">A private frequency</span></div>
      <div className="max-w-3xl pb-10 md:pb-20">
        <p className="mono mb-6 text-[10px] uppercase tracking-[.42em] text-primary">For My Birthday Boy · 12.08.26</p>
        <h1 className="serif max-w-2xl text-[clamp(4rem,11vw,9.5rem)] leading-[.82] tracking-[-.04em] text-[#eadfcb]">A little<br /><em className="text-primary">world</em><br />for us.</h1>
        <p className="mt-9 max-w-sm text-sm leading-7 text-[#c5cabb]">Every song is a chapter. Every chapter leads back to you. Take your time in here.</p>
        <button onClick={onEnter} className="glow mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[.2em] text-primary-foreground transition-transform hover:-translate-y-1" aria-label="Enter Forever Us">Enter the room <ArrowRight size={16} /></button>
      </div>
      <div className="flex items-end justify-between text-[10px] text-muted-foreground"><span className="mono uppercase tracking-[.22em]">Press play when you're ready</span><span className="mono">01 / 01</span></div>
    </div>
  </motion.main>;
}

function Cover({ src, title, className = '', size = 'md' }: { src: string; title: string; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const [broken, setBroken] = useState(false);
  return <div className={`relative shrink-0 overflow-hidden rounded-[1.1rem] ${size === 'sm' ? 'h-12 w-12 rounded-lg' : size === 'lg' ? 'h-56 w-56 md:h-72 md:w-72' : 'h-36 w-36'} ${className}`} style={{ background: fallback(title) }}>
    {!broken && <img src={src} alt={title} className="h-full w-full object-cover" onError={() => setBroken(true)} />}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
  </div>;
}

function Sidebar({ view, setView, mobileOpen, close }: { view: View; setView: (v: View) => void; mobileOpen: boolean; close: () => void }) {
  const items: { id: View; label: string; icon: typeof HomeIcon }[] = [
    { id: 'home', label: 'Home', icon: HomeIcon }, { id: 'playlists', label: 'Our playlists', icon: ListMusic },
    { id: 'lyrics', label: 'Lyrics', icon: BookOpen }, { id: 'memories', label: 'Memories', icon: ImageIcon },
    { id: 'voice', label: 'Voice notes', icon: Mic2 }, { id: 'timeline', label: 'Our timeline', icon: Clock3 },
    { id: 'wrapped', label: 'Wrapped 2026', icon: BarChart3 }, { id: 'surprise', label: 'Birthday surprise', icon: LockKeyhole },
  ];
  return <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-[#0b1813]/95 p-7 backdrop-blur-2xl transition-transform md:relative md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="mb-14 flex items-center justify-between"><Mark small /><button className="md:hidden" onClick={close} aria-label="Close menu"><X size={18} /></button></div>
    <p className="mono mb-4 text-[9px] uppercase tracking-[.25em] text-muted-foreground">Your room</p>
    <nav className="space-y-1">{items.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setView(id); close(); }} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all ${view === id ? 'bg-primary/12 text-primary' : 'text-muted-foreground hover:bg-white/[.04] hover:text-foreground'}`}><Icon size={16} strokeWidth={1.6} /><span>{label}</span>{id === 'surprise' && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}</button>)}</nav>
    <div className="absolute bottom-7 left-7 right-7 border-t border-white/10 pt-5"><button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground" aria-label="Settings"><Settings2 size={16} />Settings</button><p className="mt-7 text-[10px] leading-5 text-muted-foreground/60">Made quietly,<br />with a lot of feeling.</p></div>
  </aside>;
}

function Topbar({ openMenu, onSearch }: { openMenu: () => void; onSearch: (value: string) => void }) {
  return <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/[.06] bg-[#0b1813]/85 px-5 backdrop-blur-xl md:px-10"><button className="md:hidden" onClick={openMenu} aria-label="Open menu"><Menu size={20} /></button><div className="relative hidden w-72 md:block"><Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} /><input onChange={(e) => onSearch(e.target.value)} placeholder="Find a song or memory" className="w-full rounded-full border border-white/10 bg-white/[.04] py-2 pl-10 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:border-primary/50" /></div><div className="flex items-center gap-5"><span className="mono hidden text-[10px] text-muted-foreground sm:inline">14 JUNE 2026</span><button aria-label="Notifications" className="text-muted-foreground hover:text-primary"><Bell size={17} /></button><div className="grid h-8 w-8 place-items-center rounded-full bg-accent/20 text-xs text-accent">H</div></div></header>;
}

function Player({ track, isPlaying, setPlaying, next, previous, liked, setLiked, audioRef, progress, setProgress, volume, setVolume, shuffle, setShuffle, repeat, setRepeat }: { track: Track; isPlaying: boolean; setPlaying: (v: boolean) => void; next: () => void; previous: () => void; liked: boolean; setLiked: (v: boolean) => void; audioRef: React.RefObject<HTMLAudioElement | null>; progress: number; setProgress: (v: number) => void; volume: number; setVolume: (v: number) => void; shuffle: boolean; setShuffle: (v: boolean) => void; repeat: boolean; setRepeat: (v: boolean) => void }) {
  return <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0c1712]/95 px-4 py-3 backdrop-blur-2xl md:px-8"><div className="mx-auto flex max-w-[1500px] items-center gap-4"><div className="flex min-w-0 flex-1 items-center gap-3 md:min-w-[235px]"><Cover src={track.cover} title={track.title} size="sm" className={isPlaying ? 'spin-slow' : ''} /><div className="min-w-0"><p className="truncate text-xs font-medium">{track.title}</p><p className="truncate text-[10px] text-muted-foreground">{track.artist}</p></div><button onClick={() => setLiked(!liked)} aria-label={liked ? 'Unlike song' : 'Like song'} className={liked ? 'text-accent' : 'text-muted-foreground'}><Heart size={16} fill={liked ? 'currentColor' : 'none'} /></button></div><div className="flex flex-1 flex-col items-center gap-1.5"><div className="flex items-center gap-4"><button onClick={() => setShuffle(!shuffle)} aria-label="Toggle shuffle" className={`hidden sm:block ${shuffle ? 'text-primary' : 'text-muted-foreground'}`}><Shuffle size={15} /></button><button onClick={previous} aria-label="Previous song"><SkipBack size={17} /></button><button onClick={() => setPlaying(!isPlaying)} aria-label={isPlaying ? 'Pause' : 'Play'} className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground hover:scale-105">{isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button><button onClick={next} aria-label="Next song"><SkipForward size={17} /></button><button onClick={() => setRepeat(!repeat)} aria-label="Toggle repeat" className={`hidden sm:block ${repeat ? 'text-primary' : 'text-muted-foreground'}`}><Repeat2 size={15} /></button></div><div className="flex w-full max-w-md items-center gap-2 text-[9px] text-muted-foreground"><span>{formatTime(progress)}</span><input aria-label="Seek song" type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="h-1 w-full accent-[hsl(var(--primary))]" /><span>{track.duration}</span></div></div><div className="hidden flex-1 items-center justify-end gap-3 md:flex"><Volume2 size={15} className="text-muted-foreground" /><input aria-label="Volume" type="range" min="0" max="1" step=".01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-24 accent-[hsl(var(--primary))]" /><AudioLines size={17} className={isPlaying ? 'text-primary' : 'text-muted-foreground'} /></div></div></footer>;
}

function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return <div className="mb-6 flex items-end justify-between"><div><p className="mono mb-2 text-[9px] uppercase tracking-[.28em] text-primary">{eyebrow}</p><h2 className="serif text-4xl tracking-tight text-[#e9e0d2]">{title}</h2></div>{action && <span className="text-xs text-muted-foreground">{action}</span>}</div>;
}
function Home({
  play,
  setView,
  recently,
  liked,
  search,
}: {
  play: (t: Track) => void;
  setView: (v: View) => void;
  recently: Track[];
  liked: Set<string>;
  search: string;
}) {
  const found = tracks.filter((t) =>
    `${t.title} ${t.artist}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-14 pb-28">
      <section
        className="reveal relative overflow-hidden rounded-[1.7rem] border border-white/10 p-7 md:p-12"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(7,16,12,.92) 0%, rgba(7,16,12,.65) 45%, rgba(7,16,12,.25) 100%), url('/assets/main-photo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-xl">
          <p className="mono mb-5 text-[10px] uppercase tracking-[.3em] text-primary">
            Hey,Piyush
          </p>

          <h1 className="serif text-6xl leading-[.9] md:text-8xl">
            You are
            <br />
            <em className="text-primary">home.</em>
          </h1>

          <p className="mt-6 max-w-sm text-sm leading-6 text-[#d1d0c3]">
            Every moment with you feels like music.
          </p>

          <button
            onClick={() => play(tracks[0])}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[.14em] text-primary-foreground"
          >
            <Play size={15} fill="currentColor" />
            Continue listening
          </button>
        </div>

        <div className="absolute -right-8 bottom-[-80px] hidden h-80 w-80 rounded-full border border-primary/30 md:block">
          <div className="absolute inset-8 rounded-full border border-primary/20">
            <div className="absolute inset-8 rounded-full border border-primary/20" />
          </div>
        </div>

        <div className="absolute right-12 top-12 mono text-[9px] uppercase tracking-[.3em] text-primary/50">
          Side A
          <br />
          for you
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="A little something"
          title="Featured playlist"
          action="6 collections"
        />

        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          {playlists.slice(0, 3).map((p, i) => (
            <button
              key={p.name}
              onClick={() => setView("playlists")}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 p-5 text-left transition-all hover:-translate-y-1 ${
                i === 0 ? "min-h-52 md:row-span-2" : "min-h-24"
              }`}
              style={{
                background: `linear-gradient(135deg, ${p.color}44, #112019 75%)`,
              }}
            >
              <div className="relative z-10">
                <span className="mono text-[9px] uppercase tracking-[.2em] text-primary/80">
                  {i === 0 ? "The essential collection" : "Playlist"}
                </span>

                <h3 className="serif mt-8 text-3xl text-[#eee3d3]">
                  {p.name}
                </h3>

                <p className="mt-1 max-w-[190px] text-xs text-muted-foreground">
                  {p.detail}
                </p>
              </div>

              <div className="absolute -bottom-8 -right-4 h-36 w-36 rotate-12 rounded-2xl bg-black/20 p-3 shadow-2xl">
                <Cover
                  src={p.cover}
                  title={p.name}
                  className="h-full w-full"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="The last few chapters"
          title="Recently played"
          action={
            recently.length ? `${recently.length} tracks` : "Nothing yet"
          }
        />

        {recently.length ? (
          <TrackList tracks={recently} play={play} liked={liked} />
        ) : (
          <div className="glass rounded-2xl p-10 text-center">
            <Disc3
              className="mx-auto mb-3 text-primary/70"
              size={30}
            />
            <p className="serif text-2xl">
              Your listening history begins here.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Press play on a song and it will find its way home.
            </p>
          </div>
        )}
      </section>

      {search && (
        <section>
          <SectionTitle
            eyebrow="Search results"
            title={found.length ? "Found for you" : "Nothing found"}
          />
          <TrackList tracks={found} play={play} liked={liked} />
        </section>
      )}

      <section>
        <SectionTitle eyebrow="Quick access" title="A few doors" />

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              v: "memories" as View,
              icon: ImageIcon,
              t: "Look back",
              d: "The gallery of us",
            },
            {
              v: "voice" as View,
              icon: Mic2,
              t: "Hear me",
              d: "Voice notes, saved",
            },
            {
              v: "wrapped" as View,
              icon: Sparkles,
              t: "Our year",
              d: "The numbers that matter",
            },
          ].map(({ v, icon: Icon, t, d }) => (
            <button
              onClick={() => setView(v)}
              key={v}
              className="glass flex items-center gap-4 rounded-2xl p-4 text-left transition hover:border-primary/40"
            >
              <Icon className="text-primary" size={20} />

              <div>
                <p className="text-sm">{t}</p>
                <p className="text-xs text-muted-foreground">{d}</p>
              </div>

              <ArrowRight
                size={15}
                className="ml-auto text-muted-foreground"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function TrackList({ tracks: list, play, liked }: { tracks: Track[]; play: (t: Track) => void; liked: Set<string> }) {
  return <div className="space-y-1">{list.map((t, i) => <div key={t.id} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[.045]"><span className="mono w-5 text-center text-[10px] text-muted-foreground">{String(i + 1).padStart(2, '0')}</span><button onClick={() => play(t)} className="relative" aria-label={`Play ${t.title}`}><Cover src={t.cover} title={t.title} size="sm" /><span className="absolute inset-0 grid place-items-center bg-black/45 opacity-0 transition group-hover:opacity-100"><Play size={14} fill="currentColor" /></span></button><div className="min-w-0 flex-1"><p className="truncate text-sm">{t.title}</p><p className="truncate text-xs text-muted-foreground">{t.artist}</p></div><span className="hidden text-xs text-muted-foreground md:block">{t.album}</span><Heart size={14} className={liked.has(t.id) ? 'text-accent' : 'text-muted-foreground/60'} fill={liked.has(t.id) ? 'currentColor' : 'none'} /><span className="mono w-9 text-right text-[10px] text-muted-foreground">{t.duration}</span><MoreHorizontal size={16} className="text-muted-foreground" /></div>)}</div>;
}

function Playlists({ play }: { play: (t: Track) => void }) {
  const [selected, setSelected] = useState(playlists[0]);
  const list = tracks.filter((t) => selected.trackIds.includes(t.id));
  return <div className="space-y-10 pb-28"><SectionTitle eyebrow="Collections" title="Our playlists" action="six chapters" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{playlists.map((p) => <button key={p.name} onClick={() => setSelected(p)} className={`glass group rounded-2xl p-3 text-left transition hover:-translate-y-1 ${selected.name === p.name ? 'border-primary/50' : ''}`}><Cover src={p.cover} title={p.name} className="h-44 w-full" /><p className="mt-4 px-1 text-sm">{p.name}</p><p className="mt-1 px-1 pb-2 text-xs text-muted-foreground">{p.detail}</p></button>)}</div><div className="glass rounded-2xl p-5 md:p-7"><div className="mb-6 flex items-center gap-4"><Cover src={selected.cover} title={selected.name} size="sm" /><div><p className="mono text-[9px] uppercase tracking-[.25em] text-primary">Now browsing</p><h3 className="serif text-3xl">{selected.name}</h3></div><button onClick={() => list[0] && play(list[0])} className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground" aria-label="Play playlist"><Play size={16} fill="currentColor" /></button></div><TrackList tracks={list} play={play} liked={new Set()} /></div></div>;
}

function Lyrics({ track, isPlaying }: { track: Track; isPlaying: boolean }) {
  const [at, setAt] = useState(0); const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (isPlaying && track.lyrics) setAt((v) => (v + 1) % track.lyrics!.length); }, [isPlaying, track.id]);
  useEffect(() => { ref.current?.querySelector('[data-active="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, [at]);
  return <div className="mx-auto max-w-5xl pb-28"><div className="mb-10 flex items-center gap-5"><Cover src={track.cover} title={track.title} size="sm" /><div><p className="mono text-[9px] uppercase tracking-[.25em] text-primary">Lyrics · {track.album}</p><h1 className="serif text-4xl">{track.title}</h1><p className="text-xs text-muted-foreground">{track.artist}</p></div></div>{track.lyrics ? <div ref={ref} className="scrollbar max-h-[55vh] space-y-5 overflow-auto py-10 text-center">{track.lyrics.map((l, i) => <p key={l.time} data-active={i === at} onClick={() => setAt(i)} className={`serif cursor-pointer px-5 text-3xl transition-all md:text-5xl ${i === at ? 'scale-105 text-primary' : 'text-muted-foreground/40 hover:text-muted-foreground'}`}>{l.line}</p>)}</div> : <div className="glass rounded-2xl p-14 text-center"><BookOpen className="mx-auto mb-5 text-primary" size={30} /><h2 className="serif text-3xl">This one is yours to write.</h2><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Personal lyrics haven't been added for this track yet. Replace the local media files and add timed lines in <span className="mono text-primary">src/data.ts</span>.</p></div>}</div>;
}

function Memories() {
  const [selected, setSelected] = useState<number | null>(null);
  return <div className="pb-28"><SectionTitle eyebrow="Still frames" title="Memories" action="a gallery of us" /><div className="columns-1 gap-4 sm:columns-2 lg:columns-3">{memories.map((m, i) => <button key={m.title} onClick={() => setSelected(i)} className="group mb-4 block w-full break-inside-avoid text-left"><div className="relative overflow-hidden rounded-2xl" style={{ background: fallback(m.title, ['#61473d','#3e594e','#536072','#7e5b58'][i]) }}><img src={m.src} alt={m.title} className="min-h-56 w-full object-cover transition duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><div className="absolute bottom-4 left-4"><p className="serif text-2xl">{m.title}</p><p className="text-xs text-white/60">{m.note}</p></div></div></button>)}</div>{selected !== null && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-5 backdrop-blur-sm" onClick={() => setSelected(null)}><button className="absolute right-6 top-6 text-white" aria-label="Close memory"><X /></button><div className="max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}><img src={memories[selected].src} alt={memories[selected].title} className="max-h-[80vh] w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><div className="bg-[#15241d] p-4"><p className="serif text-2xl">{memories[selected].title}</p><p className="text-xs text-muted-foreground">{memories[selected].note}</p></div></div></div>}</div>;
}

function VoiceNotes() {
  const [playing, setPlaying] = useState<number | null>(null);
  const names = ['The one I recorded twice', 'A tiny message for later']; const dates = ['02:14 · saved at 01:03', '00:47 · saved on a Tuesday'];
  return <div className="pb-28"><SectionTitle eyebrow="Unsent, then saved" title="Voice notes" action="press play, listen close" /><div className="grid gap-4 md:grid-cols-2">{names.map((n, i) => <div key={n} className="glass rounded-2xl p-5"><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent"><Mic2 size={20} /></div><button onClick={() => setPlaying(playing === i ? null : i)} className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground" aria-label={playing === i ? 'Pause voice note' : 'Play voice note'}>{playing === i ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}</button></div><h3 className="serif mt-7 text-3xl">{n}</h3><p className="mt-2 text-xs text-muted-foreground">{dates[i]}</p><div className="visualizer mt-7 flex h-8 items-end gap-1 opacity-70">{Array.from({length: 25}, (_, j) => <span key={j} className="w-1 rounded-full bg-primary" style={{ height: `${8 + ((j * 17) % 23)}px`, animationPlayState: playing === i ? 'running' : 'paused' }} />)}</div><p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-muted-foreground">Personal audio will appear here when you add <span className="mono text-primary">{media.voiceNotes[i]}</span>.</p></div>)}</div></div>;
}

function Timeline() {
  const events = [
    {
      date: '02 Jan 2025',
      title: 'First Meet',
      detail: 'That ultimate Raigbaiting towards each other.',
    },
    {
      date: '13 Feb 2025',
      title: 'You Confessed',
      detail: "All The Chaos That Night, Couldn't Forget.",
    },
    {
      date: '07 Apr 2026',
      title: 'Finally Together',
      detail: 'That Awkwardness At Khandala And The Best Feelings From There.',
    },
    {
      date: 'Today',
      title: 'Still Here',
      detail: 'The best chapter is the one we are writing now.',
    },
  ];

  return (
    <div className="pb-28">
      <SectionTitle
        eyebrow="Our story, in order"
        title="The timeline"
        action="four turning points"
      />

      <div className="relative mx-auto max-w-3xl py-8 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-px before:bg-primary/30 md:before:left-1/2">
        {events.map((e, i) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={e.title}
            className={`relative mb-14 pl-12 md:w-1/2 md:pl-0 ${
              i % 2
                ? 'md:ml-auto md:pl-12'
                : 'md:pr-12 md:text-right'
            }`}
          >
            <span
              className="absolute left-[9px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-[#0b1813] md:left-auto md:right-[-6px] md:translate-x-1/2"
              style={
                i % 2
                  ? { left: '-6px', right: 'auto' }
                  : undefined
              }
            />

            <p className="mono text-[9px] uppercase tracking-[.22em] text-primary">
              {e.date}
            </p>

            <h3 className="serif mt-2 text-4xl">
              {e.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {e.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
function Wrapped({ play }: { play: (t: Track) => void }) {
  return <div className="pb-28"><section className="relative min-h-[520px] overflow-hidden rounded-[1.7rem] border border-primary/20 p-8 md:p-16" style={{ background:'radial-gradient(circle at 80% 18%, #bd8d6e55, transparent 24%), radial-gradient(circle at 20% 82%, #4f816455, transparent 28%), #16251f' }}><Particles /><div className="relative z-10 max-w-3xl"><p className="mono text-[10px] uppercase tracking-[.35em] text-primary">Your year in us · 2026</p><h1 className="serif mt-10 text-7xl leading-[.8] md:text-[9rem]">Wrapped<br /><em className="text-primary">in love.</em></h1><p className="mt-10 max-w-md text-base leading-7 text-[#cbd0c3]">A completely unscientific, deeply accurate report on the year we kept choosing each other.</p><button onClick={() => play(tracks[1])} className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground"><Play size={14} fill="currentColor" /> Play the year</button></div></section><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['47.2','hours listening together'],['126','songs sent after midnight'],['08','cities in our story'],['∞','reasons, still']].map(([n,l],i) => <div className="glass rounded-2xl p-6" key={l}><p className="serif text-5xl text-primary">{n}</p><p className="mt-3 text-xs text-muted-foreground">{l}</p><div className="mt-8 h-1 rounded-full bg-primary/20"><div className="h-1 rounded-full bg-primary" style={{width:`${[72,84,51,100][i]}%`}} /></div></div>)}</div></div>;
}

function Surprise({ play }: { play: (t: Track) => void }) {
  const [open, setOpen] = useState(false);
  return <div className="pb-28"><AnimatePresence mode="wait">{!open ? <motion.section key="locked" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="relative overflow-hidden rounded-[1.7rem] border border-primary/20 p-8 text-center md:p-20" style={{background:'radial-gradient(circle at 50% 30%, #a77d6533, transparent 35%),#18251f'}}><div className="relative z-10 mx-auto max-w-lg"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary"><LockKeyhole size={28} /></div><p className="mono mt-8 text-[10px] uppercase tracking-[.32em] text-primary">One more thing</p><h1 className="serif mt-4 text-6xl">A secret<br /><em className="text-primary">for you.</em></h1><p className="mx-auto mt-6 max-w-sm text-sm leading-6 text-muted-foreground">There is a room behind this door. You have to promise to listen until the very end.</p><button onClick={() => setOpen(true)} className="glow mt-8 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[.16em] text-primary-foreground">Unlock the surprise</button></div></motion.section> : <motion.div key="open" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-8"><div className="glass overflow-hidden rounded-[1.7rem]"><div className="relative aspect-video bg-[#192a22]"><video controls className="h-full w-full object-cover" src={media.surpriseVideo} onError={(e)=>{e.currentTarget.style.display='none'}} /><div className="pointer-events-none absolute inset-0 grid place-items-center"><Sparkles className="text-primary/60" size={40}/></div></div><div className="p-7 md:p-10"><p className="mono text-[10px] uppercase tracking-[.3em] text-primary">You found it</p><h1 className="serif mt-3 text-6xl">Happy birthday,<br /><em className="text-primary">my love.</em></h1><p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">If I could give you one thing, it would be the ability to see yourself through my eyes for one ordinary day. You would understand why every song in here keeps finding its way back to you.</p><button onClick={() => play(tracks[2])} className="mt-7 inline-flex items-center gap-2 text-sm text-primary"><Play size={15} fill="currentColor"/> Play the special song</button></div></div><div><SectionTitle eyebrow="One more look" title="The little gallery" /><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{memories.map((m)=><Cover key={m.title} src={m.src} title={m.title} className="h-40 w-full" />)}</div></div></motion.div>}</AnimatePresence></div>;
}

function App() {
  const [entered, setEntered] = useState(false); const [view, setView] = useState<View>('home'); const [mobileOpen, setMobileOpen] = useState(false); const [current, setCurrent] = useState(tracks[0]); const [isPlaying, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [volume, setVolume] = useState(.8); const [shuffle, setShuffle] = useState(false); const [repeat, setRepeat] = useState(false); const [search, setSearch] = useState(''); const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set(JSON.parse(localStorage.getItem('forever-us-liked') || '[]'))); const [recentIds, setRecentIds] = useState<string[]>(() => JSON.parse(localStorage.getItem('forever-us-recent') || '[]')); const audioRef = useRef<HTMLAudioElement>(null);
  const recently = useMemo(() => recentIds.map(id => tracks.find(t => t.id === id)).filter(Boolean) as Track[], [recentIds]);
  useEffect(() => { localStorage.setItem('forever-us-liked', JSON.stringify([...likedIds])); }, [likedIds]); useEffect(() => { localStorage.setItem('forever-us-recent', JSON.stringify(recentIds)); }, [recentIds]);
  useEffect(() => { const a=audioRef.current; if (!a) return; a.volume=volume; }, [volume]);
  useEffect(() => { const a=audioRef.current; if (!a) return; const onTime=()=>setProgress(a.duration ? a.currentTime/a.duration*100 : 0); const onEnd=()=>repeat ? a.play() : next(); a.addEventListener('timeupdate',onTime); a.addEventListener('ended',onEnd); return ()=>{a.removeEventListener('timeupdate',onTime);a.removeEventListener('ended',onEnd)}; });
  useEffect(() => { const a=audioRef.current; if (!a) return; if (isPlaying) a.play().catch(()=>setPlaying(false)); else a.pause(); }, [isPlaying, current]);
  const play = (t: Track) => { setCurrent(t); setPlaying(true); setProgress(0); setRecentIds(prev => [t.id, ...prev.filter(id => id !== t.id)].slice(0, 6)); };
  const next = () => { const i=tracks.findIndex(t=>t.id===current.id); play(tracks[shuffle ? Math.floor(Math.random()*tracks.length) : (i+1)%tracks.length]); };
  const previous = () => { const i=tracks.findIndex(t=>t.id===current.id); play(tracks[(i-1+tracks.length)%tracks.length]); };
  const seek = (v: number) => { setProgress(v); if (audioRef.current?.duration) audioRef.current.currentTime = v/100*audioRef.current.duration; };
  if (!entered) return <Entry onEnter={() => setEntered(true)} />;
  return <div className="noise min-h-[100dvh] bg-[#0b1712]"><audio ref={audioRef} src={current.audio} /><div className="flex min-h-[100dvh]"><Sidebar view={view} setView={setView} mobileOpen={mobileOpen} close={() => setMobileOpen(false)} />{mobileOpen && <button className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}<div className="min-w-0 flex-1"><Topbar openMenu={() => setMobileOpen(true)} onSearch={setSearch} /><main className="mx-auto max-w-[1500px] p-5 md:p-10"><AnimatePresence mode="wait"><motion.div key={view} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.25}}>{view === 'home' && <Home play={play} setView={setView} recently={recently} liked={likedIds} search={search} />}{view === 'playlists' && <Playlists play={play} />}{view === 'lyrics' && <Lyrics track={current} isPlaying={isPlaying} />}{view === 'memories' && <Memories />}{view === 'voice' && <VoiceNotes />}{view === 'timeline' && <Timeline />}{view === 'wrapped' && <Wrapped play={play} />}{view === 'surprise' && <Surprise play={play} />}</motion.div></AnimatePresence></main></div></div><Player track={current} isPlaying={isPlaying} setPlaying={setPlaying} next={next} previous={previous} liked={likedIds.has(current.id)} setLiked={(v) => setLikedIds(prev => { const n=new Set(prev); v ? n.add(current.id) : n.delete(current.id); return n; })} audioRef={audioRef} progress={progress} setProgress={seek} volume={volume} setVolume={setVolume} shuffle={shuffle} setShuffle={setShuffle} repeat={repeat} setRepeat={setRepeat} /></div>;
}

export default App;
