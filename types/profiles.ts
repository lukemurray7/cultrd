export interface Profile {
  id: string;
  created_at: string;
  onboarding_completed: boolean;
  topic_id: string | null;
  notifications_preference: "unknown" | "enabled" | "skipped";
  referral_shared: boolean;
}

export interface UpdateProfileParams {
  onboarding_completed?: boolean;
  topic_id?: string | null;
  notifications_preference?: "unknown" | "enabled" | "skipped";
  referral_shared?: boolean;
}

