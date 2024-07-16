export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      collection_entries: {
        Row: {
          collection_id: number
          created_at: string
          id: number
          media_id: number
        }
        Insert: {
          collection_id: number
          created_at?: string
          id?: number
          media_id: number
        }
        Update: {
          collection_id?: number
          created_at?: string
          id?: number
          media_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "collection_entries_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_entries_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_id"]
          },
        ]
      }
      collection_users: {
        Row: {
          collection_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          collection_id: number
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          collection_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_users_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "collection_users_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string
          id: number
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          owner_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "collections_owner_id_fkey1"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites_entries: {
        Row: {
          created_at: string
          id: number
          media_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          media_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          media_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "discover_latest"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "favorites_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "favorites_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_favorites"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "favorites_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_likes"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "favorites_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_reviews"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "favorites_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "user_recommendations"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "favorites_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      friend_requests: {
        Row: {
          created_at: string
          id: number
          request_direction: boolean
          user_id1: string
          user_id2: string
        }
        Insert: {
          created_at?: string
          id?: number
          request_direction: boolean
          user_id1: string
          user_id2: string
        }
        Update: {
          created_at?: string
          id?: number
          request_direction?: boolean
          user_id1?: string
          user_id2?: string
        }
        Relationships: [
          {
            foreignKeyName: "friend_requests_user_id1_fkey"
            columns: ["user_id1"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "friend_requests_user_id1_fkey1"
            columns: ["user_id1"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friend_requests_user_id2_fkey"
            columns: ["user_id2"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "friend_requests_user_id2_fkey1"
            columns: ["user_id2"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      friendships: {
        Row: {
          created_at: string
          id: number
          user_id1: string
          user_id2: string
        }
        Insert: {
          created_at?: string
          id?: number
          user_id1: string
          user_id2: string
        }
        Update: {
          created_at?: string
          id?: number
          user_id1?: string
          user_id2?: string
        }
        Relationships: [
          {
            foreignKeyName: "friendships_user_id1_fkey"
            columns: ["user_id1"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "friendships_user_id1_fkey1"
            columns: ["user_id1"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_user_id2_fkey"
            columns: ["user_id2"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "friendships_user_id2_fkey1"
            columns: ["user_id2"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      likes_dislikes: {
        Row: {
          created_at: string
          id: number
          media_id: number
          status: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          media_id: number
          status: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          media_id?: number
          status?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_dislikes_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "discover_latest"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "likes_dislikes_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "likes_dislikes_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_favorites"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "likes_dislikes_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_likes"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "likes_dislikes_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_reviews"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "likes_dislikes_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "user_recommendations"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "likes_dislikes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          media_id: number
          media_specific_id: string
          media_type: Database["public"]["Enums"]["media_type"]
        }
        Insert: {
          media_id?: never
          media_specific_id: string
          media_type: Database["public"]["Enums"]["media_type"]
        }
        Update: {
          media_id?: never
          media_specific_id?: string
          media_type?: Database["public"]["Enums"]["media_type"]
        }
        Relationships: []
      }
      movies: {
        Row: {
          created_at: string | null
          data: Json | null
          genre: string[] | null
          imdb_id: string
          imdb_rating: number | null
          media_type: Database["public"]["Enums"]["media_type"]
          poster_url: string | null
          rated: string | null
          released: string | null
          runtime: number | null
          title: string | null
          year: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          genre?: string[] | null
          imdb_id: string
          imdb_rating?: number | null
          media_type?: Database["public"]["Enums"]["media_type"]
          poster_url?: string | null
          rated?: string | null
          released?: string | null
          runtime?: number | null
          title?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          genre?: string[] | null
          imdb_id?: string
          imdb_rating?: number | null
          media_type?: Database["public"]["Enums"]["media_type"]
          poster_url?: string | null
          rated?: string | null
          released?: string | null
          runtime?: number | null
          title?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movies_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "discover_latest"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "movies_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "movies_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "top_favorites"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "movies_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "top_likes"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "movies_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "top_reviews"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "movies_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "user_recommendations"
            referencedColumns: ["media_type", "media_specific_id"]
          },
        ]
      }
      recommendations: {
        Row: {
          media_type: Database["public"]["Enums"]["media_type"]
          recommendations: number[] | null
          user_id: string
        }
        Insert: {
          media_type: Database["public"]["Enums"]["media_type"]
          recommendations?: number[] | null
          user_id: string
        }
        Update: {
          media_type?: Database["public"]["Enums"]["media_type"]
          recommendations?: number[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          description: string
          id: number
          media_id: number
          rating: number
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          media_id: number
          rating: number
          title: string
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          media_id?: number
          rating?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "discover_latest"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "reviews_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "reviews_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_favorites"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "reviews_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_likes"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "reviews_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_reviews"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "reviews_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "user_recommendations"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tv_series: {
        Row: {
          created_at: string | null
          data: Json | null
          genre: string[] | null
          imdb_id: string
          imdb_rating: number | null
          media_type: Database["public"]["Enums"]["media_type"]
          poster_url: string | null
          rated: string | null
          released: string | null
          runtime: number | null
          title: string | null
          year: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          genre?: string[] | null
          imdb_id: string
          imdb_rating?: number | null
          media_type?: Database["public"]["Enums"]["media_type"]
          poster_url?: string | null
          rated?: string | null
          released?: string | null
          runtime?: number | null
          title?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          genre?: string[] | null
          imdb_id?: string
          imdb_rating?: number | null
          media_type?: Database["public"]["Enums"]["media_type"]
          poster_url?: string | null
          rated?: string | null
          released?: string | null
          runtime?: number | null
          title?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tv_series_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "discover_latest"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "tv_series_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "tv_series_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "top_favorites"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "tv_series_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "top_likes"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "tv_series_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "top_reviews"
            referencedColumns: ["media_type", "media_specific_id"]
          },
          {
            foreignKeyName: "tv_series_media_fkey"
            columns: ["media_type", "imdb_id"]
            isOneToOne: false
            referencedRelation: "user_recommendations"
            referencedColumns: ["media_type", "media_specific_id"]
          },
        ]
      }
      upcoming: {
        Row: {
          created_at: string
          media_type: Database["public"]["Enums"]["media_type"]
          upcoming: number[]
        }
        Insert: {
          created_at?: string
          media_type: Database["public"]["Enums"]["media_type"]
          upcoming: number[]
        }
        Update: {
          created_at?: string
          media_type?: Database["public"]["Enums"]["media_type"]
          upcoming?: number[]
        }
        Relationships: []
      }
      user_following: {
        Row: {
          created_at: string
          following_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          following_id: string
          id?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          following_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_following_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_following_following_id_fkey1"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_following_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_following_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_info"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users_info: {
        Row: {
          bio: string | null
          name: string
          user_id: string
          username: string
        }
        Insert: {
          bio?: string | null
          name: string
          user_id: string
          username: string
        }
        Update: {
          bio?: string | null
          name?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlist_entries: {
        Row: {
          column_order: string
          created_at: string
          id: number
          media_id: number
          status_column: number
          user_id: string
        }
        Insert: {
          column_order?: string
          created_at?: string
          id?: never
          media_id: number
          status_column?: number
          user_id: string
        }
        Update: {
          column_order?: string
          created_at?: string
          id?: never
          media_id?: number
          status_column?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "discover_latest"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "watchlist_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "watchlist_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_favorites"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "watchlist_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_likes"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "watchlist_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "top_reviews"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "watchlist_entries_media_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "user_recommendations"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "watchlist_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      discover_latest: {
        Row: {
          media_id: number | null
          media_specific_id: string | null
          media_type: Database["public"]["Enums"]["media_type"] | null
        }
        Relationships: []
      }
      top_favorites: {
        Row: {
          favorites: number | null
          media_id: number | null
          media_specific_id: string | null
          media_type: Database["public"]["Enums"]["media_type"] | null
        }
        Relationships: []
      }
      top_likes: {
        Row: {
          likes: number | null
          media_id: number | null
          media_specific_id: string | null
          media_type: Database["public"]["Enums"]["media_type"] | null
        }
        Relationships: []
      }
      top_reviews: {
        Row: {
          media_id: number | null
          media_specific_id: string | null
          media_type: Database["public"]["Enums"]["media_type"] | null
          rating: number | null
        }
        Relationships: []
      }
      user_recommendations: {
        Row: {
          media_id: number | null
          media_specific_id: string | null
          media_type: Database["public"]["Enums"]["media_type"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      media_type: "movie" | "tv_series"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

