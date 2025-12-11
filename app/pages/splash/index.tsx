import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

export default function SplashScreen() {
  const router = useRouter();
  const { session, loading } = useAuth();

  useEffect(() => {
    const checkAuthAndRoute = async () => {
      if (loading) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!session) {
        router.replace("/pages/onboarding/start");
        return;
      }

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", session.user.id)
          .single();

        if (profile?.onboarding_completed) {
          router.replace("/pages/home");
        } else {
          router.replace("/pages/onboarding/start");
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        router.replace("/pages/onboarding/start");
      }
    };

    checkAuthAndRoute();
  }, [session, loading, router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/icon.png")}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "serif",
    letterSpacing: 1,
  },
});
