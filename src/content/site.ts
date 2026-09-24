// Structured content, kept apart from layout. Everything here is fictional.
import type { ImageKey } from '../lib/images';

/** Per-breakpoint object-position. Keeps crops configurable without touching layout. */
export type Crop = { mobile: string; tablet?: string; desktop?: string };

export const nav = [
  { label: 'Work', to: '/work', note: 'The collection' },
  { label: 'Services', to: '/services', note: 'What we do, mostly' },
  { label: 'People', to: '/people', note: 'The Pantheon' },
  { label: 'Culture', to: '/culture', note: 'House rules, some carved' },
  { label: 'About', to: '/about', note: 'The long version is an epic' },
  { label: 'Contact', to: '/contact', note: 'Start something' },
] as const;

export const hero = {
  image: 'zeus-blue-sky-hero' as ImageKey,
  alt: 'Low-angle photograph of a weathered marble statue of a bearded god wearing black sunglasses, set against a deep blue Mediterranean sky.',
  crop: { mobile: '71% 30%', tablet: '66% 30%', desktop: '60% 35%' } satisfies Crop,
  lineA: 'Higher ideas',
  lineB: 'for a lower world.',
  intro:
    'Olympus is an independent creative agency for brands that would rather be remembered than reassured. Strategy, identity, campaigns and experiences — made by a very small, very senior team.',
  /** Carved into the meta rail. The live readouts next to it are built in Hero.tsx. */
  inscription: 'ΟΛΥΜΠΟΣ',
  est: 'Est. c. 1200 BC',
  scroll: 'Scroll. Ancient format, still undefeated.',
};

export const manifesto = [
  { t: 'We believe in the', em: 'unreasonable idea.' },
  { t: 'The thought that', em: 'won’t sit still.' },
  { t: 'The brand that dares to be', em: 'remembered.' },
];

export type Project = {
  slug: string;
  client: string;
  discipline: string;
  year: string;
  line: string;
  image: ImageKey;
  alt: string;
  crop: Crop;
  scope: string[];
  layout: 'portrait-left' | 'bleed' | 'square-right' | 'offset';
  caseStudy: {
    brief: { label: string; title: string; body: string };
    idea: { label: string; statement: string; body: string };
    system: { label: string; title: string; body: string; principles: string[] };
    outcome: { label: string; title: string; body: string };
    media: {
      galleryLabel: string;
      detail: { image: ImageKey; alt: string; caption: string };
      campaign: { image: ImageKey; alt: string; caption: string };
      materials: { image: ImageKey; alt: string; caption: string };
      film: { src: string; label: string; caption: string };
    };
  };
};

export const conceptNotice = 'Fictional concept — no real client';

export const projects: Project[] = [
  {
    slug: 'vela',
    client: 'VELA',
    discipline: 'Fashion identity',
    year: '2026',
    line: 'A house identity cut like the collection: severe, soft, and impossible to mistake.',
    image: 'fashion-campaign',
    alt: 'An ivory sculptural gown on a faceless mannequin, standing on a flat cobalt-blue ground among ancient marble columns.',
    crop: { mobile: '50% 40%' },
    scope: ['Identity', 'Art direction', 'Campaign'],
    layout: 'portrait-left',
    caseStudy: {
      brief: {
        label: 'The brief',
        title: 'Make restraint impossible to ignore.',
        body: 'VELA is an imagined fashion house built around sculptural form. Its first collection needed an identity that could feel unmistakable without competing with the clothes. The concept brief asked for presence, not noise.',
      },
      idea: {
        label: 'The idea',
        statement: 'Quiet is a form of force.',
        body: 'Let the silhouette do the talking. Hard light, generous space, and one decisive frame give the collection its own gravity.',
      },
      system: {
        label: 'The system',
        title: 'A house language cut to the bone.',
        body: 'The proposed direction moves between severe and soft: blunt typography against sculptural fabric, a cool field of colour against warm stone, and layouts that leave room for the unexpected.',
        principles: [
          'Shape before decoration',
          'Space as a signature',
          'Campaign images with the confidence to stand alone',
        ],
      },
      outcome: {
        label: 'The outcome',
        title: 'A direction, ready to become a world.',
        body: 'This is an editorial concept, not a launched identity. The campaign images, material studies and motion piece show the intended direction; no client approval, audience response, or commercial result is claimed.',
      },
      media: {
        galleryLabel: 'Campaign and identity studies',
        detail: {
          image: 'vela-fabric-detail',
          alt: 'Close view of sculptural ivory fabric folds, hard sunlight and a strip of cobalt-blue ground.',
          caption: 'Material study / Form held by light',
        },
        campaign: {
          image: 'vela-silhouette',
          alt: 'Faceless mannequin in an ivory sculptural gown at the edge of a marble colonnade above a cobalt-blue floor.',
          caption: 'Campaign study / Space as a signature',
        },
        materials: {
          image: 'vela-material-study',
          alt: 'Unmarked ivory paper, sculptural fabric and a cobalt-blue card arranged on sunlit travertine.',
          caption: 'Identity study / Paper, cloth, colour',
        },
        film: {
          src: '/media/vela-motion-study.mp4',
          label: 'VELA motion study',
          caption: 'Motion study / 00:09 / silent',
        },
      },
    },
  },
  {
    slug: 'northline',
    client: 'NORTHLINE',
    discipline: 'Architecture',
    year: '2026',
    line: 'Positioning a practice that builds for the next five hundred years, not the next five.',
    image: 'architecture-campaign',
    alt: 'A brutalist travertine monolith beside a single ancient Doric column, raking Mediterranean light and a still reflecting pool.',
    crop: { mobile: '30% 50%', tablet: '40% 50%', desktop: '50% 55%' },
    scope: ['Brand strategy', 'Naming', 'Identity', 'Film'],
    layout: 'bleed',
    caseStudy: {
      brief: {
        label: 'The brief',
        title: 'Give permanence a point of view.',
        body: 'NORTHLINE is an imagined architecture practice working between civic scale and intimate detail. The concept brief called for a name and identity that could speak about longevity without borrowing the usual language of luxury or progress.',
      },
      idea: {
        label: 'The idea',
        statement: 'Built to outlast the moment.',
        body: 'Put the ancient and the new in the same frame. The distance between them becomes the argument: good architecture belongs to its time and remains useful beyond it.',
      },
      system: {
        label: 'The system',
        title: 'A visual language with weight.',
        body: 'The proposed identity takes its cues from architectural plans and stone itself: decisive geometry, warm mineral colour, deep shadow, and space left deliberately unfilled. Print pieces feel measured rather than embellished.',
        principles: [
          'A name that sets direction',
          'Geometry as the organising device',
          'Material evidence over ornamental claims',
        ],
      },
      outcome: {
        label: 'The outcome',
        title: 'A practice imagined for the long view.',
        body: 'The name, imagery and motion study form a proposed brand world for a fictional practice. No buildings were commissioned, identity was launched, or audience response measured.',
      },
      media: {
        galleryLabel: 'Architecture and identity studies',
        detail: {
          image: 'northline-detail',
          alt: 'Warm travertine wall meeting a still reflecting pool, with a weathered column at the edge and a long geometric shadow.',
          caption: 'Material study / Stone and shadow',
        },
        campaign: {
          image: 'northline-campaign',
          alt: 'Ancient stone column in the foreground across a reflecting basin from a severe modern travertine building.',
          caption: 'Campaign study / Two times in one frame',
        },
        materials: {
          image: 'northline-materials',
          alt: 'Architectural paper, a charcoal cover and a small travertine block arranged on a sunlit stone table.',
          caption: 'Identity study / Paper and stone',
        },
        film: {
          src: '/media/northline-motion-study.mp4',
          label: 'NORTHLINE motion study',
          caption: 'Motion study / 00:09 / silent',
        },
      },
    },
  },
  {
    slug: 'helio',
    client: 'HELIO',
    discipline: 'Culture / Music',
    year: '2026',
    line: 'A summer festival that asked for a poster and got a sunrise.',
    image: 'culture-campaign',
    alt: 'A white marble hand reaching toward a blazing orange sun disc against an ultramarine sky above a coastline.',
    crop: { mobile: '60% 40%' },
    scope: ['Campaign', 'Experience', 'Motion'],
    layout: 'square-right',
    caseStudy: {
      brief: {
        label: 'The brief',
        title: 'Make a summer gathering feel inevitable.',
        body: 'HELIO is an imagined music and culture festival on the Mediterranean coast. The concept brief asked for an identity that could move from a single announcement to a place, a ticket and a shared moment, without losing its charge.',
      },
      idea: {
        label: 'The idea',
        statement: 'Follow the sun.',
        body: 'One orange disc becomes the event’s signal. Against ultramarine and pale stone, it reads as a poster from a distance, a stage from above, and a destination at the end of the day.',
      },
      system: {
        label: 'The system',
        title: 'One symbol. A whole horizon.',
        body: 'The proposed campaign holds to three elements: the solar circle, an electric blue field, and flashes of weathered marble. Repetition builds recognition while scale changes the feeling from intimate print to monumental space.',
        principles: [
          'A circle that carries the campaign',
          'Blue and orange with no apology',
          'An experience imagined from the first frame',
        ],
      },
      outcome: {
        label: 'The outcome',
        title: 'A festival world before the first note.',
        body: 'The campaign images, printed-material study and motion piece explore a fictional event identity. No festival took place, tickets were sold, or attendance and cultural impact measured.',
      },
      media: {
        galleryLabel: 'Campaign and experience studies',
        detail: {
          image: 'helio-detail',
          alt: 'Empty marble amphitheatre at blue hour with a luminous orange disc on its stage above the sea.',
          caption: 'Experience study / The sun takes the stage',
        },
        campaign: {
          image: 'helio-campaign',
          alt: 'Pale coastal stone stairway descending toward an oversized orange sun above an ultramarine sea.',
          caption: 'Campaign study / A destination in sight',
        },
        materials: {
          image: 'helio-materials',
          alt: 'Unprinted blue folded poster, orange circular card and blank ivory ticket on a marble ledge by the sea.',
          caption: 'Identity study / Circle, colour, invitation',
        },
        film: {
          src: '/media/helio-motion-study.mp4',
          label: 'HELIO motion study',
          caption: 'Motion study / 00:09 / silent',
        },
      },
    },
  },
  {
    slug: 'aura',
    client: 'AURA',
    discipline: 'Technology',
    year: '2026',
    line: 'Launching a device that does less, beautifully. The campaign followed suit.',
    image: 'technology-campaign',
    alt: 'A reflective obsidian audio device with a glowing circular halo interface resting on a marble plinth in a sunlit modernist courtyard.',
    crop: { mobile: '28% 60%', tablet: '32% 60%', desktop: '40% 60%' },
    scope: ['Launch strategy', 'Product film', 'Content system'],
    layout: 'offset',
    caseStudy: {
      brief: {
        label: 'The brief',
        title: 'Let the product make room for life.',
        body: 'AURA is an imagined personal audio device with one luminous control and no visual clutter. The concept brief asked for a launch direction that could explain its restraint through feeling and form, without inventing features or specifications.',
      },
      idea: {
        label: 'The idea',
        statement: 'Less to see. More to feel.',
        body: 'Give the object space, then let its single halo become the signal. The campaign moves between an intimate material detail and a quiet architectural setting where the product feels considered rather than announced.',
      },
      system: {
        label: 'The system',
        title: 'A launch held in one line of light.',
        body: 'The proposed system pairs reflective obsidian with pale marble, clean blue air, and a fine warm ring. Crops shift from close product evidence to large fields of calm; packaging follows the same reduction.',
        principles: [
          'The halo as a consistent visual cue',
          'Product form before feature language',
          'Quiet space around every object',
        ],
      },
      outcome: {
        label: 'The outcome',
        title: 'A product world, deliberately unfinished.',
        body: 'These images and the silent motion study propose a launch language for a fictional device. They do not describe a manufactured product, tested capability, commercial launch, or measured result.',
      },
      media: {
        galleryLabel: 'Product and identity studies',
        detail: {
          image: 'aura-detail',
          alt: 'Close view of a reflective black oval audio device and its thin luminous ring against pale stone and sea light.',
          caption: 'Product study / One line of light',
        },
        campaign: {
          image: 'aura-campaign',
          alt: 'Small black halo-lit device alone on a long travertine bench in a spare courtyard opening toward the sea.',
          caption: 'Campaign study / Space around the signal',
        },
        materials: {
          image: 'aura-materials',
          alt: 'Reflective black audio device beside an unmarked black box and blank ivory card on a marble surface.',
          caption: 'Identity study / The unboxing moment',
        },
        film: {
          src: '/media/aura-motion-study.mp4',
          label: 'AURA motion study',
          caption: 'Motion study / 00:09 / silent',
        },
      },
    },
  },
];

export const services = [
  {
    name: 'Strategy',
    line: 'Finding the true thing and saying it before anyone else can.',
    caps: ['Positioning', 'Research & insight', 'Brand architecture', 'Naming'],
  },
  {
    name: 'Brand',
    line: 'Identities built to be recognised from across the room — and from across the century.',
    caps: ['Identity systems', 'Verbal identity', 'Typography', 'Guidelines'],
  },
  {
    name: 'Campaign',
    line: 'Ideas with enough gravity to move people, markets and occasionally weather.',
    caps: ['Integrated campaigns', 'Film', 'Out of home', 'Print'],
  },
  {
    name: 'Content',
    line: 'A steady supply of things worth looking at, built as systems rather than one-offs.',
    caps: ['Social', 'Editorial', 'Photography', 'Motion'],
  },
  {
    name: 'Experiences',
    line: 'Rooms, launches and gatherings people talk about for longer than they lasted.',
    caps: ['Events', 'Spatial', 'Retail', 'Digital products'],
  },
  {
    name: 'Other Divine Interventions',
    line: 'For the brief that fits none of the above. Those are our favourite.',
    caps: ['Crisis', 'Reinvention', 'Miracles, by appointment'],
    em: true,
  },
];

export type God = {
  name: string;
  role: string;
  line: string;
  /** The previous job title. Dry, one sentence. */
  formerly: string;
  image: ImageKey;
  alt: string;
  crop: Crop;
  accent?: 'gold' | 'aegean' | 'apollo';
};

export const pantheon: God[] = [
  {
    name: 'Zeus',
    role: 'CEO',
    line: 'Big ideas. Bigger budgets.',
    formerly: 'Formerly king of the gods. Still does the weather.',
    image: 'zeus-portrait',
    alt: 'Zeus: close crop of a bearded marble statue in black sunglasses against blue sky.',
    crop: { mobile: '50% 30%' },
    accent: 'gold',
  },
  {
    name: 'Athena',
    role: 'Executive Creative Director',
    line: 'Discipline creates freedom.',
    formerly: 'Formerly wisdom, war and one entire city.',
    image: 'athena-ecd',
    alt: 'Athena: marble bust in a crested helmet with a severe gaze, a single blue paint-marker slash on the backdrop.',
    crop: { mobile: '50% 30%' },
    accent: 'aegean',
  },
  {
    name: 'Hermes',
    role: 'Strategy',
    line: 'Same day. Different hemisphere.',
    formerly: 'Formerly messenger of the gods. Now answers email within the hour.',
    image: 'hermes-strategy',
    alt: 'Hermes: marble bust in a winged helmet and dark sunglasses against a motion-blurred blue backdrop.',
    crop: { mobile: '50% 25%' },
  },
  {
    name: 'Apollo',
    role: 'Creative',
    line: 'A little brighter. A little louder.',
    formerly: 'Formerly the sun, music and prophecy. Kept the sun.',
    image: 'apollo-creative',
    alt: 'Apollo: curly-haired marble sculpture in orange acetate sunglasses, lit by hard flash and an orange glow.',
    crop: { mobile: '50% 25%' },
    accent: 'apollo',
  },
  {
    name: 'Dionysus',
    role: 'Culture / Experiences',
    line: 'Work hard. Party harder.',
    formerly: 'Formerly wine, theatre and revelry. Role largely unchanged.',
    image: 'dionysus-culture',
    alt: 'Dionysus: expressive marble bust with ivy in its hair, head tipped back under violet stage light.',
    crop: { mobile: '50% 30%' },
  },
  {
    name: 'Artemis',
    role: 'Production',
    line: 'On time. On target.',
    formerly: 'Formerly the hunt and the moon. Now hunts deadlines.',
    image: 'artemis-production',
    alt: 'Artemis: marble bust with tied hair and a direct gaze, sharp light with a sage-green shadow.',
    crop: { mobile: '50% 25%' },
  },
];

export const proof = [
  { n: '6', label: 'gods' },
  { n: '12', label: 'disciplines' },
  { n: '1', label: 'unreasonable standard' },
];

export const workNote = 'Four imagined collaborations. The clients are fictional concepts; the standards are not.';

export const proofFacts = [
  { label: 'Status', body: 'A fictional independent agency, imagined in 2026. Operational since roughly the Bronze Age, if the mythology is to be believed.' },
  { label: 'Collaborators', body: 'A small-team model built around the right directors, makers and specialists for each brief. Real collaborator locations are still to be confirmed.' },
  { label: 'Working model', body: 'Senior people on every brief, from the first meeting to the final file. No pitch-and-vanish handoff.' },
];

export const contact = {
  email: 'john@duggan.design',
  emailNote: 'The summit is fictional. The inbox is real.',
};

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/jondoogin/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jondoogin' },
  { label: 'Behance', href: 'https://behance.net/jondoogin' },
  { label: 'Dribbble', href: 'https://dribbble.com/jondoogin' },
];

/* ---------------------------------------------------------------------------
   Voice: two registers.
   Ancient: carved, Greek, museum-label. Screen: system readouts that know they
   are being shown on glass. One joke per block, never explained.
   --------------------------------------------------------------------------- */

/** Museum labels under the pacing images. `note` is the screen-aware second line. */
export const figures = {
  columns: {
    caption: 'Fig. 1 — The old office. Good light, no heating.',
    note: 'Pentelic marble, c. 447 BC. Digitised 2026. Not to scale; your screen is smaller.',
  },
  clouds: {
    caption: 'Fig. 2 — The commute.',
    note: 'Actual clouds may vary with screen brightness.',
  },
};

/** Maxims from the forecourt at Delphi, with house commentary. Culture page. `·` is the carver's word divider. */
export const maxims = [
  { greek: 'ΓΝΩΘΙ · ΣΕΑΥΤΟΝ', english: 'Know thyself.', note: 'Then know the audience. In that order.' },
  { greek: 'ΜΗΔΕΝ · ΑΓΑΝ', english: 'Nothing in excess.', note: 'Dionysus has requested an exemption. It is under review.' },
  { greek: 'ΕΓΓΥΑ · ΠΑΡΑ Δ’ ΑΤΗ', english: 'Make a pledge and ruin is near.', note: 'We don’t promise what we can’t ship.' },
];

export const maximsIntro = {
  title: 'Carved at Delphi, c. 600 BC.',
  em: 'Reposted without permission.',
  note: 'The rules were written on a temple wall so nobody could say they missed the memo. We kept three.',
};

export const contactNote = 'Send the first thought. The useful details can follow.';

export const footerLines = {
  carved: 'Carved in React. Rendered on glass. No marble was harmed.',
  end: 'You have reached the end of the scroll. Unlike the Library of Alexandria, this one will still be here tomorrow.',
};

export const oracleStatus = 'The oracle is online';

/** Browser-tab titles. `away` shows while the visitor is in another tab. */
export const titles = {
  home: 'OLYMPUS — Creative Agency',
  suffix: ' — OLYMPUS',
  concept: 'Fictional Concept',
  notFound: 'Lost to antiquity',
  away: 'Come back, mortal.',
};

export const notFound = {
  title: 'Lost to',
  em: 'antiquity.',
  lead: 'This page has been lost to antiquity. The archaeologists have been notified; expect a fragment by 2031.',
  link: 'Return to the summit',
};

/** Interior routes. These describe the fictional practice, not real clients or staff. */
export const interior = {
  work: {
    n: '02', label: 'Work', title: ['Selected'], em: 'work.',
    lead: 'Concept projects for fictional clients, made to the standard we would hold real ones to. Each case study is a proposed direction, not a launched commission.',
  },
  services: {
    n: '03', label: 'Services', title: ['What we'], em: 'do, mostly.',
    lead: 'The right answer changes with the question. These are the disciplines we bring together, from the first difficult conversation to the final file.',
    sections: [
      { title: 'Find the point of view.', body: 'Strategy starts by deciding what a brand can own and what it should leave alone. We turn research, context and a candid conversation into a position that can guide real decisions.', points: ['Positioning and audience insight', 'Brand architecture and naming', 'A brief everyone can use'], related: 'northline' },
      { title: 'Make it unmistakable.', body: 'An identity should work in a single glance and still reward a second look. We build the visual and verbal rules that keep a brand coherent without making every expression identical.', points: ['Visual and verbal identity', 'Typography and art direction', 'A working system, not a static book'], related: 'vela' },
      { title: 'Give the idea distance.', body: 'A campaign needs an idea strong enough to travel across formats. We shape the central thought, then make each execution feel native to its place.', points: ['Campaign platforms', 'Film, print and out of home', 'Launch concepts and rollout'], related: 'helio' },
      { title: 'Keep making it matter.', body: 'Content earns attention through consistency and craft. We design repeatable editorial systems, then make the individual pieces worth stopping for.', points: ['Editorial direction', 'Photography and motion', 'Social content systems'], related: 'aura' },
      { title: 'Make a place for it.', body: 'Sometimes the brand needs a room, a screen or a moment people can enter. We connect the identity to spatial, event and digital experiences.', points: ['Experiences and launches', 'Retail and spatial concepts', 'Digital product direction'], related: 'helio' },
      { title: 'Bring us the strange one.', body: 'A brief that crosses categories is often the most interesting. We assemble the right small team around the problem and make the scope clear before the work begins.', points: ['Reinvention and unusual briefs', 'Senior partners at every stage', 'A defined route from idea to delivery'] },
    ],
  },
  people: {
    n: '04', label: 'People', title: ['Senior by'], em: 'several millennia.',
    lead: 'Meet the fictional leadership of OLYMPUS. Six familiar names, recast as a small creative agency with very contemporary opinions.',
    intro: 'No anonymous departments. Each discipline has a face and a point of view; every brief gets the people who will actually make the work.',
    note: 'Fictional agency and characters — these are creative personae, not staff biographies.',
    bios: [
      'Sets the ambition, then asks whether the idea is brave enough to deserve it. Zeus keeps the agency focused on work that can stand in the open.',
      'Treats clarity as a creative act. Athena makes the argument behind the work as exacting as the work itself.',
      'Finds the useful signal in a crowded landscape. Hermes moves between research, language and the next conversation.',
      'Turns a strong thought into a vivid public moment. Apollo brings light, rhythm and an ear for what people will remember.',
      'Believes culture is made together. Dionysus gives gatherings, stories and unexpected encounters a reason to happen.',
      'Makes the promise executable. Artemis protects the details, the schedule and the people doing the making.',
    ],
  },
  culture: {
    n: '07', label: 'Culture', title: ['How we'], em: 'behave.',
    lead: 'A few house rules for making ambitious work with other people. The old inscriptions are good; the daily practice matters more.',
    sections: [
      { title: 'Disagree in the room.', body: 'A sharper idea survives a candid conversation. We challenge the work early, make decisions openly and leave the performance out of feedback.', points: ['Direct critique', 'Clear ownership', 'Credit shared with the makers'] },
      { title: 'Make space for obsession.', body: 'The smallest detail can carry the whole idea. We protect time for craft, then know when to stop polishing and put the work into the world.', points: ['A strong reason for every choice', 'Time to make and remake', 'Deadlines treated as design constraints'] },
      { title: 'Gather on purpose.', body: 'Good work happens around a table as well as on a screen. We make room for collaborators, experiments and the occasional Dionysus-approved celebration.', points: ['Small teams around each brief', 'Open exchange across disciplines', 'Rituals worth keeping'] },
    ],
    note: 'There are no open roles or public events to list at present. Any future opportunity will appear here with real details.',
  },
  about: {
    n: '01', label: 'About', title: ['The short'], em: 'version.',
    lead: 'OLYMPUS is a fictional independent creative agency founded in 2026 by six partners with a long shared mythology and a strong opinion about modern brands.',
    sections: [
      { title: 'Small by design.', body: 'The imagined working model is deliberately direct: the people in the first conversation stay close to the final work. Strategy, creative and production meet around one clear idea.', points: ['Senior people on every brief', 'The right collaborators for the work', 'No pitch-and-vanish handoff'] },
      { title: 'Built to be remembered.', body: 'We favour a distinctive point of view over another polished version of the expected. That means understanding the audience, then finding the courage to make a choice.', points: ['Clarity before spectacle', 'Systems that can grow', 'Craft at every scale'] },
      { title: 'An open invitation.', body: 'The four projects on this site are fictional studies of what this practice might make. They show an approach and a standard, without claiming clients, launches or results that do not exist.', points: ['Explore the concept work', 'Bring a real question', 'Start with a conversation'], related: 'vela' },
    ],
  },
  contact: {
    n: '06', label: 'Contact', title: ['Start'], em: 'something.',
    lead: 'Tell us what you are trying to change. Start with an email; a polished deck can wait.',
    sections: [
      { title: 'A useful first brief.', body: 'Start with the problem, the audience and what needs to be different. A polished deck is optional; an honest question is much more useful.', points: ['What are you making or changing?', 'Who needs to care?', 'What decision or date is driving the work?'] },
      { title: 'How we would begin.', body: 'We would agree on the question, the people in the room and the shape of the work before proposing a direction. Scope and timing should be clear enough to build trust.', points: ['A conversation about the brief', 'A defined team and scope', 'A plan for making and reviewing'] },
    ],
    note: 'Email opens your mail app. There is no standalone submission form or published office address.',
  },
} as const;
