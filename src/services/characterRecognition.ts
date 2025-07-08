// This is a mock service for AI character recognition
// In production, you would integrate with actual AI services like DeepSeek, BlackBox AI, etc.

interface CharacterData {
  name: string;
  series: string;
  description: string;
  traits: string[];
  firstAppearance: string;
  popularity: number;
  videoUrl?: string;
  imageUrl?: string;
}

// Mock data for demonstration
const mockCharacters: CharacterData[] = [
  {
    name: "Naruto Uzumaki",
    series: "Naruto",
    description: "Naruto Uzumaki is a shinobi of Konohagakure's Uzumaki clan. He became the jinchūriki of the Nine-Tails on the day of his birth — a fate that caused him to be shunned by most of Konoha throughout his childhood. After joining Team 7, Naruto worked hard to gain the village's acknowledgement all the while chasing his dream to become Hokage.",
    traits: ["Determined", "Loyal", "Optimistic", "Brave", "Energetic"],
    firstAppearance: "Chapter 1 (1999)",
    popularity: 9,
    videoUrl: "https://www.youtube.com/results?search_query=naruto+best+moments",
  },
  {
    name: "Goku",
    series: "Dragon Ball",
    description: "Son Goku is a Saiyan warrior who was sent to Earth as a baby and raised by Grandpa Gohan. Known for his incredible strength, pure heart, and love for fighting strong opponents. He has saved the Earth and universe multiple times through his battles against powerful enemies.",
    traits: ["Pure-hearted", "Strong", "Protective", "Innocent", "Battle-loving"],
    firstAppearance: "Dragon Ball Chapter 1 (1984)",
    popularity: 10,
    videoUrl: "https://www.youtube.com/results?search_query=goku+transformations",
  },
  {
    name: "Luffy",
    series: "One Piece",
    description: "Monkey D. Luffy is the founder and captain of the increasingly infamous and powerful Straw Hat Pirates. His dream is to find the legendary treasure One Piece and become the Pirate King. He has the power of the Gum-Gum Fruit, making his body like rubber.",
    traits: ["Adventurous", "Carefree", "Determined", "Loyal", "Gluttonous"],
    firstAppearance: "One Piece Chapter 1 (1997)",
    popularity: 9,
    videoUrl: "https://www.youtube.com/results?search_query=luffy+gear+transformations",
  }
];

export const recognizeCharacter = async (imageFile: File): Promise<CharacterData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  // In production, you would:
  // 1. Convert image to base64 or upload to cloud storage
  // 2. Send to AI service (DeepSeek, BlackBox AI, etc.)
  // 3. Process the response and extract character information
  
  // For now, return a random mock character
  const randomIndex = Math.floor(Math.random() * mockCharacters.length);
  const character = mockCharacters[randomIndex];
  
  // Add some randomness to make it feel more dynamic
  const variations = [
    { ...character, popularity: Math.floor(Math.random() * 3) + 8 },
    { ...character, traits: [...character.traits, "Heroic", "Charismatic"] },
  ];
  
  return variations[Math.floor(Math.random() * variations.length)];
};

export const generateCharacterInfo = async (characterName: string, series: string): Promise<string> => {
  // Mock AI text generation
  // In production, integrate with your preferred AI service
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `Generated additional information about ${characterName} from ${series}. This character has appeared in multiple episodes and has been a fan favorite due to their unique personality and compelling story arc.`;
};

export const searchCharacterVideos = async (characterName: string, series: string): Promise<string[]> => {
  // Mock video search
  // In production, integrate with video APIs or scraping services
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    `https://www.youtube.com/results?search_query=${encodeURIComponent(characterName + ' best moments')}`,
    `https://www.youtube.com/results?search_query=${encodeURIComponent(characterName + ' ' + series + ' clips')}`,
    `https://www.youtube.com/results?search_query=${encodeURIComponent(characterName + ' fights')}`,
  ];
};