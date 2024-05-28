yarn -s supabase gen types typescript --local > ./supabase/functions/utils/types.gen.ts
cat ./supabase/functions/utils/types.gen.ts > ../frontend/utils/supabase/types.gen.ts
