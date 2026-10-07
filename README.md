# Turkish Language Assessment

Web-based Turkish language-profile assessment prototype for a DKT research project.

## Current MVP

- Two separate pilot forms: 2–3 years and 4–7 years
- 10-item adult-assisted early-language flow for ages 2–3
- 15-item receptive/expressive language flow for ages 4–7
- Automatic scoring for selections and 0/1/2 live clinician scoring for spoken answers
- Help-level and audio-replay tracking
- Response-time tracking
- Category-level raw-score profiles
- No AI
- No speech recognition or required audio recording
- Supabase session/response storage with local browser continuity

## Supabase

The app uses Supabase for DKT authentication, coded participants, test sessions
and item-level response records. Existing installations must run the migration
listed in [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

The design rationale for the language-disorder research group is documented in
[DIL_BOZUKLUGU_TEST_TASARIMI.md](DIL_BOZUKLUGU_TEST_TASARIMI.md). It separates
the core receptive/expressive language profile from the optional phonological
awareness module.

> The included questions, emoji visuals and browser-generated speech are only an
> interaction prototype. They require DKT review, original licensed artwork,
> standardized recordings and psychometric validation before research use.

> Research note: identifiable personal data should not be placed in the public GitHub repository.

## DKT login security

The `dkt2026` username is mapped in the browser to the internal Supabase Auth
address `dkt2026@turkish-speech-assessment.local`. Its password is managed and
verified only by Supabase Auth; never add it to this repository or to frontend
code.

Any temporary password used during setup must be replaced with a strong, unique
password before collecting real research data.

## Audio note

The browser speech synthesizer is used only for the current pilot. Its default
voice, rate, pitch, volume, repetitions and autoplay behavior can be changed in
`TSA_AUDIO_SETTINGS` at the top of `js/questions.js`.

For a standardized recording, add an `audioSrc` property to a question. It takes
priority over synthesized speech:

```js
audioSrc: "assets/audio/q006.mp3"
```

Question options also support a real image through an `image` property. If no
image is supplied, the existing emoji is displayed:

```js
{ id: "A", label: "Kaz", image: "assets/images/kaz.webp", emoji: "🪿" }
```

Before collecting real research data, replace synthesized speech and emoji
placeholders with standardized recordings and licensed, expert-reviewed visuals.

The existing ElevenLabs examples remain in `assets/audio/`. New form recordings
can be added one question at a time with `audioSrc`; each recording then takes
priority over the temporary browser voice.
