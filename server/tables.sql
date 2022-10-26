--Create our main user table in our sql file
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

CREATE TABLE public.habits (
    "_id" serial NOT NULL,
    "user_id" number NOT NULL,
    "habit_id" number NOT NULL,
    "date_started" date,
    CONSTRAINT "habits_pk" PRIMARY KEY ("_id")    
) WITH (
    OIDS=FALSE
);

CREATE TABLE public.metrics (
    "_id" serial NOT NULL,
    "name" varchar NOT NULL,
    "units" varchar NOT NULL,
    CONSTRAINT "metrics_pk" PRIMARY KEY ("_id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE public.user_metrics (
  "_id" serial NOT NULL
  "user_id" number NOT NULL,
  "metric_id" number NOT NULL,
  "value" number,
  "float_value" numeric,
  CONSTRAINT "user_metrics_pk" PRIMARY KEY ("_id")
) WITH(
  OIDS = FALSE
)
ALTER TABLE public.user_metrics
    ADD (CONSTRAINT "user_metrics_pk" FOREIGN KEY ("user_id") REFERENCES public.users("_id"), CONSTRAINT "metrics_pk" FOREIGN KEY ("metric_id") REFERENCES public.metrics("_id"));

CREATE TABLE public.users_habits (
    "_id" number NOT NULL,
    "user_id" number NOT NULL,
    "habit_id" number NOT NULL,
    "date_started" timestamp,
    CONSTRAINT "users_habits_pk" PRIMARY KEY ("_id")
) WITH (
    OIDS=FALSE
);

ALTER TABLE public.users_habits
    ADD (CONSTRAINT "users_pk" FOREIGN KEY ("user_id") REFERENCES public.users("_id"), CONSTRAINT "habits_pk" FOREIGN KEY ("habit_id") REFERENCES public.habits("_id"));