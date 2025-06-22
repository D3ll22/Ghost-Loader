
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Scissors,
  Play,
  Pause,
  Square,
  Download,
  Upload,
  Settings,
  Monitor,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  FileVideo,
  Image as ImageIcon,
  Music,
  Layers
} from "lucide-react";

const GhostCut = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [queueItems, setQueueItems] = useState(12);
  const [systemStatus, setSystemStatus] = useState("optimal");
  const { toast } = useToast();

  // Simular métricas em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueItems(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleProcess = () => {
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast({
            title: "Processamento Concluído!",
            description: "Seus arquivos foram processados com sucesso.",
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const systemMetrics = [
    { label: "CPU Usage", value: "45%", status: "good", icon: Activity },
    { label: "Memory", value: "2.1GB", status: "good", icon: Monitor },
    { label: "Queue", value: queueItems.toString(), status: queueItems > 20 ? "warning" : "good", icon: Clock },
    { label: "Uptime", value: "99.9%", status: "excellent", icon: CheckCircle },
  ];

  const processingStats = [
    { label: "Files Processed", value: "15,847", change: "+12%", icon: FileVideo },
    { label: "Total Users", value: "2,341", change: "+8%", icon: Users },
    { label: "Success Rate", value: "99.8%", change: "+0.1%", icon: TrendingUp },
    { label: "Avg. Speed", value: "2.3x", change: "+15%", icon: Zap },
  ];

  const recentFiles = [
    { name: "video_final.mp4", size: "245 MB", status: "completed", type: "video" },
    { name: "audio_track.wav", size: "78 MB", status: "processing", type: "audio" },
    { name: "image_batch.zip", size: "156 MB", status: "queued", type: "image" },
    { name: "presentation.pptx", size: "23 MB", status: "completed", type: "document" },
    { name: "logo_variants.ai", size: "89 MB", status: "processing", type: "design" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 ghost-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-xl flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Ghost Cut Pro</h1>
              <p className="text-gray-400">Central de processamento avançado</p>
            </div>
          </div>
          <Badge className="ghost-badge-premium">
            Sistema Operacional • Status: {systemStatus.toUpperCase()}
          </Badge>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="ghost-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`w-5 h-5 ${
                    metric.status === 'excellent' ? 'text-[#00ff88]' :
                    metric.status === 'good' ? 'text-[#00d4ff]' :
                    'text-[#f59e0b]'
                  }`} />
                  <div className={`w-2 h-2 rounded-full ${
                    metric.status === 'excellent' ? 'bg-[#00ff88]' :
                    metric.status === 'good' ? 'bg-[#00d4ff]' :
                    'bg-[#f59e0b]'
                  } animate-pulse`} />
                </div>
                <div className="text-lg font-bold text-white">{metric.value}</div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Processing Control */}
          <div className="lg:col-span-2 space-y-6">
            {/* Control Panel */}
            <Card className="ghost-card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 ghost-gradient-text">
                  <Monitor className="w-6 h-6" />
                  Painel de Controle Avançado
                </CardTitle>
                <CardDescription>
                  Controle total sobre o processamento de mídia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Nome do projeto..."
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="ghost-btn-primary"
                    >
                      {isProcessing ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Processar
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="ghost-btn-outline">
                      <Square className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="ghost-btn-outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {isProcessing && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progresso do Processamento</span>
                      <span className="text-[#8b5cf6] font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="ghost-progress" />
                    <div className="text-sm text-gray-400">
                      Processando com tecnologia Ghost Engine 2.0...
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {processingStats.map((stat, index) => (
                    <div key={index} className="ghost-glass p-3 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className="w-5 h-5 text-[#8b5cf6]" />
                      </div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                      <div className="text-xs text-[#00ff88] font-semibold">{stat.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* File Queue */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Fila de Processamento
                </CardTitle>
                <CardDescription>
                  {queueItems} arquivos na fila • Tempo estimado: 12 min
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 ghost-glass rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          file.type === 'video' ? 'bg-red-500/20 text-red-400' :
                          file.type === 'audio' ? 'bg-green-500/20 text-green-400' :
                          file.type === 'image' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {file.type === 'video' ? <FileVideo className="w-4 h-4" /> :
                           file.type === 'audio' ? <Music className="w-4 h-4" /> :
                           <ImageIcon className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">{file.name}</div>
                          <div className="text-sm text-gray-400">{file.size}</div>
                        </div>
                      </div>
                      <Badge className={
                        file.status === 'completed' ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30' :
                        file.status === 'processing' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30' :
                        'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }>
                        {file.status === 'completed' ? 'Concluído' :
                         file.status === 'processing' ? 'Processando' : 'Na Fila'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                  <Upload className="w-4 h-4 mr-2" />
                  Upload em Lote
                </Button>
                <Button className="w-full ghost-btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Resultados
                </Button>
                <Button variant="outline" className="w-full ghost-btn-outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </CardContent>
            </Card>

            {/* Achievement System */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00ff88]" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#00ff88] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Speed Demon</div>
                    <div className="text-sm text-gray-400">100 arquivos processados</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Power User</div>
                    <div className="text-sm text-gray-400">7 dias consecutivos</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-400">Master Editor</div>
                    <div className="text-sm text-gray-500">500 arquivos - 87% completo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade CTA */}
            <Card className="ghost-card-premium border-gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-ghost-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-bold text-white mb-2">Upgrade para Pro Max</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Desbloquear processamento ilimitado e recursos exclusivos
                </p>
                <Button className="w-full ghost-btn-primary">
                  Upgrade Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GhostCut;
