import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { CharacterResult } from '@/components/CharacterResult';
import { CategorySelector } from '@/components/CategorySelector';
import { recognizeCharacter } from '@/services/characterRecognition';
import { Sparkles, Brain } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

export type Category = 'anime' | 'series' | 'movie' | 'real-person';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('anime');

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    setCharacterData(null);
    
    try {
      toast({
        title: "Processing image...",
        description: "AI is analyzing the character in your image",
      });
      
      const result = await recognizeCharacter(file, selectedCategory);
      setCharacterData(result);
      
      toast({
        title: "Character recognized!",
        description: `Found ${result.name} from ${result.series}`,
      });
    } catch (error) {
      toast({
        title: "Recognition failed",
        description: "Unable to identify the character. Please try another image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Character Recognition
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload any image and let our AI identify characters from anime, series, movies, or real people
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Category Selection */}
          <CategorySelector 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Upload Section */}
          <ImageUpload
            onImageUpload={handleImageUpload}
            isProcessing={isProcessing}
          />
          
          {/* Results Section */}
          {(characterData || isProcessing) && (
            <CharacterResult 
              characterData={characterData!}
              isLoading={isProcessing}
            />
          )}
          
          {/* Features Section */}
          {!characterData && !isProcessing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Advanced AI Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by DeepSeek AI for accurate character identification
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Detailed Information</h3>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive details and related video content
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
