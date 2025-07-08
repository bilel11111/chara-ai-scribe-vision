import { Category } from '@/pages/Index';

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

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Convert image file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
};

// Parse AI response to extract character information
const parseCharacterResponse = (response: string): CharacterData => {
  try {
    // Try to parse as JSON first
    const parsed = JSON.parse(response);
    return {
      name: parsed.name || 'Unknown Character',
      series: parsed.series || 'Unknown Series',
      description: parsed.description || 'No description available',
      traits: parsed.traits || [],
      firstAppearance: parsed.firstAppearance || 'Unknown',
      popularity: parsed.popularity || 5,
      videoUrl: parsed.videoUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(parsed.name + ' best moments')}`,
    };
  } catch (error) {
    // If JSON parsing fails, try to extract information from plain text
    const lines = response.split('\n');
    const character: CharacterData = {
      name: 'Unknown Character',
      series: 'Unknown Series',
      description: response,
      traits: [],
      firstAppearance: 'Unknown',
      popularity: 5,
      videoUrl: 'https://www.youtube.com/results?search_query=character+moments',
    };

    // Extract name and series from response
    lines.forEach(line => {
      if (line.toLowerCase().includes('name:')) {
        character.name = line.split(':')[1]?.trim() || character.name;
      }
      if (line.toLowerCase().includes('series:') || line.toLowerCase().includes('from:')) {
        character.series = line.split(':')[1]?.trim() || character.series;
      }
    });

    character.videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(character.name + ' best moments')}`;
    return character;
  }
};

export const recognizeCharacter = async (imageFile: File, category: Category): Promise<CharacterData> => {
  // For demo purposes, we'll use a free alternative approach
  // In production, you would use your DeepSeek API key
  
  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
    
    // For now, we'll use a mock response based on category
    const mockResponses = {
      anime: {
        name: "Naruto Uzumaki",
        series: "Naruto",
        description: "Naruto Uzumaki is a shinobi of Konohagakure's Uzumaki clan. He became the jinchūriki of the Nine-Tails on the day of his birth. After joining Team 7, Naruto worked hard to gain the village's acknowledgement while chasing his dream to become Hokage.",
        traits: ["Determined", "Loyal", "Optimistic", "Brave", "Energetic"],
        firstAppearance: "Chapter 1 (1999)",
        popularity: 9,
        videoUrl: "https://www.youtube.com/results?search_query=naruto+best+moments",
      },
      series: {
        name: "Walter White",
        series: "Breaking Bad",
        description: "Walter White is a high school chemistry teacher who turns to manufacturing and selling methamphetamine after being diagnosed with terminal lung cancer. His transformation from a mild-mannered teacher to a ruthless drug kingpin is the central arc of the series.",
        traits: ["Intelligent", "Calculating", "Desperate", "Prideful", "Protective"],
        firstAppearance: "Pilot (2008)",
        popularity: 10,
        videoUrl: "https://www.youtube.com/results?search_query=walter+white+best+moments",
      },
      movie: {
        name: "Tony Stark",
        series: "Iron Man",
        description: "Anthony Edward 'Tony' Stark is a billionaire industrialist and genius inventor who created the Iron Man armor. As Iron Man, he uses his technological expertise and resources to protect the world as a member of the Avengers.",
        traits: ["Genius", "Innovative", "Sarcastic", "Heroic", "Charismatic"],
        firstAppearance: "Iron Man (2008)",
        popularity: 9,
        videoUrl: "https://www.youtube.com/results?search_query=iron+man+best+moments",
      },
      'real-person': {
        name: "Albert Einstein",
        series: "Real Life",
        description: "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. He is best known for his mass–energy equivalence formula E = mc².",
        traits: ["Brilliant", "Curious", "Innovative", "Thoughtful", "Revolutionary"],
        firstAppearance: "Born March 14, 1879",
        popularity: 10,
        videoUrl: "https://www.youtube.com/results?search_query=albert+einstein+documentary",
      }
    };
    
    return mockResponses[category];
    
    // TODO: Implement real DeepSeek API integration
    // Uncomment this section when you have an API key
    /*
    const base64Image = await fileToBase64(imageFile);
    
    const systemPrompt = `You are an expert at identifying characters from ${category}. 
    Analyze the image and identify any characters present. 
    Return your response as JSON with the following structure:
    {
      "name": "Character Name",
      "series": "Series/Movie/Show Name",
      "description": "Detailed description of the character",
      "traits": ["trait1", "trait2", "trait3"],
      "firstAppearance": "First appearance info",
      "popularity": 1-10
    }`;
    
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer YOUR_API_KEY_HERE`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-v3-base:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Identify the character in this image. Category: ${category}`
              },
              {
                type: 'image_url',
                image_url: { url: `data:image/jpeg;base64,${base64Image}` }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return parseCharacterResponse(data.choices[0].message.content);
    */
  } catch (error) {
    console.error('Character recognition error:', error);
    throw new Error('Failed to recognize character. Please try again.');
  }
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