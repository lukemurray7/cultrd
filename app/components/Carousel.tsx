import { Dimensions, StyleSheet, View } from "react-native";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { spacing, borders } from "../theme/colors";

interface CarouselProps {
  children: React.ReactNode[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - spacing.xxl) * 0.90;

export function Carousel({ children }: CarouselProps) {
  return (
    <View style={styles.container} collapsable={false}>
      <ReanimatedCarousel
        width={CARD_WIDTH}
        height={400}
        data={children}
        renderItem={({ item, index }) => <View style={styles.cardWrapper}>{item}</View>}
        defaultIndex={0}
        scrollAnimationDuration={500}        
        loop={false}
        snapEnabled={true}
        style={styles.carousel}
        enabled={true}
        onConfigurePanGesture={(gesture) => gesture.activeOffsetX([-10, 10])}
        windowSize={3}
      />
    </View>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  container: {
    marginLeft: spacing.xxl,
    alignItems: "center",
  },
  carousel: {
    width: SCREEN_WIDTH,
  },
  cardWrapper: {
    paddingHorizontal: spacing.xs,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: borders.radius.xl,
  },
});
