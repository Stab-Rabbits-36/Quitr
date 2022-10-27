--Create our main user table in our sql file
-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

CREATE TABLE  public.users (
  "_id" serial NOT NULL,
  "username" varchar(20) NOT NULL UNIQUE,
  "password" varchar(20) NOT NULL,
  "first_name" varchar(20) NOT NULL,
  "last_name" varchar (20) NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE public.metrics (
  "_id" serial NOT NULL,
  "name" integer NOT NULL,
  "units" varchar NOT NULL,
  CONSTRAINT "metrics_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.user_metrics (
  "_id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "metric_id" integer NOT NULL,
  "value" integer,
  "float_value" numeric,
  CONSTRAINT "user_metrics_pk" PRIMARY KEY ("_id")
) WITH(
  OIDS = FALSE
);

CREATE TABLE public.user_habits (
  "_id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "habit_id" integer NOT NULL,
  "date_started" varchar NOT NULL,
  "points" integer NOT NULL, -- how many points user accrued
  "streak" integer NOT NULL, -- changed 'streaks' to 'streak'
  CONSTRAINT "user_habits_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.habits (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  CONSTRAINT "habits_pk" PRIMARY KEY ("_id")    
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.challenges (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "points" integer NOT NULL, -- how many points each challenge is worth
  CONSTRAINT "challenges_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.user_challenges (
  "_id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "challenge_id" integer NOT NULL,
  "frequency" integer NOT NULL,
  "last_date_assigned" varchar,
  "completed_on_last_date" boolean NOT NULL,
  CONSTRAINT "user_challenges_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.user_metrics ADD CONSTRAINT "user_metrics_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.user_metrics ADD CONSTRAINT "metrics_fk1" FOREIGN KEY ("metric_id") REFERENCES public.metrics("_id");

ALTER TABLE public.user_habits ADD CONSTRAINT "users_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.user_habits ADD CONSTRAINT "habits_fk1" FOREIGN KEY ("habit_id") REFERENCES public.habits("_id");

ALTER TABLE public.user_challenges ADD CONSTRAINT "user_challenges_fk0" FOREIGN KEY ("challenge_id") REFERENCES public.challenges("_id");
ALTER TABLE public.user_challenges ADD CONSTRAINT "users_fk1" FOREIGN KEY ("user_id") REFERENCES public.users("_id");

INSERT INTO public.habits VALUES (1, 'Nicotine', 'Nicotine dependence occurs when you need nicotine and cannot stop using it.');

ALTER TABLE public.user_habits ALTER COLUMN date_started SET NOT NULL;
ALTER TABLE public.user_habits ALTER COLUMN streak SET NOT NULL;

ALTER TABLE public.user_habits ALTER COLUMN date_started TYPE varchar SET NOT NULL;

ALTER TABLE public.user_habits ALTER COLUMN streak TYPE integer USING (streak::integer);

ALTER TABLE public.user_challenges ALTER COLUMN last_date_assigned DROP NOT NULL; -- how to drop not null

-- ALTER TABLE public.user_habits ALTER COLUMN date_started TYPE varchar;
-- DROP TABLE public.badges CASCADE;

-- DROP COLUMN badge_id FROM public.user_habits;
-- DROP COLUMN streaks FROM public.user_habits;

-- STRETCH FEATURE: cigarettes per day for name

-- INSERT public.users VALUES(1, "da568", "1234", "Daniel", "An")

-- INSERT public.metrics VALUES (1, "")

INSERT INTO public.challenges VALUES (1, 'Meditate for 20 minutes.', 'Meditation is the practice of focusing the mind on a particular object, though or activity to train attention and awareness. The goal is to achieve a mentally clear and emotionally calm and stable state. ', 50);
INSERT INTO public.challenges VALUES (2, 'Exercised for 30 minutes', 'Any form of physical activity. ', 50);
INSERT INTO public.challenges VALUES (3, 'Chew on it', 'Gave mouth something to do to resists tobacco craving. Chewed on gum, hard candy, nuts, etc.', 50);
INSERT INTO public.challenges VALUES (4, 'Call for reinforcements', 'Connected with support network for help in your effort to resist a tobacco craving.', 50);
INSERT INTO public.challenges VALUES (5, 'Remind yourself of the benefits', 'Wrote down or said out lead reasons to resist tobacco cravings', 50);
INSERT INTO public.challenges VALUES (6, 'Delay', 'Felt like giving in to tobacco craving, but told yourself to first wait 10 mins and then distracted yourself during that time.', 50);
INSERT INTO public.challenges VALUES (7, 'Actively Avoided triggers', 'Avoided places where tobacco urges are likely to be stringes such as parties, bars, etc.', 50);

-- CREATE TABLE public.challenges (
--   "_id" serial NOT NULL,
--   "name" varchar NOT NULL,
--   "description" varchar NOT NULL,
--   "points" integer NOT NULL, -- how many points each challenge is worth
--   CONSTRAINT "challenges_pk" PRIMARY KEY ("_id")
-- ) WITH (
--   OIDS=FALSE
-- );

--  INSERT INTO public.planets VALUES (2, 'Alderaan', 24, 364, 12500, 'temperate', '1 standard', 'grasslands, mountains', '40', 2000000000);
--  INSERT INTO public.planets VALUES (3, 'Yavin IV', 24, 4818, 10200, 'temperate, tropical', '1 standard', 'jungle, rainforests', '8', 1000);
--  INSERT INTO public.planets VALUES (4, 'Hoth', 23, 549, 7200, 'frozen', '1.1 standard', 'tundra, ice caves, mountain ranges', '100', NULL);
--  INSERT INTO public.planets VALUES (5, 'Dagobah', 23, 341, 8900, 'murky', 'N/A', 'swamp, jungles', '8', NULL);