-- Drop existing table if you want to recreate with new columns
-- drop table if exists waitlist;

-- Create the waitlist table with device and location tracking
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- User info
  full_name text not null,
  email text unique not null,
  
  -- Device info
  browser text,
  browser_version text,
  os text,
  device_type text,
  screen_width integer,
  screen_height integer,
  language text,
  timezone text,
  user_agent text,
  
  -- Location info
  city text,
  region text,
  country text,
  country_code text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  ip_address text
);

-- Enable Row Level Security
alter table waitlist enable row level security;

-- Allow public inserts for the waitlist form
create policy "Allow public inserts" on waitlist
  for insert with check (true);

-- Create index on email for faster duplicate checks
create index waitlist_email_idx on waitlist(email);

-- Create index on created_at for sorting
create index waitlist_created_at_idx on waitlist(created_at desc);

-- Create index on country for analytics
create index waitlist_country_idx on waitlist(country);
