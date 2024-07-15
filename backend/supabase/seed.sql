-- Adapted from https://gist.github.com/khattaksd/4e8f4c89f4e928a2ecaad56d4a17ecd1
-- create users
INSERT INTO
  auth.users(
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) (
    select
      '00000000-0000-0000-0000-000000000000',
      (
        '00000000-0000-0000-0000-' || RIGHT('000000000000' || (ROW_NUMBER() OVER()), 12)
      ) :: uuid,
      'authenticated',
      'authenticated',
      'user' ||(ROW_NUMBER() OVER()) || '@email.com',
      crypt('test_password', gen_salt('bf')),
      current_timestamp,
      current_timestamp,
      current_timestamp,
      '{"provider":"email","providers":["email"]}',
      '{}',
      current_timestamp,
      current_timestamp,
      '',
      '',
      '',
      ''
    FROM
      generate_series(1, 10)
  );

-- user email identities
INSERT INTO
  auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) (
    select
      uuid_generate_v4 (),
      id,
      id,
      format('{"sub":"%s","email":"%s"}', id :: text, email) :: jsonb,
      'email',
      current_timestamp,
      current_timestamp,
      current_timestamp
    from
      auth.users
  );

-- users info
INSERT INTO
  public.users_info(user_id, name, username, bio) (
    select
      (
        '00000000-0000-0000-0000-' || RIGHT('000000000000' || (ROW_NUMBER() OVER()), 12)
      ) :: uuid,
      'Name' || (ROW_NUMBER() OVER()),
      'username' ||(ROW_NUMBER() OVER()),
      'Bio for user' ||(ROW_NUMBER() OVER())
    FROM
      generate_series(1, 8)
  );

-- generate movies
INSERT INTO
  public.media ("media_specific_id", "media_type")
VALUES
  ('tt0363771', 'movie'),
  ('tt0110148', 'movie'),
  ('tt0296572', 'movie'),
  ('tt0499448', 'movie'),
  ('tt0980970', 'movie'),
  ('tt0416236', 'movie'),
  ('tt2990140', 'movie'),
  ('tt11057644', 'movie'),
  ('tt0407658', 'movie'),
  ('tt0366620', 'movie'),
  ('tt5884052', 'movie'),
  ('tt0190641', 'movie'),
  ('tt0210234', 'movie'),
  ('tt0235679', 'movie'),
  ('tt0287635', 'movie'),
  ('tt6595896', 'movie'),
  ('tt0347791', 'movie'),
  ('tt8856470', 'movie'),
  ('tt0875609', 'movie'),
  ('tt0420076', 'movie'),
  ('tt1201607', 'movie'),
  ('tt0241527', 'movie'),
  ('tt0295297', 'movie'),
  ('tt0304141', 'movie'),
  ('tt0330373', 'movie'),
  ('tt0373889', 'movie'),
  ('tt0926084', 'movie'),
  ('tt0417741', 'movie'),
  ('tt0098635', 'movie'),
  ('tt0066999', 'movie'),
  ('tt0076759', 'movie'),
  ('tt0080684', 'movie'),
  ('tt0086190', 'movie'),
  ('tt2488496', 'movie'),
  ('tt0120915', 'movie'),
  ('tt0121766', 'movie'),
  ('tt0121765', 'movie'),
  ('tt3748528', 'movie'),
  ('tt2527336', 'movie'),
  ('tt2527338', 'movie'),
  ('tt5159842', 'movie'),
  ('tt7494176', 'movie'),
  ('tt8490876', 'movie'),
  ('tt11668536', 'movie'),
  ('tt26083178', 'movie'),
  ('tt27563547', 'movie'),
  ('tt0250413', 'movie'),
  ('tt2318537', 'movie'),
  ('tt2931968', 'movie'),
  ('tt0343814', 'movie'),
  ('tt0033735', 'movie'),
  ('tt12252330', 'movie'),
  ('tt12275496', 'movie'),
  ('tt16116174', 'movie'),
  ('tt1756545', 'movie'),
  ('tt1049413', 'movie'),
  ('tt0892769', 'movie'),
  ('tt1568346', 'movie'),
  ('tt1646971', 'movie'),
  ('tt0289765', 'movie'),
  ('tt0190332', 'movie'),
  ('tt1132620', 'movie'),
  ('tt5109280', 'movie'),
  ('tt0859163', 'movie'),
  ('tt2386490', 'movie'),
  ('tt0070034', 'movie'),
  ('tt2911666', 'movie'),
  ('tt4425200', 'movie'),
  ('tt6146586', 'movie'),
  ('tt0120601', 'movie'),
  ('tt10366206', 'movie'),
  ('tt0401729', 'movie'),
  ('tt0989757', 'movie'),
  ('tt0251160', 'movie'),
  ('tt0455967', 'movie'),
  ('tt1783732', 'movie'),
  ('tt7983428', 'movie'),
  ('tt0366864', 'movie'),
  ('tt1453252', 'movie'),
  ('tt1838617', 'movie'),
  ('tt13979128', 'movie'),
  ('tt14509842', 'movie'),
  ('tt15378088', 'movie'),
  ('tt0073707', 'movie'),
  ('tt10011102', 'movie'),
  ('tt0391099', 'movie'),
  ('tt0271138', 'movie'),
  ('tt0270994', 'movie'),
  ('tt0271173', 'movie'),
  ('tt0273405', 'movie'),
  ('tt0400732', 'movie'),
  ('tt0400818', 'movie'),
  ('tt0270820', 'movie'),
  ('tt0441773', 'movie'),
  ('tt1302011', 'movie'),
  ('tt2267968', 'movie'),
  ('tt0373074', 'movie'),
  ('tt21692408', 'movie'),
  ('tt2952602', 'movie'),
  ('tt4217392', 'movie');

INSERT INTO
  public.movies (
    "imdb_id",
    "created_at",
    "title",
    "year",
    "rated",
    "released",
    "runtime",
    "genre",
    "data",
    "poster_url",
    "imdb_rating"
  )
VALUES
  (
    'tt0363771',
    null,
    'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
    '2005',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTc0NTUwMTU5OV5BMl5BanBnXkFtZTcwNjAwNzQzMw@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0110148',
    null,
    'Interview with the Vampire: The Vampire Chronicles',
    '1994',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BYThmYjJhMGItNjlmOC00ZDRiLWEzNjUtZjU4MjA3MzY0MzFmXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg',
    null
  ),
  (
    'tt0296572',
    null,
    'The Chronicles of Riddick',
    '2004',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNzBjNmJkYjUtMTFjMC00ZWI5LWEyM2YtNzczOTczMmM1ODY5XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg',
    null
  ),
  (
    'tt0499448',
    null,
    'The Chronicles of Narnia: Prince Caspian',
    '2008',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BM2Q3NWExNjYtM2MwMC00NmM0LTgzZDctMzcxNjE4ZTk5ODA3XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0980970',
    null,
    'The Chronicles of Narnia: The Voyage of the Dawn Treader',
    '2010',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZWZkMzhhMTctYzBkMy00ZTIxLWFiY2ItNTEyYmQzMGQ4ZmU4XkEyXkFqcGdeQXVyNTA3MTU2MjE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0416236',
    null,
    'The Spiderwick Chronicles',
    '2008',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNjJkMjRiZTEtM2VmMi00ZmYzLWI2ZTktYmVhNWZhOTMzNmExXkEyXkFqcGdeQXVyMTUyNjc3NDQ4._V1_SX300.jpg',
    null
  ),
  (
    'tt2990140',
    null,
    'The Christmas Chronicles',
    '2018',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNTA3NjU3OTM2MV5BMl5BanBnXkFtZTgwNjQ2MzE1NjM@._V1_SX300.jpg',
    null
  ),
  (
    'tt11057644',
    null,
    'The Christmas Chronicles: Part Two',
    '2020',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMGJiZDc1OWMtNzMwMC00NzM0LTljMDgtZGJjODVhZDMzMmJjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    null
  ),
  (
    'tt0407658',
    null,
    'The Chronicles of Riddick: Dark Fury',
    '2004',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BY2ZmOWY0ZDEtMGNlMi00YmY1LWEyNjctZWI4ZjQyZDU4NThiXkEyXkFqcGdeQXVyMzg2MzE2OTE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0366620',
    null,
    'The Chronicles of Riddick: Into Pitch Black',
    '2000',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BYWQ4ODNlMjItOTRmZi00ODZkLWIzZmItZWJlNTk5M2MzZDBkXkEyXkFqcGdeQXVyNjM4MDY1NTQ@._V1_SX300.jpg',
    null
  ),
  (
    'tt5884052',
    null,
    'Pokémon: Detective Pikachu',
    '2019',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMDkxNzRmNDYtMDY0OS00N2JhLTkzZWUtMWE3MzZkNDk1MmJiXkEyXkFqcGdeQXVyNTA3MTU2MjE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0190641',
    null,
    'Pokémon: The First Movie - Mewtwo Strikes Back',
    '1998',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZGM3MjQ3NTQtNzRiZi00MDUzLWFjYjEtZWJjMjUwYzExYjRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
    null
  ),
  (
    'tt0210234',
    null,
    'Pokémon the Movie 2000',
    '1999',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNzE1NjBiODAtNDVhNS00ZTI1LTg4ZjUtZTk3OWVhODljMjNjXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_SX300.jpg',
    null
  ),
  (
    'tt0235679',
    null,
    'Pokémon 3 the Movie: Spell of the Unown',
    '2000',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTk0NzM3MDY1OV5BMl5BanBnXkFtZTYwNTkwODc5._V1_SX300.jpg',
    null
  ),
  (
    'tt0287635',
    null,
    'Pokemon 4Ever: Celebi - Voice of the Forest',
    '2001',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZDZiYjc3MWYtODE5Mi00MDM5LWFkZTAtNjAzZmUxMzc4ZGQxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    null
  ),
  (
    'tt6595896',
    null,
    'Pokémon the Movie: I Choose You!',
    '2017',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BM2U3NmI4YzItYmRiNi00M2UxLWExNTYtNDZkZmJlNzlmM2M3XkEyXkFqcGdeQXVyNDkzMjE0NDE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0347791',
    null,
    'Pokémon Heroes',
    '2002',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BODg3OTljOTktNmI3Ny00MDczLTk2NGItNWRiOTE2YjQ1OWI0XkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_SX300.jpg',
    null
  ),
  (
    'tt8856470',
    null,
    'Pokémon: Mewtwo Strikes Back - Evolution',
    '2019',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BYTlmMjc0YzgtMDlmYy00NGY4LTgyOTAtODI2MzllNWI1ODBkXkEyXkFqcGdeQXVyMTMxNDQyNjM5._V1_SX300.jpg',
    null
  ),
  (
    'tt0875609',
    null,
    'Pokémon: Lucario and the Mystery of Mew',
    '2005',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTUxOTcwNjAwMl5BMl5BanBnXkFtZTgwMjc2MzQ2NjE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0420076',
    null,
    'Pokémon: Jirachi - Wish Maker',
    '2003',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNmU4NmRmNmEtYjQ2YS00ZmNiLTlkZjgtMmY5NDQ3Mzk0ODdiXkEyXkFqcGdeQXVyOTA1ODU0Mzc@._V1_SX300.jpg',
    null
  ),
  (
    'tt1201607',
    null,
    'Harry Potter and the Deathly Hallows: Part 2',
    '2011',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0241527',
    null,
    'Harry Potter and the Sorcerernulls Stone',
    '2001',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg',
    null
  ),
  (
    'tt0295297',
    null,
    'Harry Potter and the Chamber of Secrets',
    '2002',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_SX300.jpg',
    null
  ),
  (
    'tt0304141',
    null,
    'Harry Potter and the Prisoner of Azkaban',
    '2004',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0330373',
    null,
    'Harry Potter and the Goblet of Fire',
    '2005',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0373889',
    null,
    'Harry Potter and the Order of the Phoenix',
    '2007',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDc5LWFkN2YtNzNlY2UxZmY0N2IyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
    null
  ),
  (
    'tt0926084',
    null,
    'Harry Potter and the Deathly Hallows: Part 1',
    '2010',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0417741',
    null,
    'Harry Potter and the Half-Blood Prince',
    '2009',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0098635',
    null,
    'When Harry Met Sally...',
    '1989',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMjE0ODEwNjM2NF5BMl5BanBnXkFtZTcwMjU2Mzg3NA@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0066999',
    null,
    'Dirty Harry',
    '1971',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMzdhMTM2YTItOWU2YS00MTM0LTgyNDYtMDM1OWM3NzkzNTM2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
    null
  ),
  (
    'tt0076759',
    null,
    'Star Wars: Episode IV - A New Hope',
    '1977',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
    null
  ),
  (
    'tt0080684',
    null,
    'Star Wars: Episode V - The Empire Strikes Back',
    '1980',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    null
  ),
  (
    'tt0086190',
    null,
    'Star Wars: Episode VI - Return of the Jedi',
    '1983',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    null
  ),
  (
    'tt2488496',
    null,
    'Star Wars: Episode VII - The Force Awakens',
    '2015',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0120915',
    null,
    'Star Wars: Episode I - The Phantom Menace',
    '1999',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0121766',
    null,
    'Star Wars: Episode III - Revenge of the Sith',
    '2005',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0121765',
    null,
    'Star Wars: Episode II - Attack of the Clones',
    '2002',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg',
    null
  ),
  (
    'tt3748528',
    null,
    'Rogue One: A Star Wars Story',
    '2016',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg',
    null
  ),
  (
    'tt2527336',
    null,
    'Star Wars: Episode VIII - The Last Jedi',
    '2017',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg',
    null
  ),
  (
    'tt2527338',
    null,
    'Star Wars: Episode IX - The Rise of Skywalker',
    '2019',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg',
    null
  ),
  (
    'tt5159842',
    null,
    'Jochem Myjer: Yeee-haa',
    '2006',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BODA0MTBmMWQtYTE5MC00Yjc2LTliY2EtMzkxMmNiYTExZGY2XkEyXkFqcGdeQXVyMTgwOTE5NDk@._V1_SX300.jpg',
    null
  ),
  (
    'tt7494176',
    null,
    'Ceon Haa Zi Gaau',
    '2010',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt8490876',
    null,
    'Haa Mee Maratha',
    '2018',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZmVkNzM4YTMtMzYzZC00NGIzLTk2MjQtMWNhOThkMTRjMmYzXkEyXkFqcGdeQXVyMjcwNDMwMDg@._V1_SX300.jpg',
    null
  ),
  (
    'tt11668536',
    null,
    'Haa',
    '2007',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt26083178',
    null,
    'Wai Onlawon Haa',
    '2022',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZDkyZGRmOTktZTEyNi00MGNmLTlhMmEtN2MwODIyZGUzNmJmXkEyXkFqcGdeQXVyNTkzNjEwMjI@._V1_SX300.jpg',
    null
  ),
  (
    'tt27563547',
    null,
    'Haa Hun Dikari No Baap',
    '2013',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZTczNDk1YjItZTYxOC00NzgwLWFmNDEtMzM5MjFlZmY5YTlkXkEyXkFqcGdeQXVyODA4MzQ2NDk@._V1_SX300.jpg',
    null
  ),
  (
    'tt0250413',
    null,
    'Haa Mazha Marg Eklaa',
    '1963',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZWZhNDU1NzMtMDNiNC00MDhmLWFlZmYtZDRmYWMxODQ3Yjc0XkEyXkFqcGdeQXVyNjkwOTg4MTA@._V1_SX300.jpg',
    null
  ),
  (
    'tt2318537',
    null,
    'Häh häh hää',
    '1974',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt2931968',
    null,
    'Háry János',
    '1983',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOTdmZDZjMDMtY2UyZS00NzM0LWFkNzQtNzhkMmM4ZjFiNzc4L2ltYWdlXkEyXkFqcGdeQXVyNDUxNjc5NjY@._V1_SX300.jpg',
    null
  ),
  (
    'tt0343814',
    null,
    'Háry János',
    '1965',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMmE2NjY3YTgtYjUyZS00YmI0LWJlOTctMjA2MGY3ZjIxOWY3XkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0033735',
    null,
    'Háry János',
    '1941',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZjNmYWQzYTYtNjEzOC00MjMwLThkNDMtNGRlODAxMTQzYjI0XkEyXkFqcGdeQXVyNzA1OTk3Mw@@._V1_SX300.jpg',
    null
  ),
  (
    'tt12252330',
    null,
    'Kodály Zoltán: Háry János',
    '1962',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt12275496',
    null,
    'Háry János',
    '1964',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt16116174',
    null,
    'Harry Potter 20th Anniversary: Return to Hogwarts',
    '2022',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZWRlMjI2YzgtOTRiOC00NTMwLTgyNDctMWY0ZGUzNzUxYmYzXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
    null
  ),
  (
    'tt1756545',
    null,
    'Harry Potter and the Forbidden Journey',
    '2010',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNDM0YzMyNGUtMTU1Yy00OTE2LWE5NzYtZDZhMTBmN2RkNjg3XkEyXkFqcGdeQXVyMzU5NjU1MDA@._V1_SX300.jpg',
    null
  ),
  (
    'tt1049413',
    null,
    'Up',
    '2009',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BYjBkM2RjMzItM2M3Ni00N2NjLWE3NzMtMGY4MzE4MDAzMTRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
    null
  ),
  (
    'tt0892769',
    null,
    'How to Train Your Dragon',
    '2010',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_SX300.jpg',
    null
  ),
  (
    'tt1568346',
    null,
    'The Girl with the Dragon Tattoo',
    '2011',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTczNDk4NTQ0OV5BMl5BanBnXkFtZTcwNDAxMDgxNw@@._V1_SX300.jpg',
    null
  ),
  (
    'tt1646971',
    null,
    'How to Train Your Dragon 2',
    '2014',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMzMwMTAwODczN15BMl5BanBnXkFtZTgwMDk2NDA4MTE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0289765',
    null,
    'Red Dragon',
    '2002',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOTAwZDI1OTctN2Q5YS00OGNiLWIyMmUtYWM4ZGFjYWYyYzJjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg',
    null
  ),
  (
    'tt0190332',
    null,
    'Crouching Tiger, Hidden Dragon',
    '2000',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNDdhMzMxOTctNDMyNS00NTZmLTljNWEtNTc4MDBmZTYxY2NmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    null
  ),
  (
    'tt1132620',
    null,
    'The Girl with the Dragon Tattoo',
    '2009',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTc2Mjc0MDg3MV5BMl5BanBnXkFtZTcwMjUzMDkxMw@@._V1_SX300.jpg',
    null
  ),
  (
    'tt5109280',
    null,
    'Raya and the Last Dragon',
    '2021',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00ZGNkLThkOWEtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0859163',
    null,
    'The Mummy: Tomb of the Dragon Emperor',
    '2008',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTU4NDIzMDY1OV5BMl5BanBnXkFtZTcwNjQxMzk3MQ@@._V1_SX300.jpg',
    null
  ),
  (
    'tt2386490',
    null,
    'How to Train Your Dragon: The Hidden World',
    '2019',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMjIwMDIwNjAyOF5BMl5BanBnXkFtZTgwNDE1MDc2NTM@._V1_SX300.jpg',
    null
  ),
  (
    'tt0070034',
    null,
    'Enter the Dragon',
    '1973',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNGZiMTkyNzQtMDdmZi00ZDNkLWE4YTAtZGNlNTIzYzQyMGM2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
    null
  ),
  (
    'tt2911666',
    null,
    'John Wick',
    '2014',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg',
    null
  ),
  (
    'tt4425200',
    null,
    'John Wick: Chapter 2',
    '2017',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_SX300.jpg',
    null
  ),
  (
    'tt6146586',
    null,
    'John Wick: Chapter 3 - Parabellum',
    '2019',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg',
    null
  ),
  (
    'tt0120601',
    null,
    'Being John Malkovich',
    '1999',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTFlYjgyMjUtNmJhZS00MDY2LTg0ZmMtNTVlNDA2NTUwYTRjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg',
    null
  ),
  (
    'tt10366206',
    null,
    'John Wick: Chapter 4',
    '2023',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg',
    null
  ),
  (
    'tt0401729',
    null,
    'John Carter',
    '2012',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMDEwZmIzNjYtNjUwNS00MzgzLWJiOGYtZWMxZGQ5NDcxZjUwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
    null
  ),
  (
    'tt0989757',
    null,
    'Dear John',
    '2010',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTk1NDEzMTU5NV5BMl5BanBnXkFtZTcwNTI3MTk5Mg@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0251160',
    null,
    'John Q',
    '2002',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTcxNTQ1MzAyOF5BMl5BanBnXkFtZTYwNDg0ODk4._V1_SX300.jpg',
    null
  ),
  (
    'tt0455967',
    null,
    'John Tucker Must Die',
    '2006',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOGIxZTkzMjItZDhiNy00NzA0LTg1MzMtYzFlMTc1ODQzODIzXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
    null
  ),
  (
    'tt1783732',
    null,
    'John Dies at the End',
    '2012',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTUyNzIyNzc0MV5BMl5BanBnXkFtZTcwOTM5ODg1OA@@._V1_SX300.jpg',
    null
  ),
  (
    'tt7983428',
    null,
    'Panchayat',
    '2017',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOTViZGIxYjAtNWU2OS00ZTY5LWEwYjctZjgwN2U0ZGJlOWNkXkEyXkFqcGdeQXVyNzQ3NTY5MjE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0366864',
    null,
    'Panchayat',
    '1958',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMGY3ZTQ2YjktYzI0Zi00NTkwLTkwNWItOTVjNzRjNDk1NWE1XkEyXkFqcGdeQXVyMTEwNDI2NDcz._V1_SX300.jpg',
    null
  ),
  (
    'tt1453252',
    null,
    'Makkala Panchayat',
    '2007',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt1838617',
    null,
    'Panchayat',
    '1996',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZGE0YTY4YmYtNjgzZC00NzVjLTg5YTktYTk0NzQ0MmNmNzIxXkEyXkFqcGdeQXVyODQwMDcwNDY@._V1_SX300.jpg',
    null
  ),
  (
    'tt13979128',
    null,
    'Pyaar Banam Khap Panchayat',
    '2020',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BODY0N2ZiZjctNGFmMy00OWVmLWIzZjAtZjc3ZWMzNjBjMWJmXkEyXkFqcGdeQXVyNTcwNDU1NTI@._V1_SX300.jpg',
    null
  ),
  (
    'tt14509842',
    null,
    'Paani Panchayat',
    '2017',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZWU1MjRhODQtYmRhYi00NGM2LThmM2MtMDc4N2ExMzIyMTg4XkEyXkFqcGdeQXVyNTcxNzAzMTM@._V1_SX300.jpg',
    null
  ),
  (
    'tt15378088',
    null,
    'Wound of Panchayat',
    '2009',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNWZmNjFhM2MtNzNiZC00MmE4LTljZjgtZGFhZTVmYmU2OTY3XkEyXkFqcGdeQXVyOTYyOTMxNTU@._V1_SX300.jpg',
    null
  ),
  (
    'tt0073707',
    null,
    'Sholay',
    '1975',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BOWQ0YTUzYzItYjI0MC00OTZmLWE1MWQtY2EzMzU2MTlmMmJjXkEyXkFqcGdeQXVyMDkwNTkwNg@@._V1_SX300.jpg',
    null
  ),
  (
    'tt10011102',
    null,
    'The Sholay Girl',
    '2019',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMDA4MTBiYWQtYWQ5Zi00MDU5LWEwYTUtNzJmN2JmYzZhYTQ4XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0391099',
    null,
    'Duplicate Sholay',
    '2002',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMGMzMTQ1ZmMtNmUyYi00MTZjLTg4YWQtOWE3MTE2YWI4OWMxXkEyXkFqcGdeQXVyMDkwNTkwNg@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0271138',
    null,
    'Ramgarh Ke Sholay',
    '1991',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMWMwZjdhZTgtNzI3Mi00YzkwLWE4ZGEtMTExMmQyOGFkZGJhXkEyXkFqcGdeQXVyMjkwMzIxNTY@._V1_SX300.jpg',
    null
  ),
  (
    'tt0270994',
    null,
    'Hong Kong Key Sholay',
    '1985',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNGE3NzBkNDUtMTU1Yy00OWJhLWE0NDAtYWU5ZmU3ZGQwOWY0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAzMTc1NjE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0271173',
    null,
    'Sholay',
    '1984',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMzZlOGJmZGYtNDlmYy00NDY3LTkwMzAtMTRlZTQzZWNiMzZkXkEyXkFqcGdeQXVyOTM3ODI3Mjk@._V1_SX300.jpg',
    null
  ),
  (
    'tt0273405',
    null,
    'Aag Aur Sholay',
    '1987',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt0400732',
    null,
    'Phool Aur Sholay',
    '1976',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt0400818',
    null,
    'Sholay',
    '1977',
    null,
    null,
    null,
    null,
    null,
    'N/A',
    null
  ),
  (
    'tt0270820',
    null,
    'Aag Ke Sholay',
    '1988',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZjMwODdlMDktOWJiZC00MzQ0LTkxMjYtMzVmYmRiNzBhNzM4XkEyXkFqcGdeQXVyNDQ0ODI2MQ@@._V1_SX300.jpg',
    null
  ),
  (
    'tt0441773',
    null,
    'Kung Fu Panda',
    '2008',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BODJkZTZhMWItMDI3Yy00ZWZlLTk4NjQtOTI1ZjU5NjBjZTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    null
  ),
  (
    'tt1302011',
    null,
    'Kung Fu Panda 2',
    '2011',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BYzQ0ZWIxZjAtYWI3Yy00MGM0LWFjOGYtNzcyYThiOTA3ODI1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    null
  ),
  (
    'tt2267968',
    null,
    'Kung Fu Panda 3',
    '2016',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_SX300.jpg',
    null
  ),
  (
    'tt0373074',
    null,
    'Kung Fu Hustle',
    '2004',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMjZiOTNlMzYtZWYwZS00YWJjLTk5NDgtODkwNjRhMDI0MjhjXkEyXkFqcGdeQXVyMjgyNjk3MzE@._V1_SX300.jpg',
    null
  ),
  (
    'tt21692408',
    null,
    'Kung Fu Panda 4',
    '2024',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BZDY0YzI0OTctYjVhYy00MTVhLWE0NTgtYTRmYTBmOTE3YTViXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
    null
  ),
  (
    'tt2952602',
    null,
    'Kung Fu Jungle',
    '2014',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BMTYwMjY5NzcxMl5BMl5BanBnXkFtZTgwODYxNzIxNTE@._V1_SX300.jpg',
    null
  ),
  (
    'tt4217392',
    null,
    'Kung Fu Yoga',
    '2017',
    null,
    null,
    null,
    null,
    null,
    'https://m.media-amazon.com/images/M/MV5BNTAxZTQ4MmMtNDU2OS00NGRhLTllMmItZDQwODZlNTdjYzQyL2ltYWdlXkEyXkFqcGdeQXVyMjU3NTI0Mg@@._V1_SX300.jpg',
    null
  );

INSERT INTO
  reviews(
    "user_id",
    "media_id",
    "rating",
    "title",
    "description"
  )
VALUES
  (
    '00000000-0000-0000-0000-000000000001' :: uuid,
    1,
    5,
    'Review Title',
    'Review Description'
  ),
  (
    '00000000-0000-0000-0000-000000000001' :: uuid,
    2,
    5,
    'Review Title',
    'Review Description'
  ),
  (
    '00000000-0000-0000-0000-000000000001' :: uuid,
    3,
    5,
    'Review Title',
    'Review Description'
  ),
  (
    '00000000-0000-0000-0000-000000000001' :: uuid,
    4,
    5,
    'Review Title',
    'Review Description'
  ),
  (
    '00000000-0000-0000-0000-000000000001' :: uuid,
    5,
    0,
    'Review Title',
    'Review Description'
  ),
  (
    '00000000-0000-0000-0000-000000000002' :: uuid,
    1,
    5,
    'Review Title',
    'Review Description'
  ),
  (
    '00000000-0000-0000-0000-000000000002' :: uuid,
    2,
    5,
    'Review Title',
    'Review Description'
  ),
  (
    '00000000-0000-0000-0000-000000000003' :: uuid,
    1,
    0,
    'Review Title',
    'Review Description'
  ),
  (
    '00000000-0000-0000-0000-000000000004' :: uuid,
    5,
    0,
    'Review Title',
    'Review Description'
  );