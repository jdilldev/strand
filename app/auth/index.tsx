import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function AuthScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) router.replace("/projects");
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) router.replace("/projects");
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const signIn = async () => {
    await supabase.auth.signInWithPassword({
      email: "jdilldev@gmail.com",
      password: "password123",
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
