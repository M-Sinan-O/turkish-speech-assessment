-- Run this once in Supabase SQL Editor when schema.sql was installed earlier.

alter table public.test_sessions
  add column if not exists assessment_form text;

alter table public.responses
  add column if not exists response_kind text,
  add column if not exists score smallint check (score between 0 and 2),
  add column if not exists max_score smallint check (max_score between 1 and 2),
  add column if not exists replay_count integer not null default 0 check (replay_count >= 0),
  add column if not exists cue_level smallint not null default 0 check (cue_level between 0 and 3),
  add column if not exists assisted_correct boolean not null default false;

comment on column public.test_sessions.assessment_form is
  'early_2_3 or child_4_7; the forms have separate raw-score interpretations';
