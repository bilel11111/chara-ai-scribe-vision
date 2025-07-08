import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Film, Tv, Users, Sparkles } from 'lucide-react';
import { Category } from '@/pages/Index';

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories = [
  { id: 'anime' as Category, label: 'Anime', icon: Sparkles, color: 'text-primary' },
  { id: 'series' as Category, label: 'TV Series', icon: Tv, color: 'text-accent' },
  { id: 'movie' as Category, label: 'Movies', icon: Film, color: 'text-secondary' },
  { id: 'real-person' as Category, label: 'Real People', icon: Users, color: 'text-muted-foreground' },
];

export const CategorySelector = ({ selectedCategory, onCategoryChange }: CategorySelectorProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Select Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              className={`h-20 flex-col gap-2 ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className={`h-6 w-6 ${isSelected ? 'text-primary-foreground' : category.color}`} />
              <span className="text-sm">{category.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};