import React, { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingDraft {
  topicIds: string[];
  notificationsPreference: "unknown" | "enabled" | "skipped";
  referralShared: boolean;
}

interface OnboardingContextType {
  draft: OnboardingDraft;
  fromOnboarding: boolean;
  setFromOnboarding: (value: boolean) => void;
  setTopicIds: (ids: string[]) => void;
  setNotificationsPreference: (pref: "unknown" | "enabled" | "skipped") => void;
  setReferralShared: (shared: boolean) => void;
  reset: () => void;
}

const defaultDraft: OnboardingDraft = {
  topicIds: [],
  notificationsPreference: "unknown",
  referralShared: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<OnboardingDraft>(defaultDraft);
  const [fromOnboarding, setFromOnboarding] = useState(false);

  const setTopicIds = (ids: string[]) => {
    setDraft((prev) => ({ ...prev, topicIds: ids }));
  };

  const setNotificationsPreference = (pref: "unknown" | "enabled" | "skipped") => {
    setDraft((prev) => ({ ...prev, notificationsPreference: pref }));
  };

  const setReferralShared = (shared: boolean) => {
    setDraft((prev) => ({ ...prev, referralShared: shared }));
  };

  const reset = () => {
    setDraft(defaultDraft);
    setFromOnboarding(false);
  };

  return (
    <OnboardingContext.Provider
      value={{
        draft,
        fromOnboarding,
        setFromOnboarding,
        setTopicIds,
        setNotificationsPreference,
        setReferralShared,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};

