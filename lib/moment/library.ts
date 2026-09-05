import type { MomentChoice, MomentScript } from "@/lib/moment/types";

const lisbon: MomentScript = {
  id: "lisbon-evening",
  title: "A free evening in Lisbon",
  setting: "Lisbon",
  inviteImage: "/images/moments/night.jpg",
  postcardImage: "/images/moments/postcard.jpg",
  matchmakerNote:
    "Clara — I chose Lisbon because neither of you performs well under a reservation. See what you do with a free evening.",
  sparkPrompt: "You arrive in Lisbon with one completely free evening. Where do you begin?",
  spark: [
    {
      id: "wine",
      title: "A hidden wine bar",
      line: "Somewhere with no sign outside",
      image: "/images/moments/wine.jpg",
      icon: "wine",
    },
    {
      id: "tram",
      title: "A vintage tram at sunset",
      line: "Follow the city without a plan",
      image: "/images/moments/night.jpg",
      icon: "tram",
    },
    {
      id: "music",
      title: "A small street performance",
      line: "Follow the music",
      image: "/images/moments/music.jpg",
      icon: "music",
    },
    {
      id: "pastry",
      title: "A beautiful pastry shop",
      line: "Dessert first — obviously",
      image: "/images/moments/dessert.jpg",
      icon: "croissant",
    },
  ],
  readPrompt: "has an unexpected free Sunday. What do you think they choose?",
  read: [
    {
      id: "breakfast",
      title: "Breakfast that becomes lunch",
      line: "No one looks at the time",
      image: "/images/moments/breakfast.jpg",
      icon: "plate",
    },
    {
      id: "road",
      title: "A spontaneous road trip",
      line: "Maps are a suggestion",
      image: "/images/moments/road.jpg",
      icon: "compass",
    },
    {
      id: "books",
      title: "Bookshop, coffee, disappear",
      line: "Hours, not errands",
      image: "/images/moments/books.jpg",
      icon: "book",
    },
    {
      id: "kitchen",
      title: "Invite friends and cook far too much",
      line: "The kitchen becomes the evening",
      image: "/images/moments/kitchen.jpg",
      icon: "plate",
    },
  ],
  settingPrompt: "Complete your ideal evening together. Choose the setting.",
  settings: [
    { id: "rooftop", title: "A rooftop", line: "The city at a polite distance", image: "/images/moments/rooftop.png", icon: "moon" },
    { id: "restaurant", title: "A small restaurant", line: "One table, no spectacle", image: "/images/moments/table.jpg", icon: "plate" },
    { id: "river", title: "A walk beside the water", line: "Conversation at walking pace", image: "/images/moments/water.jpg", icon: "compass" },
    { id: "live", title: "Live music", line: "No obligation to dance well", image: "/images/moments/bar.jpg", icon: "music" },
  ],
  finishPrompt: "Now the finishing detail. The evening is almost made.",
  finishes: [
    { id: "dessert", title: "One shared dessert", line: "Two spoons. No debate.", image: "/images/moments/dessert.jpg", icon: "croissant" },
    { id: "photo", title: "A ridiculous photograph", line: "Evidence that you were there", image: "/images/moments/night.jpg", icon: "camera" },
    { id: "song", title: "A song for the journey home", line: "The last decision of the night", image: "/images/moments/music.jpg", icon: "music" },
    { id: "new", title: "Somewhere neither has been", line: "A small, shared first", image: "/images/moments/street.jpg", icon: "pin" },
  ],
  partner: { spark: "pastry", sunday: "books", setting: "live" },
};

const sunday: MomentScript = {
  id: "sunday-table",
  title: "An unhurried Sunday",
  setting: "the city",
  inviteImage: "/images/moments/breakfast.jpg",
  postcardImage: "/images/moments/water.jpg",
  matchmakerNote:
    "Clara — The first evening told me enough. This one is slower. I want to see how you share a morning.",
  sparkPrompt: "Sunday has no appointments. What happens first?",
  spark: [
    {
      id: "breakfast",
      title: "Coffee and the papers",
      line: "The city can wait",
      image: "/images/moments/breakfast.jpg",
      icon: "plate",
    },
    {
      id: "market",
      title: "The market, then improvisation",
      line: "Dinner begins at noon",
      image: "/images/moments/kitchen.jpg",
      icon: "plate",
    },
    {
      id: "water",
      title: "A long walk by the water",
      line: "Phones stay in pockets",
      image: "/images/moments/water.jpg",
      icon: "compass",
    },
    {
      id: "books",
      title: "A bookshop with a hidden café",
      line: "Lost on purpose",
      image: "/images/moments/books.jpg",
      icon: "book",
    },
  ],
  readPrompt: "is left alone with a kitchen and two hours. What happens?",
  read: [
    { id: "feast", title: "Cook something ambitious", line: "And refuse to be sorry", image: "/images/moments/kitchen.jpg", icon: "plate" },
    { id: "toast", title: "Excellent toast. Nothing else.", line: "Restraint can be glamorous", image: "/images/moments/breakfast.jpg", icon: "croissant" },
    { id: "invite", title: "Call someone and make too much", line: "The table expands", image: "/images/moments/table.jpg", icon: "circles" },
    { id: "leave", title: "Abandon the kitchen entirely", line: "There is a restaurant for this", image: "/images/moments/table.jpg", icon: "pin" },
  ],
  settingPrompt: "Design the rest of the day together. Where do you go?",
  settings: [
    { id: "gallery", title: "A quiet gallery", line: "Talk only after the third room", image: "/images/moments/books.jpg", icon: "book" },
    { id: "drive", title: "A coastal drive", line: "Windows down, opinions welcome", image: "/images/moments/road.jpg", icon: "compass" },
    { id: "kitchen", title: "Stay in and cook", line: "The evening never needs a reservation", image: "/images/moments/kitchen.jpg", icon: "plate" },
    { id: "bar", title: "A late, low-lit bar", line: "One drink that becomes two stories", image: "/images/moments/wine.jpg", icon: "wine" },
  ],
  finishPrompt: "Add the last mark on the day.",
  finishes: [
    { id: "dessert", title: "Something sweet, slightly late", line: "Responsibility can resume Monday", image: "/images/moments/dessert.jpg", icon: "croissant" },
    { id: "record", title: "A record neither expected", line: "The room changes key", image: "/images/moments/bar.jpg", icon: "music" },
    { id: "walk", title: "One more loop around the block", line: "Neither of you suggests going in", image: "/images/moments/night.jpg", icon: "moon" },
    { id: "note", title: "A note left on the table", line: "Short. Specific. Not a performance.", image: "/images/moments/table.jpg", icon: "envelope" },
  ],
  partner: { spark: "books", sunday: "feast", setting: "kitchen" },
};

export const momentScripts: MomentScript[] = [lisbon, sunday];

export function scriptById(id: string) {
  return momentScripts.find((item) => item.id === id) ?? lisbon;
}

export function nextScript(id: string) {
  return id === lisbon.id ? sunday : lisbon;
}

export function choiceById(choices: MomentChoice[], id?: string) {
  return choices.find((item) => item.id === id);
}

export function sparkReveal(self: string, partner: string, partnerName: string) {
  if (self === partner) {
    const lines: Record<string, string> = {
      wine: `You both chose the bar with no sign. ${partnerName} has already decided the first bottle is not a discussion.`,
      tram: "You both chose to follow the city without a plan. Excellent. Responsibility can begin tomorrow.",
      music: `You both followed the music. ${partnerName} pretends this was strategy. It was not.`,
      pastry: "You both chose dessert first. We respect the confidence.",
      breakfast: "You both began with coffee and no clock. A promising disorder.",
      market: "You both went to the market as if dinner were a sport. It is.",
      water: "You both walked to the water. Phones, for once, lost the argument.",
      books: "You both disappeared into a bookshop. Nobody is coming to find you.",
    };
    return lines[self] ?? "You chose the same beginning. Something aligned here.";
  }

  const pairs: Record<string, string> = {
    "pastry|wine": `${partnerName} went looking for a bar with no sign. You went looking for pastry. This is not a conflict. This is a sequence.`,
    "wine|pastry": `You found the hidden bar. ${partnerName} found dessert first. The evening can survive this. It may improve.`,
    "tram|pastry": `You wandered. ${partnerName} ordered cake. Same city. Completely different ideas about directions.`,
    "pastry|tram": `You chose pastry. ${partnerName} chose the tram with no destination. Same appetite for not being useful.`,
    "music|tram": `You followed the music. ${partnerName} followed the tram. Lisbon is doing most of the work.`,
    "wine|music": `You sat down. ${partnerName} followed a guitar around a corner. Someone will have to fetch the other.`,
    "breakfast|books": `You stayed with the coffee. ${partnerName} vanished into the stacks. This can be the same morning if you are patient.`,
    "books|breakfast": `You disappeared into a bookshop. ${partnerName} was still pouring coffee. Neither of you is late.`,
  };

  return (
    pairs[`${self}|${partner}`] ??
    `A small surprise. You began differently. ${partnerName} is not your opposite — only your other route through the same evening.`
  );
}

export function readReveal(guess: string, actual: string, partnerName: string) {
  if (guess === actual) {
    const lines: Record<string, string> = {
      breakfast: `You read them correctly. ${partnerName} would let breakfast become lunch and refuse to apologise.`,
      road: `You read them correctly. ${partnerName} chose the road trip — and admitted there would be no reliable navigation.`,
      books: `You read them correctly. ${partnerName} chose the bookshop, and the coffee, and the disappearing.`,
      kitchen: `You read them correctly. ${partnerName} would cook far too much and call it hospitality.`,
      feast: `You read them correctly. ${partnerName} would attempt something ambitious. The smoke alarm has not commented.`,
      toast: `You read them correctly. ${partnerName} believes excellent toast is a personality.`,
      invite: `You read them correctly. ${partnerName} expands the table first and finds the recipe later.`,
      leave: `You read them correctly. ${partnerName} would close the kitchen and go where someone else is already cooking.`,
    };
    return lines[actual] ?? `You read them correctly. ${partnerName} is slightly more themselves than expected.`;
  }

  return `A small surprise. You expected one version of ${partnerName}. They chose another. There may be more calm — or more mischief — beneath the surface.`;
}

export function eveningLine(settingId: string, finishId: string, partnerName: string) {
  const setting: Record<string, string> = {
    rooftop: "a rooftop",
    restaurant: "a small restaurant",
    river: "a walk beside the water",
    live: "live music",
    gallery: "a quiet gallery",
    drive: "a coastal drive",
    kitchen: "the kitchen, claimed for the evening",
    bar: "a late, low-lit bar",
  };
  const finish: Record<string, string> = {
    dessert: "one shared dessert",
    photo: "a ridiculous photograph",
    song: "a song for the journey home",
    new: "somewhere neither of you has been",
    record: "a record neither expected",
    walk: "one more loop around the block",
    note: "a note left on the table",
  };

  const extra: Record<string, string> = {
    "live|dessert": "Absolutely no pressure to dance well.",
    "river|song": `${partnerName} will pretend not to have a favourite already.`,
    "rooftop|photo": "The city will look expensive. You will look slightly windswept.",
    "restaurant|dessert": "Two spoons. A short argument about who had more. Then peace.",
    "kitchen|dessert": `${partnerName} selected cooking together. The smoke alarm has not commented.`,
    "drive|walk": "Same destination. Completely different ideas about when to turn back.",
  };

  const close = extra[`${settingId}|${finishId}`] ?? "Leave room for the part you cannot plan.";
  return `Your evening: ${setting[settingId] ?? "somewhere quiet"}, ${finish[finishId] ?? "one last detail"}, and ${close.charAt(0).toLowerCase()}${close.slice(1)}`;
}

export function postcardLine(sparkId: string, settingId: string, finishId: string) {
  const spark: Record<string, string> = {
    wine: "Find the room with no sign.",
    tram: "Follow the city.",
    music: "Follow the music.",
    pastry: "Order dessert first.",
    breakfast: "Begin with coffee.",
    market: "Start at the market.",
    water: "Walk to the water.",
    books: "Get lost in a bookshop.",
  };
  const rest: Record<string, string> = {
    dessert: "Share the last plate.",
    photo: "Take the ridiculous photograph.",
    song: "Save a song for the way home.",
    new: "Leave room for a first.",
    record: "Put a record on.",
    walk: "Take one more turn around the block.",
    note: "Say the specific thing.",
  };
  return `${spark[sparkId] ?? "Begin gently."} ${rest[finishId] ?? "Leave room for surprises."}`.trim();
}
