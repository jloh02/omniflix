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
      (
        '00000000-0000-0000-0000-' || RIGHT('000000000000' || (ROW_NUMBER() OVER()), 12)
      ) :: uuid,
      (
        '00000000-0000-0000-0000-' || RIGHT('000000000000' || (ROW_NUMBER() OVER()), 12)
      ) :: uuid,
      'authenticated',
      'authenticated',
      'user' ||(ROW_NUMBER() OVER()) || '@email.com',
      crypt('test_password_gen', gen_salt('bf')),
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

-- create watchlist entries
insert into
  watchlist_entries (user_id, media_type, media_id)
values
  (
    '00000000-0000-0000-0000-000000000001',
    'movie',
    'tt0111161'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'movie',
    'tt0111161'
  );