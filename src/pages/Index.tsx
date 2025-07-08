import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { CharacterResult } from '@/components/CharacterResult';
import { recognizeCharacter } from '@/services/characterRecognition';
import { Sparkles, Zap, Brain, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import heroBg from '@/assets/hero-bg.jpg';

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

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    setCharacterData(null);
    
    try {
      toast({
        title: "Processing image...",
        description: "AI is analyzing the character in your image",
      });
      
      const result = await recognizeCharacter(file);
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
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[60vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        <div className="relative container mx-auto px-4 py-16 text-center flex items-center justify-center min-h-[60vh]">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-6">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Character Recognition
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload any image containing characters from series, movies, or anime. Our advanced AI will identify them and provide detailed information instantly.
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4 text-primary" />
                <span>Image Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-accent" />
                <span>AI Recognition</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Detailed Info</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <ImageUpload
            onImageUpload={handleImageUpload}
            isProcessing={isProcessing}
          />
          
          {/* Results Section */}
          {(characterData || isProcessing) && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {isProcessing ? 'Analyzing Character...' : 'Character Identified'}
                </h2>
                <p className="text-muted-foreground">
                  {isProcessing 
                    ? 'AI is processing your image to identify the character'
                    : 'Here\'s what we found about this character'
                  }
                </p>
              </div>
              
              <CharacterResult 
                characterData={characterData!}
                isLoading={isProcessing}
              />
            </div>
          )}
          
          {/* Features Section */}
          {!characterData && !isProcessing && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="text-center p-6 bg-gradient-to-br from-surface to-surface-elevated rounded-lg border border-primary/20">
                <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Advanced Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI can identify characters from thousands of series, movies, and anime
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-surface to-surface-elevated rounded-lg border border-accent/20">
                <div className="inline-flex items-center justify-center p-3 bg-accent/20 rounded-full mb-4">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Detailed Information</h3>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive details about characters including traits and background
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-surface to-surface-elevated rounded-lg border border-primary/20">
                <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Video Clips</h3>
                <p className="text-sm text-muted-foreground">
                  Find related video clips and scenes featuring the identified character
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
