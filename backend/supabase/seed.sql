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

-- test user email identities
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

-- generate movies
INSERT INTO
  public.movies (imdb_id, title, year, poster_url) (
    select
      'tt' || RIGHT('0000000' || (ROW_NUMBER() OVER() - 1), 7),
      'Movie ' || (ROW_NUMBER() OVER() - 1),
      2000,
      'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg'
    FROM
      generate_series(0, 100)
  );