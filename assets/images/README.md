# Assessment picture-card assets

These four sprite sheets replace the ambiguous emoji combinations used in the
initial interaction prototype:

- `early-options.png`: ten receptive-language choices for the 2–3-year form.
- `early-stimuli.png`: five clinician-scored stimuli for the 2–3-year form.
- `child-options.png`: twenty-one receptive-language choices for the 4–7-year form.
- `child-stimuli.png`: eight clinician-scored stimuli for the 4–7-year form.

The sheets were created with OpenAI's built-in image-generation tool in a
consistent children's educational illustration style. The prompt set required:

- one isolated object or one unambiguous action per card;
- white or very simple backgrounds and large centered subjects;
- consistent characters, scale, color and illustration style;
- no text, letters, numbers, arrows, logos or decorative distractors;
- clearly contrasted quantities, actions and spatial relations.

The exact cell crop coordinates are stored in `js/questions.js`. If a sheet is
re-generated, update those coordinates before publishing.

These are pilot assets, not validated clinical stimuli. A DKT content panel must
review visual familiarity, cultural appropriateness, distractor equivalence and
target clarity before real data collection.
