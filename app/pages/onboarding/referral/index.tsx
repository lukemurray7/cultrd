import { ButtonQuestionPage } from "../../../components/pages/ButtonQuestionPage";

export default function ReferralScreen() {
  return (
    <ButtonQuestionPage
      title="Where did you hear about Epistoria?"
      options={[
        "Another App",
        "Instagram",
        "Google Search",
        "Podcast",
        "X (formerly Twitter)",
        "Facebook",
      ]}
      progress={35}
      nextRoute="/pages/onboarding/topics"
    />
  );
}

