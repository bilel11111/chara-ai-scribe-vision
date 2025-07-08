import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Play, BookOpen, Star, Calendar, ExternalLink } from 'lucide-react';

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

interface CharacterResultProps {
  characterData: CharacterData;
  isLoading: boolean;
}

export const CharacterResult = ({ characterData, isLoading }: CharacterResultProps) => {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded-lg w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">{characterData.name}</h2>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{characterData.series}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{characterData.popularity}/10</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">About</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {characterData.description}
        </p>
      </div>

      {/* Character Traits */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Key Traits</h3>
        <div className="flex flex-wrap gap-2">
          {characterData.traits.map((trait, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs"
            >
              {trait}
            </Badge>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>First Appearance: {characterData.firstAppearance}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4">
        {characterData.videoUrl && (
          <Button
            onClick={() => window.open(characterData.videoUrl, '_blank')}
          >
            <Play className="h-4 w-4 mr-2" />
            Watch Clips
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(characterData.name + ' ' + characterData.series)}`, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Learn More
        </Button>
      </div>
    </Card>
  );
};