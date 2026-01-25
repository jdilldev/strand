import LoadingScreen from "@/components/loading-screen";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        router.replace("/projects"); // redirect to real screen
      } else {
        router.replace("/auth");
      }
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          router.replace("/projects");
        } else {
          router.replace("/auth");
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return <LoadingScreen />;
}
