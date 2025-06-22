
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Activity,
  TrendingUp,
  Users,
  Download,
  Upload,
  Server,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  Award,
  BarChart3,
  Calendar,
  FileText,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const [systemHealth, setSystemHealth] = useState(98.7);
  const [realtimeData, setRealtimeData] = useState({
    activeUsers: 1247,
    processingQueue: 23,
    uploadSpeed: 156,
    cpuUsage: 45
  });

  // Simular dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        processingQueue: Math.max(0, prev.processingQueue + Math.floor(Math.random() * 6) - 3),
        uploadSpeed: prev.uploadSpeed + Math.floor(Math.random() * 20) - 10,
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + Math.floor(Math.random() * 10) - 5))
      }));
      setSystemHealth(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const overviewStats = [
    {
      title: "Usuários Ativos",
      value: realtimeData.activeUsers.toLocaleString(),
      change: "+12%",
      icon: Users,
      color: "text-[#00ff88]",
      bg: "bg-[#00ff88]/20"
    },
    {
      title: "Total Processado",
      value: "2.4M",
      change: "+23%",
      icon: Activity,
      color: "text-[#00d4ff]",
      bg: "bg-[#00d4ff]/20"
    },
    {
      title: "Taxa de Sucesso",
      value: "99.8%",
      change: "+0.2%",
      icon: CheckCircle,
      color: "text-[#8b5cf6]",
      bg: "bg-[#8b5cf6]/20"
    },
    {
      title: "Uptime",
      value: "99.99%",
      change: "Estável",
      icon: Server,
      color: "text-[#f59e0b]",
      bg: "bg-[#f59e0b]/20"
    },
  ];

  const performanceData = [
    { name: 'Jan', uploads: 4000, downloads: 2400, processing: 2400 },
    { name: 'Fev', uploads: 3000, downloads: 1398, processing: 2210 },
    { name: 'Mar', uploads: 2000, downloads: 9800, processing: 2290 },
    { name: 'Abr', uploads: 2780, downloads: 3908, processing: 2000 },
    { name: 'Mai', uploads: 1890, downloads: 4800, processing: 2181 },
    { name: 'Jun', uploads: 2390, downloads: 3800, processing: 2500 },
    { name: 'Jul', uploads: 3490, downloads: 4300, processing: 2100 },
  ];

  const usageData = [
    { name: 'Ghost Cut', value: 45, color: '#8b5cf6' },
    { name: 'Ghost Up', value: 35, color: '#00d4ff' },
    { name: 'Análise', value: 20, color: '#00ff88' },
  ];

  const recentActivities = [
    { 
      type: 'upload',
      message: 'Novo lote de arquivos processado',
      time: '2 min atrás',
      status: 'success'
    },
    {
      type: 'processing',
      message: 'Sistema de backup executado',
      time: '5 min atrás',
      status: 'success'
    },
    {
      type: 'alert',
      message: 'Alto tráfego detectado',
      time: '12 min atrás',
      status: 'warning'
    },
    {
      type: 'user',
      message: '50 novos usuários registrados',
      time: '1 hora atrás',
      status: 'info'
    },
  ];

  const systemMetrics = [
    { label: 'CPU Usage', value: realtimeData.cpuUsage, max: 100, unit: '%', status: 'good' },
    { label: 'Memory', value: 68, max: 100, unit: '%', status: 'good' },
    { label: 'Storage', value: 34, max: 100, unit: '%', status: 'excellent' },
    { label: 'Network', value: 89, max: 100, unit: 'Mbps', status: 'good' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 ghost-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-black" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Dashboard Analytics</h1>
              </div>
              <p className="text-gray-400">Métricas em tempo real e insights do sistema</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${systemHealth >= 98 ? 'ghost-badge' : 'bg-yellow-500/20 text-yellow-400'}`}>
                System Health: {systemHealth.toFixed(1)}%
              </Badge>
              <Button className="ghost-btn-primary">
                <FileText className="w-4 h-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="ghost-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge className={`text-xs ${stat.change.startsWith('+') ? 'text-[#00ff88]' : 'text-gray-400'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Performance Chart */}
            <Card className="ghost-card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00ff88]" />
                  Performance Overview
                </CardTitle>
                <CardDescription>
                  Métricas de performance nos últimos 7 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00ff88" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="uploads"
                      stroke="#00ff88"
                      fillOpacity={1}
                      fill="url(#colorUploads)"
                    />
                    <Area
                      type="monotone"
                      dataKey="downloads"
                      stroke="#00d4ff"
                      fillOpacity={1}
                      fill="url(#colorDownloads)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Usage Distribution */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#8b5cf6]" />
                  Distribuição de Uso
                </CardTitle>
                <CardDescription>
                  Como os usuários utilizam a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {usageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1a1a1a', 
                            border: '1px solid #333',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-4">
                    {usageData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-white font-medium">{item.name}</span>
                        </div>
                        <div className="text-gray-400">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Metrics */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Métricas do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{metric.label}</span>
                      <span className="text-white font-medium">
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                    <Progress 
                      value={(metric.value / metric.max) * 100} 
                      className="ghost-progress h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Real-time Data */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#00ff88]" />
                  Dados em Tempo Real
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Fila de Processamento</span>
                  <Badge className="ghost-badge">
                    {realtimeData.processingQueue}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Velocidade Upload</span>
                  <span className="text-[#00d4ff] font-medium">
                    {realtimeData.uploadSpeed} MB/s
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">CPU Load</span>
                  <span className={`font-medium ${
                    realtimeData.cpuUsage > 80 ? 'text-red-400' :
                    realtimeData.cpuUsage > 60 ? 'text-yellow-400' : 'text-[#00ff88]'
                  }`}>
                    {realtimeData.cpuUsage}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="ghost-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-[#00ff88]' :
                      activity.status === 'warning' ? 'bg-[#f59e0b]' :
                      activity.status === 'error' ? 'bg-red-400' : 'bg-[#00d4ff]'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm text-white">{activity.message}</div>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="ghost-card-premium">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full ghost-btn-primary">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
                <Button className="w-full ghost-btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Backup Sistema
                </Button>
                <Button variant="outline" className="w-full ghost-btn-outline">
                  <Award className="w-4 h-4 mr-2" />
                  Ver Relatórios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
