# Supabase setup

This project will use Supabase only for authentication and research data storage.

## 1. Create a Supabase project

Create a new Supabase project and keep the project URL and **anon/public** key.

Do not use the `service_role` key in browser code.

## 2. Create the database schema

Open **SQL Editor** in Supabase, paste the contents of:

`supabase/schema.sql`

and run it once.

If the earlier speech-demo schema is already installed, run only this migration
in **SQL Editor** before using the two new forms:

`supabase/migrations/20261007_add_language_profile_forms.sql`

It adds the selected age form, 0/1/2 item score, audio replay count and help
level fields. It does not delete existing participants, sessions or responses.

## 3. Create the first DKT/admin user

Create a user under **Authentication > Users** with the internal e-mail address:

`dkt2026@turkish-speech-assessment.local`

Because this internal address cannot receive confirmation mail, create it as a
confirmed user. Set its password in the Supabase dashboard. The browser maps the public username
`dkt2026` to this internal address, but the password is sent directly to and
verified by Supabase Auth. Do not put the password in frontend code, commits or
project documentation.

> Before collecting real research data, replace any temporary setup password
> with a strong, unique password.

After the user exists, add that user's UUID to `app_users`:

```sql
insert into public.app_users (user_id, role, display_name)
values ('USER_UUID_HERE', 'admin', 'Project Admin');
```

## 4. Configure the browser app

Copy:

`js/supabase-config.example.js`

to:

`js/supabase-config.js`

and replace the placeholder URL/key with the project's own values.

## Data design

The MVP stores only coded participant identifiers, such as `P0001`.

No participant names, phone numbers or e-mail addresses belong in the research tables.

The `early_2_3` and `child_4_7` forms are stored separately. Their raw scores
must not be merged or compared as if they used the same scale. The current items
are pilot examples and do not produce a diagnosis or standardized score.
