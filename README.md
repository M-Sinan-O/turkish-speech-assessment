# Turkish Speech Assessment

Web-based Turkish speech / phonological assessment prototype for a DKT research project.

## Current MVP

- 10-question browser demo
- Rule-based automatic scoring
- Response-time tracking
- Category-level results
- No AI
- No audio analysis
- Local browser storage for the current demo

## Next stage

Supabase integration for:

- DKT authentication
- coded participants
- test sessions
- response records
- later, private research audio storage

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

> Research note: identifiable personal data should not be placed in the public GitHub repository.

## DKT login security

The `dkt2026` username is mapped in the browser to the internal Supabase Auth
address `dkt2026@turkish-speech-assessment.local`. Its password is managed and
verified only by Supabase Auth; never add it to this repository or to frontend
code.

Any temporary password used during setup must be replaced with a strong, unique
password before collecting real research data.

## Audio note

The browser speech synthesizer is used only for the current demo. Auditory test
items are spoken twice at a reduced rate with the best available Turkish voice.
Before collecting real research data, replace synthesized speech with
standardized recordings produced and reviewed for the assessment protocol.
