
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileUp, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { apiService, UploadResponse } from '@/services/api';
import { toast } from 'sonner';

export const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url?: string; status: string }>>([]);
  const { loading, execute } = useApi<UploadResponse>();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    for (const file of files) {
      console.log('Uploading file:', file.name);
      
      // Add file to list with pending status
      setUploadedFiles(prev => [...prev, { name: file.name, status: 'uploading' }]);
      
      const response = await execute(() => apiService.upload(file));
      
      // Update file status
      setUploadedFiles(prev => 
        prev.map(f => 
          f.name === file.name 
            ? { 
                ...f, 
                status: response.success ? 'completed' : 'failed',
                url: response.data?.url 
              }
            : f
        )
      );
      
      if (response.success) {
        toast.success(`Arquivo ${file.name} enviado com sucesso!`);
      } else {
        toast.error(`Erro ao enviar ${file.name}: ${response.message}`);
      }
    }
  };

  return (
    <Card className="ghost-glass border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <FileUp className="w-5 h-5 text-[#00ff88]" />
          Upload Premium
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
            ${dragActive 
              ? 'border-[#00ff88] bg-[#00ff88]/10' 
              : 'border-gray-600 hover:border-gray-500'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-[#00ff88]' : 'text-gray-400'}`} />
          <p className="text-lg font-medium text-gray-300 mb-2">
            Arraste arquivos aqui ou clique para selecionar
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Suporte para vídeos, imagens e documentos
          </p>
          
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={loading}
          />
          
          <Button 
            variant="outline" 
            className="ghost-btn-secondary"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              'Selecionar Arquivos'
            )}
          </Button>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Arquivos Enviados:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-300 truncate">{file.name}</span>
                <div className="flex items-center gap-2">
                  {file.status === 'uploading' && (
                    <Loader2 className="w-4 h-4 text-[#00ff88] animate-spin" />
                  )}
                  {file.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                  )}
                  {file.status === 'failed' && (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <Badge 
                    className={
                      file.status === 'completed' ? 'ghost-badge-premium' :
                      file.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }
                  >
                    {file.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
