export type MomentIconName =
  | "wine"
  | "tram"
  | "music"
  | "croissant"
  | "compass"
  | "book"
  | "moon"
  | "key"
  | "pin"
  | "circles"
  | "envelope"
  | "spark"
  | "plate"
  | "camera";

export type MomentDecision = "meet" | "encore" | "decline";

export type MomentProgress = {
  scriptId: string;
  encoreUsed: boolean;
  spark?: string;
  read?: string;
  setting?: string;
  finish?: string;
  decision?: MomentDecision;
  completedAt?: string;
};

export type MomentChoice = {
  id: string;
  title: string;
  line: string;
  image: string;
  icon: MomentIconName;
};

export type MomentScript = {
  id: string;
  title: string;
  setting: string;
  inviteImage: string;
  postcardImage: string;
  matchmakerNote: string;
  sparkPrompt: string;
  spark: MomentChoice[];
  readPrompt: string;
  read: MomentChoice[];
  settingPrompt: string;
  settings: MomentChoice[];
  finishPrompt: string;
  finishes: MomentChoice[];
  partner: {
    spark: string;
    sunday: string;
    setting: string;
  };
};
