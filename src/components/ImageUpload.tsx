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
    <Card className="relative overflow-hidden border-2 border-dashed border-muted-foreground/25 p-8 transition-all duration-300 hover:border-primary/50">
      <div
        className={`relative ${dragActive ? 'scale-105' : ''} transition-transform duration-300`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="space-y-4">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border">
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
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Different Image
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-6 bg-primary/10 rounded-full">
              <Image className="h-12 w-12 text-primary" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">
                Upload Character Image
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Drag and drop an image here or click to select one
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={() => document.getElementById('file-input')?.click()}
                disabled={isProcessing}
                className="px-8 py-3 h-auto"
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