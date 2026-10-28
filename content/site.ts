/**
 * All site copy. Edit this file to make the invitation your own; the
 * components only render what is here. Labels are set in all caps by CSS
 * anyway, so the casing here is just for readability.
 */

export type Event = {
  /** Shown above the label, e.g. "1400". */
  time: string;
  label: string;
  place: string;
  /** Optional map link (Google Maps, OpenStreetMap, ...). */
  mapUrl?: string;
};

export type Contact = {
  name: string;
  phone?: string;
  email?: string;
};

/** Building blocks for the sections of the details page. */
export type Block =
  | { type: "events"; items: Event[] }
  | { type: "text"; label: string; text: string }
  | { type: "contacts"; label: string; people: Contact[] };

/** One full-screen section of the details page. */
export type Section = {
  /** Accessible name of the section (not shown). */
  label: string;
  blocks: Block[];
};

/* Details page: each section fills the screen and snaps into place.
   Reorder, remove or add sections and blocks freely. */
const sections: Section[] = [
  {
    label: "Zeiten und Orte",
    blocks: [
      {
        type: "events",
        items: [
          {
            time: "1400",
            label: "TRAUUNG",
            place: "Ort der Trauung",
            mapUrl: "https://www.openstreetmap.org/",
          },
          {
            time: "1700",
            label: "FEIER",
            place: "Ort der Feier",
            mapUrl: "https://www.openstreetmap.org/",
          },
        ],
      },
    ],
  },
  {
    label: "Ablauf",
    blocks: [
      {
        type: "text",
        label: "ABLAUF",
        text: "Hier steht, wie der Tag abläuft: wann die Trauung beginnt, wann Ihr da sein solltet und was danach passiert. Ein bis zwei kurze Absätze reichen völlig.",
      },
      {
        type: "text",
        label: "HINWEISE",
        text: "Platz für alles, was Gäste sonst noch wissen sollten, zum Beispiel Dresscode, Anreise oder Übernachtung.",
      },
    ],
  },
  {
    label: "Kontakte",
    blocks: [
      {
        type: "contacts",
        label: "TRAUZEUGEN",
        people: [
          { name: "Vorname Nachname", phone: "+49 000 0000000" },
          { name: "Vorname Nachname", phone: "+49 000 0000000" },
        ],
      },
    ],
  },
];

export const site = {
  nameA: "NAME A",
  nameB: "NAME B",
  city: "STADT",
  date: "TT·MM·JJ",

  meta: {
    title: "Name A & Name B",
    description: "Hochzeit in Stadt — Details, RSVP und Fotos für Gäste.",
  },

  event: {
    /** After the wedding: hides RSVP and links the photo album in the footer. */
    ended: false,
  },

  photos: {
    link: "https://photos.google.com/",
  },

  header: {
    /** Word between the two names. */
    center: "UND",
  },

  footer: {
    rsvp: "RSVP",
    details: "DETAILS",
    einladung: "ZURÜCK",
    bilder: "FOTOS",
  },

  invite: {
    eyebrow: "EINLADUNG",
    title: "ZUR HOCHZEIT VON",
  },

  zugang: {
    passwordLabel: "Passwort",
    submit: "Öffnen",
    error: "Das Passwort stimmt nicht.",
  },

  /** RSVP dialog. Leave `phone` or `email` empty to hide it. */
  rsvp: {
    label: "RSVP",
    text: "Wir bitten um Rückmeldung bis zum TT. Monat JJJJ.",
    phone: "+49 000 0000000",
    email: "",
    closeLabel: "RSVP schließen",
  },

  details: {
    headline: "Details",
    /** Optional paragraph below the headline. */
    intro: "",
    sections,
  },
} as const;
