// Fix for Supabase wrong types for table joins with one to one relationships
// https://github.com/supabase/postgrest-js/issues/471#issuecomment-1696522983
function supabaseFixOneToOne<T>(objectOrNull: T[]): T | null {
  return (objectOrNull as T) || null;
}

export { supabaseFixOneToOne };
