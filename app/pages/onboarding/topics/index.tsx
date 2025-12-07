import { CheckboxQuestionPage } from "../../../components/pages/CheckboxQuestionPage";

export default function TopicsScreen() {
  return (
    <CheckboxQuestionPage
      title="Which of these topics interest you?"
      subtitle="(Select up to 5 to start. You can always explore more later.)"
      options={[
        "History",
        "Science & Technology",
        "Economics",
        "Politics",
        "Philosophy",
        "Culture",
      ]}
      progress={42}
      nextRoute="/pages/onboarding/set-goal"
      maxSelections={5}
    />
  );
}

