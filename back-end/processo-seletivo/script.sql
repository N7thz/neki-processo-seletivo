create table public.skill (
   id_skill int8 generated by default as identity,
   description varchar(255) not null,
   imageurl varchar(255) not null,
   level varchar(255) not null,
   name varchar(255) not null,
   primary key (id_skill)
) create table public.skill (
   id_skill int8 generated by default as identity,
   description varchar(255) not null,
   imageurl varchar(255) not null,
   level varchar(255) not null,
   name varchar(255) not null,
   primary key (id_skill)
) create table public.user (
   id_user int8 generated by default as identity,
   email varchar(255) not null,
   password varchar(255) not null,
   primary key (id_user)
) create table public.user (
   id_user int8 generated by default as identity,
   email varchar(255) not null,
   password varchar(255) not null,
   primary key (id_user)
) create table public.user_skill (
   id_user_skill int8 generated by default as identity,
   id_skill int8 not null,
   id_user int8 not null,
   primary key (id_user_skill)
) create table public.user_skill (
   id_user_skill int8 generated by default as identity,
   id_skill int8 not null,
   id_user int8 not null,
   primary key (id_user_skill)
) 2024 -02 -03 15 :32 :56.774 DEBUG 26360
alter table
   if exists public.user_skill
add
   constraint FKrsvxrshr30q4756yoxncoaeyl foreign key (id_skill) references public.skill
alter table
   if exists public.user_skill
add
   constraint FKrsvxrshr30q4756yoxncoaeyl foreign key (id_skill) references public.skill
alter table
   if exists public.user_skill
add
   constraint FKkwwol8ie05lcjsko1qewnm6r7 foreign key (id_user) references public.user
alter table
   if exists public.user_skill
add
   constraint FKkwwol8ie05lcjsko1qewnm6r7 foreign key (id_user) references public.user