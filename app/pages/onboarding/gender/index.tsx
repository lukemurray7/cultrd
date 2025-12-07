import { ButtonQuestionPage } from "../../../components/pages/ButtonQuestionPage";

export default function GenderScreen() {
  return (
    <ButtonQuestionPage
      title="What best describes you?"
      options={["Male", "Female", "Non-binary", "Prefer not to say"]}
      progress={28}
      nextRoute="/pages/onboarding/referral"
    />
  );
}

