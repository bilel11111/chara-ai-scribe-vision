import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Play, BookOpen, Star, Calendar, Users, ExternalLink } from 'lucide-react';

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
      <Card className="p-6 bg-gradient-to-br from-surface to-surface-elevated border-primary/20">
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
    <Card className="overflow-hidden bg-gradient-to-br from-surface to-surface-elevated border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {/* Header with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-50" />
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{characterData.name}</h2>
              <div className="flex items-center space-x-2 text-accent">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">{characterData.series}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{characterData.popularity}/10</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Character Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Character Profile
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {characterData.description}
          </p>
        </div>

        <Separator className="bg-border" />

        {/* Character Traits */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Key Traits</h3>
          <div className="flex flex-wrap gap-2">
            {characterData.traits.map((trait, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors"
              >
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>First Appearance</span>
            </div>
            <p className="text-foreground font-medium">{characterData.firstAppearance}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          {characterData.videoUrl && (
            <Button
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
              onClick={() => window.open(characterData.videoUrl, '_blank')}
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Clips
            </Button>
          )}
          
          <Button
            variant="outline"
            className="border-primary/30 bg-primary/10 hover:bg-primary/20"
            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(characterData.name + ' ' + characterData.series)}`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  );
};