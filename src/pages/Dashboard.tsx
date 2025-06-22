
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from "recharts";
import { Activity, Server, Upload, Download, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { apiService, HealthResponse } from "@/services/api";
import { toast } from "sonner";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: healthData, loading: healthLoading, execute: executeHealth } = useApi<HealthResponse>();
  const { data: metricsData, loading: metricsLoading, execute: executeMetrics } = useApi<any>();
  const { data: logsData, loading: logsLoading, execute: executeLogs } = useApi<any[]>();

  // Mock data for charts until API provides real data
  const performanceData = [
    { time: "00:00", cpu: 45, memory: 62, requests: 120 },
    { time: "04:00", cpu: 52, memory: 58, requests: 89 },
    { time: "08:00", cpu: 78, memory: 71, requests: 245 },
    { time: "12:00", cpu: 65, memory: 69, requests: 298 },
    { time: "16:00", cpu: 82, memory: 75, requests: 367 },
    { time: "20:00", cpu: 71, memory: 68, requests: 289 },
  ];

  const usageData = [
    { feature: "Ghost Cut", usage: 456 },
    { feature: "Ghost Up", usage: 298 },
    { feature: "Conversão", usage: 623 },
    { feature: "Analytics", usage: 187 },
  ];

  useEffect(() => {
    loadDashboardData();
  }, [refreshKey]);

  const loadDashboardData = async () => {
    console.log('Loading dashboard data...');
    
    // Load health status
    const healthResponse = await executeHealth(() => apiService.getHealth());
    if (healthResponse.success) {
      console.log('Health data loaded:', healthResponse.data);
    }

    // Load metrics
    const metricsResponse = await executeMetrics(() => apiService.getMetrics());
    if (metricsResponse.success) {
      console.log('Metrics data loaded:', metricsResponse.data);
    }

    // Load logs
    const logsResponse = await executeLogs(() => apiService.getLogs());
    if (logsResponse.success) {
      console.log('Logs data loaded:', logsResponse.data);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    toast.success('Dashboard atualizado!');
  };

  const chartConfig = {
    cpu: { label: "CPU (%)", color: "#00ff88" },
    memory: { label: "Memory (%)", color: "#8b5cf6" },
    requests: { label: "Requests", color: "#00d4ff" },
    usage: { label: "Usage", color: "#00ff88" }
  };

  return (
    <div className="min-h-screen bg-ghost-gradient-dark">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold ghost-gradient-text mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400">
              Monitoramento em tempo real do Ghost Loader Premium
            </p>
          </div>
          <Button onClick={handleRefresh} className="ghost-btn-primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="ghost-glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Status do Sistema</p>
                  <div className="flex items-center gap-2">
                    {healthData?.status === 'healthy' ? (
                      <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`font-semibold ${
                      healthData?.status === 'healthy' ? 'text-[#00ff88]' : 'text-red-400'
                    }`}>
                      {healthLoading ? 'Verificando...' : (healthData?.status || 'Unknown')}
                    </span>
                  </div>
                </div>
                <Server className="w-8 h-8 text-[#00ff88]" />
              </div>
            </CardContent>
          </Card>

          <Card className="ghost-glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Processamentos</p>
                  <p className="text-2xl font-bold text-white">1,234</p>
                </div>
                <Activity className="w-8 h-8 text-[#8b5cf6]" />
              </div>
            </CardContent>
          </Card>

          <Card className="ghost-glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Uploads</p>
                  <p className="text-2xl font-bold text-white">567</p>
                </div>
                <Upload className="w-8 h-8 text-[#00d4ff]" />
              </div>
            </CardContent>
          </Card>

          <Card className="ghost-glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Downloads</p>
                  <p className="text-2xl font-bold text-white">2,891</p>
                </div>
                <Download className="w-8 h-8 text-[#00ff88]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="ghost-glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Performance do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="cpu" stroke="#00ff88" strokeWidth={2} dot={{ fill: "#00ff88" }} />
                  <Line type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="ghost-glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Uso por Feature</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="feature" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="usage" fill="#00ff88" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Logs */}
        <Card className="ghost-glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Logs Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {logsLoading ? (
                <p className="text-gray-400">Carregando logs...</p>
              ) : logsData && logsData.length > 0 ? (
                logsData.slice(0, 10).map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="ghost-badge-premium">
                        {log.level || 'INFO'}
                      </Badge>
                      <span className="text-sm text-gray-300">{log.message || 'Log message'}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {log.timestamp || new Date().toLocaleTimeString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  {/* Mock logs while API is not available */}
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="ghost-badge-premium">INFO</Badge>
                      <span className="text-sm text-gray-300">Sistema iniciado com sucesso</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#00d4ff]/20 text-[#00d4ff]">PROCESS</Badge>
                      <span className="text-sm text-gray-300">Processamento de mídia concluído</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#8b5cf6]/20 text-[#8b5cf6]">UPLOAD</Badge>
                      <span className="text-sm text-gray-300">Novo arquivo enviado</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
