PGDMP  6        
            |            TP5    16.2    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    TP5    DATABASE     |   CREATE DATABASE "TP5" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';
    DROP DATABASE "TP5";
                postgres    false            �            1259    16410    event_categories    TABLE     �   CREATE TABLE public.event_categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    display_order integer NOT NULL
);
 $   DROP TABLE public.event_categories;
       public         heap    postgres    false            �            1259    16436    event_enrollments    TABLE     <  CREATE TABLE public.event_enrollments (
    id integer NOT NULL,
    id_event integer NOT NULL,
    id_user integer NOT NULL,
    description text NOT NULL,
    registration_date_time timestamp without time zone NOT NULL,
    attended integer NOT NULL,
    observations text NOT NULL,
    rating numeric NOT NULL
);
 %   DROP TABLE public.event_enrollments;
       public         heap    postgres    false            �            1259    16450    event_locations    TABLE     G  CREATE TABLE public.event_locations (
    id integer NOT NULL,
    id_location integer NOT NULL,
    name character varying NOT NULL,
    full_address character varying NOT NULL,
    max_capacity character varying NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    id_creator_user integer NOT NULL
);
 #   DROP TABLE public.event_locations;
       public         heap    postgres    false            �            1259    16424 
   event_tags    TABLE     x   CREATE TABLE public.event_tags (
    id integer NOT NULL,
    id_event integer NOT NULL,
    id_tag integer NOT NULL
);
    DROP TABLE public.event_tags;
       public         heap    postgres    false            �            1259    16429    events    TABLE     �  CREATE TABLE public.events (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    id_event_category integer NOT NULL,
    id_event_location integer NOT NULL,
    start_date date NOT NULL,
    duration_in_minutes numeric NOT NULL,
    price numeric NOT NULL,
    "max_assistance " integer NOT NULL,
    id_creator_user integer NOT NULL,
    enabled_for_enrollment integer NOT NULL
);
    DROP TABLE public.events;
       public         heap    postgres    false            �            1259    16457 	   locations    TABLE     �   CREATE TABLE public.locations (
    id integer NOT NULL,
    name character varying NOT NULL,
    id_province integer NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL
);
    DROP TABLE public.locations;
       public         heap    postgres    false            �            1259    16403 	   provinces    TABLE     �   CREATE TABLE public.provinces (
    id integer NOT NULL,
    name character varying NOT NULL,
    full_name character varying NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    display_order integer NOT NULL
);
    DROP TABLE public.provinces;
       public         heap    postgres    false            �            1259    16417    tags    TABLE     [   CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.tags;
       public         heap    postgres    false            �            1259    16443    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �          0    16410    event_categories 
   TABLE DATA           C   COPY public.event_categories (id, name, display_order) FROM stdin;
    public          postgres    false    216   �$       �          0    16436    event_enrollments 
   TABLE DATA           �   COPY public.event_enrollments (id, id_event, id_user, description, registration_date_time, attended, observations, rating) FROM stdin;
    public          postgres    false    220   �$       �          0    16450    event_locations 
   TABLE DATA           �   COPY public.event_locations (id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) FROM stdin;
    public          postgres    false    222   %       �          0    16424 
   event_tags 
   TABLE DATA           :   COPY public.event_tags (id, id_event, id_tag) FROM stdin;
    public          postgres    false    218   8%       �          0    16429    events 
   TABLE DATA           �   COPY public.events (id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, "max_assistance ", id_creator_user, enabled_for_enrollment) FROM stdin;
    public          postgres    false    219   U%       �          0    16457 	   locations 
   TABLE DATA           O   COPY public.locations (id, name, id_province, latitude, longitude) FROM stdin;
    public          postgres    false    223   r%       �          0    16403 	   provinces 
   TABLE DATA           \   COPY public.provinces (id, name, full_name, latitude, longitude, display_order) FROM stdin;
    public          postgres    false    215   �%       �          0    16417    tags 
   TABLE DATA           (   COPY public.tags (id, name) FROM stdin;
    public          postgres    false    217   �%       �          0    16443    users 
   TABLE DATA           N   COPY public.users (id, first_name, last_name, username, password) FROM stdin;
    public          postgres    false    221   �%       :           2606    16409    provinces Provinces_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT "Provinces_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.provinces DROP CONSTRAINT "Provinces_pkey";
       public            postgres    false    215            <           2606    16416 &   event_categories event_categories_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT event_categories_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.event_categories DROP CONSTRAINT event_categories_pkey;
       public            postgres    false    216            D           2606    16442 (   event_enrollments event_enrollments_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.event_enrollments
    ADD CONSTRAINT event_enrollments_pkey PRIMARY KEY (id_user);
 R   ALTER TABLE ONLY public.event_enrollments DROP CONSTRAINT event_enrollments_pkey;
       public            postgres    false    220            H           2606    16456 $   event_locations event_locations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.event_locations
    ADD CONSTRAINT event_locations_pkey PRIMARY KEY (id_location);
 N   ALTER TABLE ONLY public.event_locations DROP CONSTRAINT event_locations_pkey;
       public            postgres    false    222            @           2606    16428    event_tags event_tags_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.event_tags
    ADD CONSTRAINT event_tags_pkey PRIMARY KEY (id_event);
 D   ALTER TABLE ONLY public.event_tags DROP CONSTRAINT event_tags_pkey;
       public            postgres    false    218            B           2606    16435    events events_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id_event_category);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public            postgres    false    219            J           2606    16463    locations locations_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id_province);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public            postgres    false    223            >           2606    16423    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public            postgres    false    217            F           2606    16449    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    221            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     