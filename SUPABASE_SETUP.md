# Supabase setup

This project will use Supabase only for authentication and research data storage.

## 1. Create a Supabase project

Create a new Supabase project and keep the project URL and **anon/public** key.

Do not use the `service_role` key in browser code.

## 2. Create the database schema

Open **SQL Editor** in Supabase, paste the contents of:

`supabase/schema.sql`

and run it once.

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
