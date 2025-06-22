
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  Cloud,
  FileText,
  Image as ImageIcon,
  FileVideo,
  Music,
  Archive,
  Download,
  Share2,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  X
} from "lucide-react";

const GhostUp = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
  }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      const fileId = Math.random().toString(36).substr(2, 9);
      const newFile = {
        id: fileId,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        progress: 0,
        status: 'uploading' as const
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simular upload
      simulateUpload(fileId);
    });

    toast({
      title: "Upload Iniciado",
      description: `${files.length} arquivo(s) adicionado(s) à fila de upload.`,
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = file.progress + Math.random() * 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...file, progress: 100, status: 'completed' };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv'].includes(ext || '')) return 'video';
    if (['mp3', 'wav', 'flac', 'aac'].includes(ext || '')) return 'audio';
    if (['zip', 'rar', '7z'].includes(ext || '')) return 'archive';
    return 'document';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return FileVideo;
      case 'audio': return Music;
      case 'archive': return Archive;
      default: return FileText;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'image': return 'text-blue-400 bg-blue-500/20';
      case 'video': return 'text-red-400 bg-red-500/20';
      case 'audio': return 'text-green-400 bg-green-500/20';
      case 'archive': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const uploadStats = [
    { label: "Total Uploads", value: "45,632", change: "+18%", icon: Upload },
    { label: "Usuários Ativos", value: "3,241", change: "+12%", icon: Users },
    { label: "Taxa de Sucesso", value: "99.7%", change: "+0.3%", icon: TrendingUp },
    { label: "Velocidade Média", value: "125 MB/s", change: "+8%", icon: Zap },
  ];

  const recentUploads = [
    { name: "presentation_final.pptx", size: "23 MB", status: "completed", time: "2 min atrás" },
    { name: "video_project.mp4", size: "1.2 GB", status: "completed", time: "5 min atrás" },
    { name: "assets_pack.zip", size: "456 MB", status: "completed", time: "12 min atrás" },
    { name: "audio_master.wav", size: "89 MB", status: "completed", time: "18 min atrás" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 ghost-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Ghost Up Premium</h1>
              <p className="text-gray-400">Sistema de upload e distribuição avançado</p>
            </div>
          </div>
          <Badge className="ghost-badge-premium">
            Upload Ilimitado • Velocidade Máxima • Segurança Total
          </Badge>
        </div>

        {/* Upload Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {uploadStats.map((stat, index) => (
            <Card key={index} className="ghost-card">
              <CardContent className="p-4 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#00d4ff]/20 rounded-xl mb-3">
                  <stat.icon className="w-5 h-5 text-[#00d4ff]" />
                </div>
                <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="text-xs text-[#00ff88] font-semibold">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Zone */}
          <div className="lg:col-span-2 space-y-6">
            {/* Drag & Drop Area */}
            <Card className="ghost-card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 ghost-gradient-text">
                  <Upload className="w-6 h-6" />
                  Zona de Upload Premium
                </CardTitle>
                <CardDescription>
                  Arraste e solte seus arquivos ou clique para selecionar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                      : 'border-white/20 hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/5'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 bg-[#00d4ff]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Cloud className="w-8 h-8 text-[#00d4ff]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isDragging ? 'Solte os arquivos aqui' : 'Upload de Arquivos'}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Suporte para todos os formatos • Até 10GB por arquivo • Velocidade máxima
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="ghost-btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Selecionar Arquivos
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload Queue */}
            {uploadedFiles.length > 0 && (
              <Card className="ghost-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Fila de Upload
                    </span>
                    <Badge className="ghost-badge">
                      {uploadedFiles.length} arquivo(s)
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadedFiles.map((file) => {
                    const FileIcon = getFileIcon(file.type);
                    return (
                      <div key={file.id} className="ghost-glass p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileColor(file.type)}`}>
                              <FileIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-medium text-white">{file.name}</div>
                              <div className="text-sm text-gray-400">{file.size}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {file.status === 'completed' && (
                              <CheckCircle className="w-5 h-5 text-[#00ff88]" />
                            )}
                            {file.status === 'error' && (
                              <AlertTriangle className="w-5 h-5 text-red-400" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {file.status === 'uploading' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Uploading...</span>
                              <span className="text-[#00d4ff] font-medium">{Math.round(file.progress)}%</span>
                            </div>
                            <Progress value={file.progress} className="ghost-progress" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full ghost-btn-primary">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar Links
                </Button>
                <Button className="w-full ghost-btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Download em Lote
                </Button>
                <Button variant="outline" className="w-full ghost-btn-outline">
                  <Archive className="w-4 h-4 mr-2" />
                  Criar Arquivo
                </Button>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="text-lg">Uploads Recentes</CardTitle>
                <CardDescription>Seus últimos uploads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentUploads.map((upload, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-white text-sm">{upload.name}</div>
                      <div className="text-xs text-gray-400">{upload.size} • {upload.time}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Storage Info */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-[#00d4ff]" />
                  Armazenamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Usado</span>
                    <span className="text-white font-medium">2.3 GB de 100 GB</span>
                  </div>
                  <Progress value={2.3} className="ghost-progress" />
                </div>
                <div className="text-xs text-gray-400">
                  Plano Premium • Armazenamento Ilimitado Disponível
                </div>
                <Button className="w-full ghost-btn-primary text-sm">
                  Upgrade Storage
                </Button>
              </CardContent>
            </Card>

            {/* Performance Boost */}
            <Card className="ghost-card-premium border-gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-ghost-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-bold text-white mb-2">Boost de Performance</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Velocidade de upload até 10x mais rápida
                </p>
                <Button className="w-full ghost-btn-primary">
                  Ativar Boost
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GhostUp;
