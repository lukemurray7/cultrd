import { useEffect, useMemo, useRef } from "react";
import { Animated, Image, ImageSourcePropType } from "react-native";
import { useThemeMode } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

const logoWhite = require("../../../../../assets/images/logo-white.png");
const logoBlack = require("../../../../../assets/images/logo-black.png");

interface WelcomeLogoIntroProps {
  tagline: string;
}

export const WelcomeLogoIntro = ({ tagline }: WelcomeLogoIntroProps) => {
  const { colorScheme } = useThemeMode();

  const words = useMemo(() => tagline.trim().split(/\s+/).filter(Boolean), [tagline]);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const wordOpacities = useRef(words.map(() => new Animated.Value(0))).current;
  const wordTranslateX = useRef(words.map(() => new Animated.Value(24))).current;

  useEffect(() => {
    logoOpacity.setValue(0);
    wordOpacities.forEach((v) => v.setValue(0));
    wordTranslateX.forEach((v) => v.setValue(24));

    const wordAnims = words.map((_, idx) =>
      Animated.parallel([
        Animated.timing(wordOpacities[idx], {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(wordTranslateX[idx], {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.stagger(140, wordAnims),
    ]).start();
  }, [logoOpacity, wordOpacities, wordTranslateX, words]);

  const logoSource: ImageSourcePropType = colorScheme === "dark" ? logoWhite : logoBlack;

  return (
    <Box center gap={2}>
      <Animated.View style={{ opacity: logoOpacity }}>
        <Image source={logoSource} style={{ width: 180, height: 90, resizeMode: "contain" }} />
      </Animated.View>

      <Box row style={{ flexWrap: "wrap", justifyContent: "center", maxWidth: "80%" }}>
        {words.map((word, idx) => (
          <Animated.View
            key={`${word}-${idx}`}
            style={{
              opacity: wordOpacities[idx],
              transform: [{ translateX: wordTranslateX[idx] }],
              marginRight: idx === words.length - 1 ? 0 : 6,
            }}
          >
            <Text variant="secondary" size="md" style={{ textAlign: "center" }}>
              {word}
            </Text>
          </Animated.View>
        ))}
      </Box>
    </Box>
  );
};


