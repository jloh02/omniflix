create view "public"."collection_users_items" with(security_invoker = true) as  
SELECT 
  cu.collection_id,
  cu.user_id,
  ce.media_id
FROM (collection_users cu
  JOIN collection_entries ce ON ((cu.collection_id = ce.collection_id)));



