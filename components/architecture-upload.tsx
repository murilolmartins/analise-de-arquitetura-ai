'use client'

import { useCallback, useState } from 'react'
import { Upload, FileImage, X, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ArchitectureUploadProps {
  onAnalyze: (imageData: string, imageType: string) => void
  isAnalyzing: boolean
}

export function ArchitectureUpload({ onAnalyze, isAnalyzing }: ArchitectureUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [imageType, setImageType] = useState<string>('image/png')

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      return
    }

    setImageType(file.type)
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const clearPreview = useCallback(() => {
    setPreview(null)
  }, [])

  const handleAnalyze = useCallback(() => {
    if (preview) {
      // Remove the data URL prefix to get just the base64 data
      const base64Data = preview.split(',')[1]
      onAnalyze(base64Data, imageType)
    }
  }, [preview, imageType, onAnalyze])

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!preview ? (
        <Card
          className={cn(
            'border-2 border-dashed transition-all duration-200 cursor-pointer',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="flex flex-col items-center justify-center py-16 px-8">
            <label className="flex flex-col items-center cursor-pointer w-full">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Carregar Diagrama de Arquitetura
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Arraste e solte seu diagrama aqui ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">
                Suporta PNG, JPG, WEBP (máx. 10MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
                onClick={clearPreview}
                disabled={isAnalyzing}
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="rounded-lg overflow-hidden bg-muted/50 mb-4">
                <img
                  src={preview}
                  alt="Diagrama de arquitetura"
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileImage className="w-4 h-4" />
                  <span>Diagrama pronto para análise</span>
                </div>
                <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    'Iniciar Análise'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
