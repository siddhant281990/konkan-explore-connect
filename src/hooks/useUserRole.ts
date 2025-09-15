import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useUserRole() {
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error.message);
          setRole("user"); // fallback
        } else {
          setRole(profile?.role ?? "user");
        }
      } else {
        setRole(null); // not logged in
      }

      setLoading(false);
    };

    fetchRole();
  }, []);

  return { role, loading };
}

