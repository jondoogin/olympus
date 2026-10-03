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
  context: { business: string; audience: string; assignment: string; constraint: string };
  application: { label: string; title: string; subtitle: string; rows: [string, string][]; footer: string; caption: string };
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

export const projectContextLabels: Record<string, string> = { business: 'The business', audience: 'Who it serves', assignment: 'Our assignment', constraint: 'The constraint' };

export const conceptNotice = 'Fictional concept — no real client';

export const projects: Project[] = [
  {
    slug: 'vela',
    client: 'VELA',
    discipline: "Made-to-order clothing",
    year: '2026',
    line: "A first collection of six occasion pieces, built around appointments rather than endless stock.",
    image: 'fashion-campaign',
    alt: 'An ivory sculptural gown on a faceless mannequin, standing on a flat cobalt-blue ground among ancient marble columns.',
    crop: { mobile: '50% 40%' },
    scope: ['Identity', 'Art direction', 'Campaign'],
    layout: 'portrait-left',
    context: {
      business: "A small Athens clothing studio making sculptural occasionwear to order.",
      audience: "People buying one considered piece for a wedding, dinner or important occasion.",
      assignment: "Introduce Collection 01 and explain the appointment-to-fitting process.",
      constraint: "A six-piece collection; no seasonal catalogue or retail network."
    },
    application: {
      label: "Collection / appointment card",
      title: "VELA",
      subtitle: "Collection 01 — made for your occasion",
      rows: [
        [
          "01 / COLUMN",
          "Ivory crepe · dress"
        ],
        [
          "02 / FOLD",
          "Cotton poplin · top"
        ],
        [
          "03 / LINE",
          "Wool twill · trouser"
        ]
      ],
      footer: "Choose a piece. Meet the studio. Make it yours.",
      caption: "Collection card / Three of six pieces, with a clear route to a fitting."
    },
    caseStudy: {
      brief: {
        label: "The assignment",
        title: "Introduce the clothes. Explain the commitment.",
        body: "The studio’s first six-piece collection needs more than a beautiful launch image. Customers need to understand what is made to order, how a fitting works, and why they should book an appointment before an occasion. The identity has to work on a garment label as well as a campaign."
      },
      idea: {
        label: "The idea",
        statement: "Made for the moment you keep.",
        body: "Treat the garment as the lasting part of an occasion. The campaign gives each silhouette space; the collection language gives each piece a name, a material and a place in a wardrobe."
      },
      system: {
        label: "The system",
        title: "From first impression to first fitting.",
        body: "Ivory and cobalt connect the campaign to the studio’s practical materials. Numbered styles make a small collection easy to navigate. Short, direct instructions make the service feel personal without making the process mysterious.",
        principles: [
          "Number every style consistently across lookbook and order card.",
          "Show material and silhouette before a mood or promise.",
          "End each collection touchpoint with an appointment invitation."
        ]
      },
      outcome: {
        label: "The proposed kit",
        title: "A launch kit for a small studio.",
        body: "The proposed kit includes a collection card, garment naming, appointment language and campaign direction. A useful next test would be whether a new customer can explain how to order after reading the card. No garments or customer orders are represented as real."
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
          caption: 'Palette study / Paper, cloth, colour',
        },
        film: {
          src: '/media/vela-motion-study.mp4',
          label: 'VELA motion study',
          caption: 'Art-direction motion study / 00:09 / silent',
        },
      },
    },
  },
  {
    slug: 'northline',
    client: 'NORTHLINE',
    discipline: "Civic architecture",
    year: '2026',
    line: "An identity for a practice turning underused public buildings into useful places again.",
    image: 'architecture-campaign',
    alt: 'A brutalist travertine monolith beside a single ancient Doric column, raking Mediterranean light and a still reflecting pool.',
    crop: { mobile: '30% 50%', tablet: '40% 50%', desktop: '50% 55%' },
    scope: ['Positioning', 'Identity', 'Proposal system'],
    layout: 'bleed',
    context: {
      business: "An independent architecture practice focused on reuse of civic buildings.",
      audience: "Municipal project teams, community organisations and public funding panels.",
      assignment: "Make the practice’s approach legible in proposals and public consultation.",
      constraint: "Explain what is retained, what changes and who benefits before showing a hero render."
    },
    application: {
      label: "Practice / project sheet",
      title: "NORTHLINE",
      subtitle: "Existing places. New public life.",
      rows: [
        [
          "N / 014",
          "Harbour Reading Room"
        ],
        [
          "RETAIN",
          "Masonry shell + courtyard"
        ],
        [
          "ADD",
          "Step-free entry + reading rooms"
        ]
      ],
      footer: "Project study / Public library reuse / Concept stage",
      caption: "Proposal cover / An illustrative library brief, with scope and status visible."
    },
    caseStudy: {
      brief: {
        label: "The assignment",
        title: "Help a public client see the plan.",
        body: "NORTHLINE needs to communicate a specific kind of practice: one that adapts existing libraries, halls and community buildings. Its audience has to evaluate scope, access and public value. A brand built only around monumental imagery would leave those questions unanswered."
      },
      idea: {
        label: "The idea",
        statement: "Keep what matters. Make room for what comes next.",
        body: "Make retention and change visible together. The ancient-and-modern art direction becomes a visual shorthand for reuse; the proposal system does the explaining in plain language."
      },
      system: {
        label: "The system",
        title: "A practice that shows its workings.",
        body: "The identity borrows the hierarchy of a drawing set: project number, status, scope and a clear reading order. Warm mineral tones connect to existing fabric, while measured lines separate inherited structure from proposed interventions.",
        principles: [
          "Give every project a number and a visible stage.",
          "Separate retained fabric from new work in project descriptions.",
          "Lead proposals with public use, access and the brief."
        ]
      },
      outcome: {
        label: "The proposed kit",
        title: "A working language for proposals.",
        body: "The concept includes a proposal cover, project-sheet structure and verbal positioning. Harbour Reading Room is an illustrative commission, not a built project. The next test would be whether a panel can find the scope and project stage without reading the entire proposal."
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
          caption: 'Palette study / Paper and stone',
        },
        film: {
          src: '/media/northline-motion-study.mp4',
          label: 'NORTHLINE motion study',
          caption: 'Art-direction motion study / 00:09 / silent',
        },
      },
    },
  },
  {
    slug: 'helio',
    client: 'HELIO',
    discipline: "Music festival",
    year: '2026',
    line: "Two evenings of live music by the sea, with an identity that gets people to the right stage.",
    image: 'culture-campaign',
    alt: 'A white marble hand reaching toward a blazing orange sun disc against an ultramarine sky above a coastline.',
    crop: { mobile: '60% 40%' },
    scope: ['Campaign', 'Programme', 'Wayfinding direction'],
    layout: 'square-right',
    context: {
      business: "A fictional two-evening music gathering at a coastal amphitheatre outside Athens.",
      audience: "Local music audiences and visitors planning a late-summer weekend.",
      assignment: "Build an announcement, running order and on-site information around one recognisable signal.",
      constraint: "A single stage, a sunset start and essential travel information that must stay readable."
    },
    application: {
      label: "Festival / programme poster",
      title: "HELIO",
      subtitle: "18—19 September 2026 · Coast Stage",
      rows: [
        [
          "FRI / 18:00",
          "Doors + terrace selections"
        ],
        [
          "FRI / 19:30",
          "Salt Choir"
        ],
        [
          "FRI / 21:00",
          "Blue Hours"
        ],
        [
          "SAT / 18:00",
          "Doors + terrace selections"
        ],
        [
          "SAT / 19:30",
          "Mira Vale"
        ],
        [
          "SAT / 21:00",
          "Afterlight"
        ]
      ],
      footer: "One stage / Music until 23:00 / Last return shuttle 23:30",
      caption: "Programme poster / Fictional artists and event; the running order is part of the identity."
    },
    caseStudy: {
      brief: {
        label: "The assignment",
        title: "Sell the evening. Make the evening work.",
        body: "HELIO’s imagined first edition is small enough to have one stage and a readable timetable. The campaign needs a recognisable image, but the programme also needs dates, set times, doors and a way home. The same system must serve both jobs."
      },
      idea: {
        label: "The idea",
        statement: "Meet here before the sun goes down.",
        body: "The orange disc marks the destination. On an announcement it carries the mood; on a programme it anchors the date; on site it marks the stage. Essential information stays in a fixed, high-contrast band."
      },
      system: {
        label: "The system",
        title: "Recognition at a distance. Information up close.",
        body: "Blue, orange and a large solar circle tie together the campaign. A stable type hierarchy keeps the artist, time and place readable even when the disc changes scale. The illustrative programme gives the identity an actual evening to organise.",
        principles: [
          "Keep date and venue together on every announcement.",
          "Use one chronological running order for a single stage.",
          "Treat return travel as part of the event information."
        ]
      },
      outcome: {
        label: "The proposed kit",
        title: "A festival people could navigate.",
        body: "The proposed kit joins campaign direction to a programme poster and travel language. All artists, timings and event details are fictional. Before a real launch, ticketing, accessibility, venue capacity and transport would need an operational brief."
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
          caption: 'Palette study / Circle, colour, invitation',
        },
        film: {
          src: '/media/helio-motion-study.mp4',
          label: 'HELIO motion study',
          caption: 'Art-direction motion study / 00:09 / silent',
        },
      },
    },
  },
  {
    slug: 'aura',
    client: 'AURA',
    discipline: "Home audio",
    year: '2026',
    line: "A tabletop wireless speaker whose launch explains the one control you actually touch.",
    image: 'technology-campaign',
    alt: 'A reflective obsidian audio device with a glowing circular halo interface resting on a marble plinth in a sunlit modernist courtyard.',
    crop: { mobile: '28% 60%', tablet: '32% 60%', desktop: '40% 60%' },
    scope: ['Positioning', 'Art direction', 'Product language'],
    layout: 'offset',
    context: {
      business: "A fictional audio brand developing a compact tabletop wireless speaker.",
      audience: "People listening at home who want a straightforward alternative to screen-led controls.",
      assignment: "Introduce the speaker and turn its illuminated ring into an understandable control.",
      constraint: "The product is a design concept; no acoustic, battery or connectivity performance is claimed."
    },
    application: {
      label: "Product / quick-start insert",
      title: "AURA",
      subtitle: "One speaker. One ring.",
      rows: [
        [
          "01 / CONNECT",
          "Power on. Pair from your phone."
        ],
        [
          "02 / TURN",
          "Rotate the ring to adjust volume."
        ],
        [
          "03 / PRESS",
          "Press once to pause or resume."
        ]
      ],
      footer: "AURA / Tabletop speaker / Proposed interaction model",
      caption: "Quick-start insert / A proposed control model, subject to product development."
    },
    caseStudy: {
      brief: {
        label: "The assignment",
        title: "Tell people what the object does.",
        body: "The original product image suggests an audio device but leaves its role unclear. We define the concept as a tabletop wireless speaker, then build the launch around a simple proposed interaction: turn for volume, press for playback. That gives the ring a purpose beyond decoration."
      },
      idea: {
        label: "The idea",
        statement: "Your music. Within reach.",
        body: "Show the speaker where it would be used, then explain the control in three steps. The luminous ring becomes both the campaign signature and the starting point for learning the product."
      },
      system: {
        label: "The system",
        title: "A product story with an instruction manual.",
        body: "Close crops introduce the ring and surface. Wider frames place the speaker in a room. The insert uses numbered actions and plain verbs; packaging leads with the product category so the brand name never has to explain everything.",
        principles: [
          "Name the product category on the first encounter.",
          "Connect each control gesture to one stated action.",
          "Keep proposed interactions separate from untested technical claims."
        ]
      },
      outcome: {
        label: "The proposed kit",
        title: "A launch concept you can understand.",
        body: "The proposed kit includes category positioning, quick-start language and image direction. The speaker and control model are fictional and would require industrial design and usability testing. The useful question now is whether the insert makes the intended interaction clear."
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
          caption: 'Palette study / The unboxing moment',
        },
        film: {
          src: '/media/aura-motion-study.mp4',
          label: 'AURA motion study',
          caption: 'Art-direction motion study / 00:09 / silent',
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

/** A partner's dossier page (/people/:slug). Fictional persona, played straight. */
export type Dossier = {
  /** Two short paragraphs. */
  profile: [string, string];
  /** The facts column: four dry label / value pairs. */
  record: { label: string; value: string }[];
  /** Three house rules of their own, numbered in Greek. */
  rules: [string, string, string];
  /** Concept projects they shaped, with their part in one line. */
  work: { slug: string; note: string }[];
};

export type God = {
  slug: string;
  name: string;
  role: string;
  line: string;
  /** The previous job title. Dry, one sentence. */
  formerly: string;
  image: ImageKey;
  alt: string;
  crop: Crop;
  accent?: 'gold' | 'aegean' | 'apollo';
  dossier: Dossier;
};

export const pantheon: God[] = [
  {
    slug: 'zeus',
    name: 'Zeus',
    role: 'CEO',
    line: 'Big ideas. Bigger budgets.',
    formerly: 'Formerly king of the gods. Still does the weather.',
    image: 'zeus-portrait',
    alt: 'Zeus: close crop of a bearded marble statue in black sunglasses against blue sky.',
    crop: { mobile: '50% 30%' },
    accent: 'gold',
    dossier: {
      profile: [
        'Zeus founded OLYMPUS on the theory that most brands are too polite to be remembered. He runs the agency the way he once ran the sky: few rules, enforced with conviction.',
        'He reads every brief, attends the first meeting and the last, and stays out of the middle unless the middle needs weather. His notes are short. His standards are not.',
      ],
      record: [
        { label: 'Leads', value: 'The agency, nominally' },
        { label: 'Office hours', value: 'Whenever it thunders' },
        { label: 'Signs off', value: 'Everything, eventually' },
        { label: 'Known for', value: 'Raising the budget in the room' },
      ],
      rules: [
        'Ask for the brave version first. Sensible can wait.',
        'Nobody remembers the safe option.',
        'One decision-maker per brief. Usually me.',
      ],
      work: [
        { slug: 'northline', note: 'Kept public use at the centre of the practice’s positioning.' },
        { slug: 'vela', note: 'Connected the collection campaign to the appointment experience.' },
      ],
    },
  },
  {
    slug: 'athena',
    name: 'Athena',
    role: 'Executive Creative Director',
    line: 'Discipline creates freedom.',
    formerly: 'Formerly wisdom, war and one entire city.',
    image: 'athena-ecd',
    alt: 'Athena: marble bust in a crested helmet with a severe gaze, a single blue paint-marker slash on the backdrop.',
    crop: { mobile: '50% 30%' },
    accent: 'aegean',
    dossier: {
      profile: [
        'Athena runs the creative department like a campaign she intends to win. Every piece of work has to survive one question — why this, and not the obvious thing — before it leaves the building.',
        'She believes taste is a discipline rather than a gift, and can usually prove it on a whiteboard. Junior designers fear her. Senior ones ask for her calendar.',
      ],
      record: [
        { label: 'Leads', value: 'Creative, all of it' },
        { label: 'Office hours', value: 'Before anyone else arrives' },
        { label: 'Signs off', value: 'Concepts, systems, type' },
        { label: 'Known for', value: 'Cutting the second-best idea first' },
      ],
      rules: [
        'Define the argument before you draw anything.',
        'Every rule in a system must earn its place.',
        'Restraint is a decision, not an absence.',
      ],
      work: [
        { slug: 'vela', note: 'Built a numbered collection system from lookbook to order card.' },
        { slug: 'aura', note: 'Made the speaker category and control language easy to understand.' },
      ],
    },
  },
  {
    slug: 'hermes',
    name: 'Hermes',
    role: 'Strategy',
    line: 'Same day. Different hemisphere.',
    formerly: 'Formerly messenger of the gods. Now answers email within the hour.',
    image: 'hermes-strategy',
    alt: 'Hermes: marble bust in a winged helmet and dark sunglasses against a motion-blurred blue backdrop.',
    crop: { mobile: '50% 25%' },
    dossier: {
      profile: [
        'Hermes leads strategy, which he describes as reaching the useful answer before the meeting ends. He reads everything, talks to everyone, and arrives with the insight while others are still circulating the agenda.',
        'He is the agency’s translator: between research and language, between clients and creatives, and occasionally between time zones he visited that same morning.',
      ],
      record: [
        { label: 'Leads', value: 'Strategy and naming' },
        { label: 'Office hours', value: 'Several, in different hemispheres' },
        { label: 'Signs off', value: 'Positioning and briefs' },
        { label: 'Known for', value: 'Replying before you press send' },
      ],
      rules: [
        'A brief should fit in a sentence and survive a week.',
        'Find the tension, then name it.',
        'Speed is a courtesy. Accuracy is the job.',
      ],
      work: [
        { slug: 'northline', note: 'Framed the practice around reuse and clearer public proposals.' },
        { slug: 'aura', note: 'Built the launch around the speaker’s proposed ring control.' },
      ],
    },
  },
  {
    slug: 'apollo',
    name: 'Apollo',
    role: 'Creative',
    line: 'A little brighter. A little louder.',
    formerly: 'Formerly the sun, music and prophecy. Kept the sun.',
    image: 'apollo-creative',
    alt: 'Apollo: curly-haired marble sculpture in orange acetate sunglasses, lit by hard flash and an orange glow.',
    crop: { mobile: '50% 25%' },
    accent: 'apollo',
    dossier: {
      profile: [
        'Apollo leads creative, by which he means making the idea impossible to ignore. He works in light, rhythm and colour, and can tell within a bar whether a film will be remembered.',
        'He gave up prophecy because clients asked for revisions anyway. He kept the sun because it photographs well.',
      ],
      record: [
        { label: 'Leads', value: 'Campaign and craft' },
        { label: 'Office hours', value: 'Sunrise to golden hour' },
        { label: 'Signs off', value: 'Film, music, colour' },
        { label: 'Known for', value: 'One more grade after “final”' },
      ],
      rules: [
        'If it isn’t vivid, it isn’t finished.',
        'Edit to the beat.',
        'Make one thing glow. Let the rest stay dark.',
      ],
      work: [
        { slug: 'helio', note: 'Connected the solar campaign image to a readable festival programme.' },
        { slug: 'vela', note: 'Gave each collection silhouette a consistent visual setting.' },
      ],
    },
  },
  {
    slug: 'dionysus',
    name: 'Dionysus',
    role: 'Culture / Experiences',
    line: 'Work hard. Party harder.',
    formerly: 'Formerly wine, theatre and revelry. Role largely unchanged.',
    image: 'dionysus-culture',
    alt: 'Dionysus: expressive marble bust with ivy in its hair, head tipped back under violet stage light.',
    crop: { mobile: '50% 30%' },
    dossier: {
      profile: [
        'Dionysus leads culture and experiences. He designs the moments people talk about afterwards: launches, rooms, gatherings, and the slightly-too-late part of the evening when the best ideas tend to appear.',
        'He insists a brand is something people do together, not something they look at. He has the guest lists to support the theory.',
      ],
      record: [
        { label: 'Leads', value: 'Experiences and events' },
        { label: 'Office hours', value: 'After six' },
        { label: 'Signs off', value: 'Rooms, guest lists, playlists' },
        { label: 'Known for', value: 'The after-party being the launch' },
      ],
      rules: [
        'Design the arrival. People forgive a great deal after a good entrance.',
        'Invite the right twelve, not the wrong twelve hundred.',
        'Leave room for the unplanned.',
      ],
      work: [
        { slug: 'helio', note: 'Joined the campaign to set times, stage information and return travel.' },
      ],
    },
  },
  {
    slug: 'artemis',
    name: 'Artemis',
    role: 'Production',
    line: 'On time. On target.',
    formerly: 'Formerly the hunt and the moon. Now hunts deadlines.',
    image: 'artemis-production',
    alt: 'Artemis: marble bust with tied hair and a direct gaze, sharp light with a sage-green shadow.',
    crop: { mobile: '50% 25%' },
    dossier: {
      profile: [
        'Artemis leads production. She turns ambition into a schedule, a budget and a crew, then makes sure all three arrive on the same day. Nothing leaves without her sign-off, and nothing leaves late.',
        'She is calm in a way that makes everyone else slightly nervous. Her timelines are drawn in pen.',
      ],
      record: [
        { label: 'Leads', value: 'Production and delivery' },
        { label: 'Office hours', value: 'Early. Precisely.' },
        { label: 'Signs off', value: 'Schedules, budgets, final files' },
        { label: 'Known for', value: 'Never once saying “it’ll be fine”' },
      ],
      rules: [
        'Name the deadline, then defend it.',
        'Protect the makers’ time like your own.',
        'Check the final file twice. Then once more.',
      ],
      work: [
        { slug: 'aura', note: 'Planned the product imagery around form, setting and interaction.' },
        { slug: 'northline', note: 'Turned the positioning into a usable proposal and project-sheet structure.' },
      ],
    },
  },
];

export const proof = [
  { n: '6', label: 'gods' },
  { n: '12', label: 'disciplines' },
  { n: '1', label: 'unreasonable standard' },
];

export const workNote = 'Four fictional businesses. Four specific briefs. See the thinking and the proposed work.';

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

/**
 * The brief form on /contact. Without VITE_CONTACT_ENDPOINT it drafts an email in the
 * visitor's mail app; with one, it posts the brief there (any JSON form service).
 */
export const contactForm = {
  label: 'The brief',
  title: 'Start with the problem.',
  em: 'The deck can wait.',
  fields: {
    name: 'Your name',
    email: 'Email for the reply',
    org: 'Company or project',
    optional: 'Optional',
    timing: 'When does it need to exist?',
    message: 'What are you trying to change?',
    messageHint: 'The problem, who needs to care, and what should be different afterwards.',
  },
  timings: ['This month', 'This quarter', 'Later this year', 'Just exploring'],
  submit: 'Send the brief',
  sending: 'Consulting the oracle…',
  errors: {
    name: 'We need something to call you.',
    email: 'An email address we can reply to, please.',
    message: 'A sentence or two about the problem, please.',
  },
  mail: {
    subject: 'A brief for Olympus',
    note: 'Sending opens your mail app with the brief written out. Nothing is stored on this site.',
    doneTitle: 'Your mail app has the draft.',
    doneBody: 'Press send there and it reaches the summit. If nothing opened, write to',
  },
  post: {
    note: 'The brief goes straight to a partner’s inbox. Nothing else is done with it.',
    doneTitle: 'Received on the summit.',
    doneBody: 'A partner will reply by email. If it is urgent, write to',
    failed: 'The message did not go through. Nothing was lost on your side; write to',
  },
  again: 'Write another',
};

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
    /** Chrome for the individual dossier pages (/people/:slug). */
    dossier: {
      open: 'Read the dossier',
      notice: 'Fictional persona — a character, not a staff biography',
      profile: 'Profile',
      record: 'On the record',
      rules: 'Personal house rules',
      work: 'Fingerprints',
      workNote: 'Fictional concept projects, not client work.',
      next: 'Next partner',
      all: 'The whole Pantheon',
    },
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
    note: 'The form and the email address reach the same real inbox. There is no published office address.',
  },
} as const;
