declare module "lottie-react-native" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  interface LottieViewProps {
    source: any;
    style?: ViewStyle;
    autoPlay?: boolean;
    loop?: boolean;
    speed?: number;
    onAnimationFinish?: () => void;
    onAnimationFailure?: () => void;
  }

  export default class LottieView extends Component<LottieViewProps> {}
}

