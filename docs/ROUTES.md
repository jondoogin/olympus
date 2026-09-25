# Route & content outline

All content lives in `src/content/site.ts` (nav, hero, manifesto, projects, services, pantheon, proof, contact, socials).

| Route | Status | Built from | Next content needed |
| --- | --- | --- | --- |
| `/` | **Complete** | Hero · Manifesto · Work · Services · Pantheon · Interruption · Pause · Proof · Contact | — |
| `/work` | Complete concept index | PageIntro + all `ProjectCard`s + Contact | Filters by discipline once there are more than 4 projects |
| `/work/:slug` | **Complete for all four concepts** | Case hero, project-specific image composition, editorial story, supporting stills, titled silent motion study with playback control, next-project link | Review concept direction before publishing; no client results are claimed |
| `/services` | Complete concept page | Services index + six discipline essays with deliverables and related concept work | — |
| `/people` | Complete fictional leadership page | Six individual bios and portraits | Mortal team details if one exists |
| `/culture` | Complete concept page | Interruption + maxims + three working principles + Pause | Real open roles and events if offered |
| `/about` | Complete concept page | Manifesto + working model essays + Proof | Real history and collaborator network when supplied |
| `/contact` | Email + brief form live | Brief form + brief guidance + working approach + direct email link + Contact | Set `VITE_CONTACT_ENDPOINT` to post briefs instead of drafting an email; office address if desired |
| `*` | Done | 404 — "Lost to antiquity." Served by `dist/404.html` with a real 404 status | — |

Every route above is also written at build time as its own HTML file with route-specific meta (src/lib/meta.ts → scripts/site-plugin.ts).

## Owner-supplied contact details
- Email: `john@duggan.design` in the contact section, footer and menu.
- Instagram: `@jondoogin`; LinkedIn, Behance and Dribbble link to the owner's supplied profile URLs.
- The brief form on `/contact` drafts an email to that address (or posts to `VITE_CONTACT_ENDPOINT` if set). No office address is published.
- The four projects are fictional concepts, and the site says so in the Work intro and the footer.
- Collaborator locations and identities are withheld until the owner supplies real details.
- All four case studies are fictional concepts with supporting stills and silent motion studies. None claim a real client, launch, or measured result.
