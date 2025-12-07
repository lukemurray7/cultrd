import { ButtonQuestionPage } from "../../../components/pages/ButtonQuestionPage";

export default function AgeScreen() {
  return (
    <ButtonQuestionPage
      title="What is your age?"
      options={[
        "17 or younger",
        "18 - 24",
        "25 - 34",
        "35 - 44",
        "45 or older",
      ]}
      progress={21}
      nextRoute="/pages/onboarding/gender"
    />
  );
}

