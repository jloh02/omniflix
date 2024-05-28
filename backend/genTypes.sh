yarn -s supabase gen types typescript --local > ./supabase/functions/_shared/types.gen.ts
cat ./supabase/functions/_shared/types.gen.ts > ../frontend/utils/supabase/types.gen.ts
