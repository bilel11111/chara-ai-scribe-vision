import { useState, useCallback } from 'react';
import { Upload, Image, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
}

export const ImageUpload = ({ onImageUpload, isProcessing }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    onImageUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Card className="relative overflow-hidden border-2 border-dashed border-muted-foreground/25 bg-gradient-to-br from-surface to-surface-elevated p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
      <div
        className={`relative ${dragActive ? 'scale-105' : ''} transition-transform duration-300`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="space-y-4">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border border-primary/20">
              <img
                src={preview}
                alt="Upload preview"
                className="h-64 w-full object-cover"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-primary">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-sm font-medium">Analyzing character...</span>
                  </div>
                </div>
              )}
            </div>
            
            {!isProcessing && (
              <div className="text-center">
                <Button
                  onClick={() => document.getElementById('file-input')?.click()}
                  variant="outline"
                  className="bg-primary/10 border-primary/30 hover:bg-primary/20 transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Different Image
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-glow-pulse" />
              <div className="relative bg-surface-elevated p-6 rounded-full border border-primary/30">
                <Image className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground flex items-center justify-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                AI Character Recognition
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload an image containing a character from series, movies, or anime. Our AI will identify them and provide detailed information.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={() => document.getElementById('file-input')?.click()}
                disabled={isProcessing}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium px-8 py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Choose Image
                  </>
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                or drag and drop an image here
              </p>
            </div>
          </div>
        )}
        
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={isProcessing}
        />
      </div>
      
      {dragActive && (
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm border-2 border-primary rounded-lg flex items-center justify-center">
          <div className="text-primary font-medium">Drop image here</div>
        </div>
      )}
    </Card>
  );
};