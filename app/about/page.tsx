import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About — Zanathmar',
  description: 'A little bit about Izzan: developer, storyteller, and occasional overpacker.',
};

const stack = [
  'Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'GSAP', 'Python',
];

const countries = [
  'Saudi Arabia', 'Nepal', 'Thailand', 'Laos', 'Vietnam', 'Hong Kong', 'Macau',
  'Morocco', 'Turkey', 'and a fair chunk of Europe',
];

const childhoodPhotos = [
  { src: '/assets/images/minime3.jpg', alt: 'Izzan as a kid', caption: 'Me in Japan', rotate: '-rotate-3' },
  { src: '/assets/images/minime2.jpg', alt: 'Izzan on family trip', caption: 'First time in Europe', rotate: 'rotate-2' },
  { src: '/assets/images/minime1.jpg', alt: 'Izzan young traveler', caption: 'Childhood Adventures', rotate: '-rotate-1' },
];



const travelPhotos = [
  { src: '/assets/images/travel1.jpg', alt: 'Izzan traveling', caption: 'Team 5 ' },
  { src: '/assets/images/travel2.jpg', alt: 'Izzan backpacking', caption: 'Cruising in Sunset' },
  { src: '/assets/images/travel3.jpg', alt: 'Izzan in Volendam', caption: 'Pyramid of Giza' },
  { src: '/assets/images/travel4.jpg', alt: 'Izzan filming content', caption: 'Behind the scenes' },
  { src: '/assets/images/travel5.jpg', alt: 'Izzan exploring', caption: 'Media Team' },
  { src: '/assets/images/travel6.jpg', alt: 'Izzan with friends abroad', caption: 'Different crew, same road' },
];

const offDuty = [
  {
    title: 'Cooking',
    text: 'Trying to prove that developers can survive on more than instant noodles.',
    src: '/assets/images/offday1.jpg',
  },
  {
    title: 'Sport',
    text: 'I like any sport, but I play basketball and football the most. I also like to watch UFC.',
    src: '/assets/images/offday2.jpg',
  },
  {
    title: 'Hangouts',
    text: "I'm Software Engineering guy but it doesn't mean I don't like to hang out with friends in real life. Ofcource i touch some grass dude.",
    src: '/assets/images/offday3.jpg',
  },
  {
    title: 'Movies',
    text: 'Marvel, Star Wars, Disney etc — the same lineup since I was a kid.',
    src: '/assets/images/offday4.png',
  },
  {
    title: 'Food',
    text: 'Japanese food, always. It\u2019s basically the whole reason I want to go back to Japan.',
    src: '/assets/images/offday5.jpg',
  },
  {
    title: 'Coffee',
    text: 'Kopi Susu Tetangga Tuku, no sugar. Non-negotiable.',
    src: '/assets/images/offday6.jpg',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#f3f3f3] text-black">
      {/* intro */}
      <section className="relative px-4 pt-14 pb-10 tablet:px-6 tablet:pt-20 tablet:pb-16 desktop:px-20 desktop:pt-28 desktop:pb-20 overflow-hidden">
        <Link
          href="/"
          className="font-jakarta text-xs tablet:text-sm inline-flex items-center gap-1.5 mb-8 tablet:mb-10 border-2 border-primary-black rounded-xl px-3 py-1.5 hover:bg-primary-black hover:text-white transition-colors"
        >
          &larr;
        </Link>

        <div className="flex flex-col-reverse tablet:flex-row tablet:items-center gap-8 tablet:gap-12 desktop:gap-12">
          <div className="flex-1">
            <p className="font-jakarta text-xs tablet:text-sm font-bold uppercase tracking-widest mb-3">
              Origin story
            </p>
            <h1 className="font-serif text-xl tablet:text-7xl desktop:text-5xl font-bold leading-[0.95] mb-5 tablet:mb-6">
              Just a kid from Jakarta who loved exploring anything.
            </h1>
            <p className="font-jakarta text-lg tablet:text-base leading-relaxed max-w-xl">
              Alright, let's do this one last time.
              My name is Izzan Athmar. I study Software Engineering at IDN Boarding School, and for the past two years, I've been turning ideas into code and growing as a software developer. I've built websites, shipped projects, solved a lot of bugs, and probably created a few new ones along the way.
              The rest? Well... you're looking at it.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-52 tablet:w-72 desktop:w-80">
              <div className="border-2 border-primary-black rounded-2xl overflow-hidden shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                <Image
                  src="/assets/images/me.jpg"
                  alt="Izzan"
                  width={500}
                  height={600}
                  className="w-full h-auto aspect-[5/6] object-cover grayscale"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -left-4 bg-white border-2 border-primary-black rounded-full px-3 py-1.5 text-xs tablet:text-sm font-semibold shadow-[0px_3px_0px_0px_rgba(0,0,0,1)]">
                that&apos;s me
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* little me */}
      <section className="px-4 py-12 tablet:px-6 tablet:py-16 desktop:px-20 desktop:py-24 border-t-2 border-primary-black overflow-hidden">
        <p className="font-jakarta text-xs tablet:text-sm font-bold uppercase tracking-widest mb-3">
          Little me
        </p>
        <h2 className="font-serif text-3xl tablet:text-5xl desktop:text-6xl font-bold mb-5 tablet:mb-6">
          Before the code, there was Iron Man who inspired a boy who curious
          about the world.
        </h2>
        <p className="font-jakarta text-sm tablet:text-base leading-relaxed max-w-2xl mb-8 tablet:mb-10">
          Growing up I was glued to every Marvel movie I could get my hands on —
          Iron Man and the Avengers especially. I was obsessed with the Jarvis that Tony Stark had, and I wanted to build one too when i was older.
          Somewhere in there I also caught the travel bug early, tagging along on
          a family trip through Europe and Asia long before IDN Backpacker made it a habit.
          Funny how it comes full circle.
        </p>
        <div className="grid grid-cols-3 gap-4 tablet:gap-6 max-w-2xl">
          {childhoodPhotos.map((photo) => (
            <div
              key={photo.src}
              className={`group relative border-2 border-primary-black rounded-2xl overflow-hidden bg-white shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 hover:rotate-0 hover:scale-105 ${photo.rotate}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={300}
                height={375}
                className="w-full h-auto aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-jakarta text-white text-[9px] tablet:text-[11px]">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* travels */}
      <section className="px-4 py-12 tablet:px-6 tablet:py-16 desktop:px-20 desktop:py-24 bg-black text-white overflow-hidden">
        <p className="font-jakarta text-xs tablet:text-sm font-bold uppercase tracking-widest mb-3 text-white/70">
          The side quest
        </p>
        <h2 className="font-serif text-3xl tablet:text-5xl desktop:text-6xl font-bold mb-5 tablet:mb-6">
          By some other days, I&apos;m 20+ countries deep into a backpack I never
          quite pack light enough.
        </h2>
        <p className="font-jakarta text-sm tablet:text-base leading-relaxed max-w-2xl mb-4 text-white/85">
          Through the IDN Backpacker program, I'm glad that i was a Media Team member. I&apos;ve made scripts and Instagram
          Reels documenting the trip, planned itineraries on the fly, and even
          written it all down in a memoir — <em>Backpacker: 20 Countries Journey</em>
          — because apparently a passport full of stamps wasn&apos;t proof enough.
          Some of the stops along the way:
        </p>
        <p className="font-jakarta text-sm tablet:text-base leading-relaxed max-w-2xl mb-6 tablet:mb-8 text-white/85">
          Walking back through Volendam years later hit different — I&apos;d
          already been there once as a kid on that family trip through Europe,
          this time just with a different crew and a lot more stamps in between.
        </p>
        <div className="flex flex-wrap gap-2 tablet:gap-3 mb-8 tablet:mb-10">
          {countries.map((country) => (
            <span
              key={country}
              className="font-jakarta text-xs tablet:text-sm border border-white/40 rounded-full px-3 py-1.5"
            >
              {country}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 tablet:grid-cols-3 gap-4 tablet:gap-6">
          {travelPhotos.map((photo) => (
            <div
              key={photo.src}
              className="group relative border-2 border-white/60 rounded-2xl overflow-hidden bg-white/5"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={500}
                className="w-full h-auto aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/80 px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-jakarta text-white text-[9px] tablet:text-[11px]">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* off duty */}
      <section className="px-4 py-12 tablet:px-6 tablet:py-16 desktop:px-20 desktop:py-24">
        <p className="font-jakarta text-xs tablet:text-sm font-bold uppercase tracking-widest mb-3">
          Off the clock
        </p>
        <h2 className="font-serif text-3xl tablet:text-5xl desktop:text-6xl font-bold mb-5 tablet:mb-6">
          When I&apos;m not shipping code or chasing flights.
        </h2>
        <div className="grid tablet:grid-cols-3 gap-4 tablet:gap-6">
          {offDuty.map((item) => (
            <div
              key={item.title}
              className="group border-2 border-primary-black rounded-2xl overflow-hidden bg-white shadow-[0px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="relative">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={400}
                  height={280}
                  className="w-full h-auto aspect-[3/2] object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="p-5">
                <p className="font-serif text-lg tablet:text-xl font-bold mb-2">{item.title}</p>
                <p className="font-jakarta text-xs tablet:text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* closing cta */}
      
    </main>
  );
}