import LottieView from "lottie-react-native";
import { ViewStyle } from "react-native";

interface LottieAnimationProps {
  source: any;
  style?: ViewStyle;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
}

export const LottieAnimation = ({
  source,
  style,
  autoPlay = true,
  loop = false,
  speed = 1,
}: LottieAnimationProps) => {
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      speed={speed}
      style={style}
    />
  );
};


