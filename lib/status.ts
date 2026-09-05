export type IntroStatus =
  | "ai_suggested"
  | "matchmaker_review"
  | "matchmaker_approved"
  | "first_member_pending"
  | "second_member_pending"
  | "mutual_interest_confirmed"
  | "profiles_released"
  | "introduction_scheduled"
  | "introduction_completed"
  | "follow_up_pending"
  | "ongoing_connection"
  | "no_mutual_fit"
  | "successful_match"
  | "closed"
  | "expired";

export const memberStatusLabel: Record<IntroStatus, string> = {
  ai_suggested: "Awaiting matchmaker review",
  matchmaker_review: "Awaiting matchmaker review",
  matchmaker_approved: "Interest being confirmed",
  first_member_pending: "Interest being confirmed",
  second_member_pending: "Interest being confirmed",
  mutual_interest_confirmed: "A Moment is waiting",
  profiles_released: "Introduction being arranged",
  introduction_scheduled: "Introduction being arranged",
  introduction_completed: "Follow-up pending",
  follow_up_pending: "Follow-up pending",
  ongoing_connection: "An introduction continues",
  no_mutual_fit: "This introduction will not be moving forward",
  successful_match: "A relationship is underway",
  closed: "This introduction is closed",
  expired: "This introduction will not be moving forward",
};

export function isOpenStatus(status: IntroStatus) {
  return !["no_mutual_fit", "successful_match", "closed", "expired"].includes(status);
}
