create extension if not exists "uuid-ossp";

create table if not exists memes (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  image_path text not null,
  caption text,
  genre text not null check (genre in ('dark-humor', 'sarcastic', 'pun', 'metaphorical', 'tech')),
  likes_count integer not null default 0,
  saves_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table memes enable row level security;

create policy "Memes are publicly readable"
  on memes for select
  using (true);
