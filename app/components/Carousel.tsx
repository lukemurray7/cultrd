import { Dimensions, StyleSheet, View } from "react-native";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { colors } from "../theme/colors";

interface CarouselProps {
  children: React.ReactNode[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.85;

export function Carousel({ children }: CarouselProps) {
  return (
    <View style={styles.container} collapsable={false}>
      <ReanimatedCarousel
        width={CARD_WIDTH}
        height={SCREEN_WIDTH}
        data={children}
        renderItem={({ item }) => <View style={styles.cardWrapper}>{item}</View>}
        defaultIndex={0}
        scrollAnimationDuration={500}
        loop={false}
        snapEnabled={true}
        style={styles.carousel}
        enabled={true}
        windowSize={3}
      />
    </View>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  carousel: {
    width: SCREEN_WIDTH,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});
