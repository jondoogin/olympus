// Structured content, kept apart from layout. Everything here is fictional.
import type { ImageKey } from '../lib/images';

/** Per-breakpoint object-position. Keeps crops configurable without touching layout. */
export type Crop = { mobile: string; tablet?: string; desktop?: string };

export const nav = [
  { label: 'Work', to: '/work', note: 'Selected projects' },
  { label: 'Services', to: '/services', note: 'What we do, mostly' },
  { label: 'People', to: '/people', note: 'The Pantheon' },
  { label: 'Culture', to: '/culture', note: 'How we behave' },
  { label: 'About', to: '/about', note: 'The short version' },
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
};

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
    image: 'zeus-portrait',
    alt: 'Zeus: close crop of a bearded marble statue in black sunglasses against blue sky.',
    crop: { mobile: '50% 30%' },
    accent: 'gold',
  },
  {
    name: 'Athena',
    role: 'Executive Creative Director',
    line: 'Discipline creates freedom.',
    image: 'athena-ecd',
    alt: 'Athena: marble bust in a crested helmet with a severe gaze, a single blue paint-marker slash on the backdrop.',
    crop: { mobile: '50% 30%' },
    accent: 'aegean',
  },
  {
    name: 'Hermes',
    role: 'Strategy',
    line: 'Same day. Different hemisphere.',
    image: 'hermes-strategy',
    alt: 'Hermes: marble bust in a winged helmet and dark sunglasses against a motion-blurred blue backdrop.',
    crop: { mobile: '50% 25%' },
  },
  {
    name: 'Apollo',
    role: 'Creative',
    line: 'A little brighter. A little louder.',
    image: 'apollo-creative',
    alt: 'Apollo: curly-haired marble sculpture in orange acetate sunglasses, lit by hard flash and an orange glow.',
    crop: { mobile: '50% 25%' },
    accent: 'apollo',
  },
  {
    name: 'Dionysus',
    role: 'Culture / Experiences',
    line: 'Work hard. Party harder.',
    image: 'dionysus-culture',
    alt: 'Dionysus: expressive marble bust with ivy in its hair, head tipped back under violet stage light.',
    crop: { mobile: '50% 30%' },
  },
  {
    name: 'Artemis',
    role: 'Production',
    line: 'On time. On target.',
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

export const collaborators = ['Athens', 'London', 'New York', 'Lagos', 'Mexico City', 'Seoul', 'Copenhagen'];

export const contact = {
  email: 'hello@olympus.agency',
  emailIsPlaceholder: true,
};

export const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Vimeo', href: '#' },
  { label: 'Are.na', href: '#' },
];
