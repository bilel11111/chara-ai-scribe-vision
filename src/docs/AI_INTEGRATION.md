# AI Integration Guide

This guide explains how to integrate with actual AI services for character recognition.

## Current Implementation

The current implementation uses mock data for demonstration purposes. To integrate with real AI services, you'll need to modify the `src/services/characterRecognition.ts` file.

## Integration Options

### 1. DeepSeek API Integration

```typescript
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = 'your-api-key-here';

export const recognizeCharacter = async (imageFile: File): Promise<CharacterData> => {
  // Convert image to base64
  const base64Image = await fileToBase64(imageFile);
  
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-v3-base:free',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and identify any anime, movie, or series characters. Return detailed information about the character including name, series, description, traits, and first appearance.'
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

  const data = await response.json();
  return parseCharacterResponse(data.choices[0].message.content);
};
```

### 2. BlackBox AI Integration

```typescript
const BLACKBOX_API_URL = 'https://api.blackbox.ai/v1/analyze';
const BLACKBOX_API_KEY = 'your-blackbox-api-key';

export const recognizeCharacter = async (imageFile: File): Promise<CharacterData> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('task', 'character_recognition');
  formData.append('include_details', 'true');

  const response = await fetch(BLACKBOX_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BLACKBOX_API_KEY}`,
    },
    body: formData,
  });

  const data = await response.json();
  return parseBlackBoxResponse(data);
};
```

### 3. Custom Vision API Integration

```typescript
// Example using Google Cloud Vision API
import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient({
  keyFilename: 'path/to/service-account-key.json',
});

export const recognizeCharacter = async (imageFile: File): Promise<CharacterData> => {
  const [result] = await client.objectLocalization({
    image: { content: await fileToBuffer(imageFile) },
  });

  // Process the results and match with character database
  const objects = result.localizedObjectAnnotations;
  const characterInfo = await matchWithCharacterDatabase(objects);
  
  return characterInfo;
};
```

## Helper Functions

```typescript
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

const fileToBuffer = (file: File): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(Buffer.from(reader.result as ArrayBuffer));
    };
    reader.onerror = error => reject(error);
  });
};

const parseCharacterResponse = (response: string): CharacterData => {
  // Parse the AI response and extract character information
  // This depends on the specific format returned by your AI service
  try {
    const parsed = JSON.parse(response);
    return {
      name: parsed.name || 'Unknown Character',
      series: parsed.series || 'Unknown Series',
      description: parsed.description || 'No description available',
      traits: parsed.traits || [],
      firstAppearance: parsed.firstAppearance || 'Unknown',
      popularity: parsed.popularity || 5,
      videoUrl: parsed.videoUrl,
    };
  } catch (error) {
    throw new Error('Failed to parse character data');
  }
};
```

## Video Clip Integration

### YouTube Data API

```typescript
const YOUTUBE_API_KEY = 'your-youtube-api-key';
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

export const searchCharacterVideos = async (characterName: string, series: string): Promise<string[]> => {
  const query = `${characterName} ${series} best moments`;
  
  const response = await fetch(
    `${YOUTUBE_SEARCH_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`
  );
  
  const data = await response.json();
  return data.items.map((item: any) => `https://www.youtube.com/watch?v=${item.id.videoId}`);
};
```

## Environment Variables

Create a `.env` file in your project root:

```env
DEEPSEEK_API_KEY=your-deepseek-api-key
BLACKBOX_API_KEY=your-blackbox-api-key
YOUTUBE_API_KEY=your-youtube-api-key
GOOGLE_CLOUD_PROJECT_ID=your-project-id
```

## Security Considerations

1. **API Key Management**: Never expose API keys in client-side code
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Input Validation**: Validate file types and sizes
4. **Error Handling**: Implement proper error handling for failed requests
5. **Caching**: Cache results to reduce API calls

## Testing

```typescript
// Example test for character recognition
import { recognizeCharacter } from './characterRecognition';

describe('Character Recognition', () => {
  it('should identify a character from an image', async () => {
    const mockImage = new File(['mock image data'], 'test.jpg', { type: 'image/jpeg' });
    const result = await recognizeCharacter(mockImage);
    
    expect(result.name).toBeDefined();
    expect(result.series).toBeDefined();
    expect(result.description).toBeDefined();
  });
});
```

## Deployment

For production deployment, consider:

1. **Serverless Functions**: Use Vercel Functions or Netlify Functions for API calls
2. **Edge Computing**: Deploy close to users for faster response times
3. **CDN**: Use a CDN for image optimization and caching
4. **Monitoring**: Implement monitoring and logging for API usage

## Cost Optimization

1. **Image Preprocessing**: Resize images before sending to AI services
2. **Caching**: Cache results to avoid duplicate API calls
3. **Batch Processing**: Process multiple images in batches when possible
4. **Fallback Services**: Use cheaper services as fallbacks

This setup provides a solid foundation for integrating with various AI services while maintaining good performance and security practices.