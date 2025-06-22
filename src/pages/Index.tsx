
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Zap,
  Download,
  Upload,
  Users,
  TrendingUp,
  Star,
  Shield,
  Rocket,
  Target,
  Award,
  ChevronRight,
  Play,
  CheckCircle,
  Timer,
  BarChart3
} from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!username.trim()) {
      toast({
        title: "Username obrigatório",
        description: "Digite um username para análise",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);

    // Simular análise progressiva
    const intervals = [20, 45, 70, 85, 100];
    const messages = [
      "Coletando dados do perfil...",
      "Analisando engajamento...",
      "Processando métricas...",
      "Gerando insights...",
      "Análise concluída!"
    ];

    for (let i = 0; i < intervals.length; i++) {
      setTimeout(() => {
        setProgress(intervals[i]);
        toast({
          title: messages[i],
          description: `Progresso: ${intervals[i]}%`,
        });

        if (i === intervals.length - 1) {
          // Dados simulados da análise
          setAnalysisData({
            profile: {
              username,
              followers: Math.floor(Math.random() * 100000) + 10000,
              following: Math.floor(Math.random() * 5000) + 500,
              posts: Math.floor(Math.random() * 1000) + 100,
              engagement: (Math.random() * 10 + 2).toFixed(2),
            },
            insights: {
              score: Math.floor(Math.random() * 30) + 70,
              category: "Premium Influencer",
              potentialReach: Math.floor(Math.random() * 500000) + 100000,
            }
          });
          setIsLoading(false);
        }
      }, (i + 1) * 1000);
    }
  };

  const stats = [
    { icon: Users, label: "Usuários Ativos", value: "50K+", change: "+12%" },
    { icon: Download, label: "Downloads", value: "2M+", change: "+25%" },
    { icon: Upload, label: "Uploads Diários", value: "100K", change: "+18%" },
    { icon: TrendingUp, label: "Taxa de Sucesso", value: "99.8%", change: "+0.2%" },
  ];

  const features = [
    {
      icon: Zap,
      title: "Análise Ultra-Rápida",
      description: "Processamento em tempo real com IA avançada",
      color: "from-[#00ff88] to-[#00d4ff]"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Proteção total dos seus dados e privacidade",
      color: "from-[#8b5cf6] to-[#6366f1]"
    },
    {
      icon: Rocket,
      title: "Performance Premium",
      description: "Velocidade e qualidade incomparáveis",
      color: "from-[#f59e0b] to-[#eab308]"
    },
    {
      icon: Target,
      title: "Precisão Absoluta",
      description: "Resultados exatos com tecnologia de ponta",
      color: "from-[#ef4444] to-[#dc2626]"
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Content Creator",
      avatar: "/placeholder.svg",
      content: "Revolucionou meu workflow! Ghost Loader é simplesmente fantástico.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Digital Marketer",
      avatar: "/placeholder.svg",
      content: "A melhor plataforma que já usei. Resultados incríveis!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Influencer",
      avatar: "/placeholder.svg",
      content: "Interface intuitiva e recursos premium. Recomendo 100%!",
      rating: 5
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 via-transparent to-[#8b5cf6]/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8 ghost-fade-in">
            <Badge className="ghost-badge-premium mb-4">
              🚀 Nova Era do Processamento Digital
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="ghost-gradient-text">Ghost Loader</span>
              <br />
              <span className="text-white ghost-text-glow">Premium Hub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              A plataforma mais avançada de <span className="text-[#00ff88] font-semibold">conversão</span>, 
              <span className="text-[#00d4ff] font-semibold"> processamento</span> e 
              <span className="text-[#8b5cf6] font-semibold"> análise</span> de mídia digital
            </p>

            {/* Analysis Form */}
            <Card className="ghost-card-premium max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="ghost-gradient-text flex items-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  Análise Premium de Perfil
                </CardTitle>
                <CardDescription>
                  Digite um username para análise completa em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Digite o username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button
                    onClick={handleAnalysis}
                    disabled={isLoading}
                    className="ghost-btn-primary whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <Timer className="w-4 h-4 mr-2 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Analisar Agora
                      </>
                    )}
                  </Button>
                </div>

                {isLoading && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progresso da Análise</span>
                      <span className="text-[#00ff88] font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="ghost-progress" />
                  </div>
                )}

                {analysisData && (
                  <div className="space-y-4 animate-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-2 text-[#00ff88]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Análise Concluída!</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="ghost-glass p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-[#00ff88]">
                          {analysisData.profile.followers.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">Seguidores</div>
                      </div>
                      <div className="ghost-glass p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-[#00d4ff]">
                          {analysisData.profile.engagement}%
                        </div>
                        <div className="text-xs text-gray-400">Engajamento</div>
                      </div>
                      <div className="ghost-glass p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-[#8b5cf6]">
                          {analysisData.insights.score}
                        </div>
                        <div className="text-xs text-gray-400">Score</div>
                      </div>
                      <div className="ghost-glass p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-[#f59e0b]">
                          {(analysisData.insights.potentialReach / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-gray-400">Alcance</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="ghost-btn-primary flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Relatório
                      </Button>
                      <Button className="ghost-btn-secondary">
                        Consultoria Premium
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 ghost-glass-strong border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center ghost-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-ghost-gradient rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                <div className="text-xs text-[#00ff88] font-semibold">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="ghost-badge mb-4">Recursos Premium</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Por que escolher o <span className="ghost-gradient-text">Ghost Loader</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tecnologia de ponta combinada com design premium para resultados extraordinários
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="ghost-card group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 ghost-glass">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="ghost-badge mb-4">Depoimentos</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              O que dizem nossos <span className="ghost-gradient-text">usuários</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Mais de 50.000 profissionais confiam no Ghost Loader Premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="ghost-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#00ff88] text-[#00ff88]" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback className="bg-[#00ff88] text-black text-sm font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="ghost-card-premium max-w-4xl mx-auto text-center">
            <CardContent className="p-12">
              <Badge className="ghost-badge-premium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Oferta Limitada
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Pronto para <span className="ghost-gradient-text">revolucionar</span> seu workflow?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que já transformaram seus resultados com o Ghost Loader Premium
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button className="ghost-btn-primary text-lg px-8 py-4">
                  Começar Agora
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" className="ghost-btn-outline text-lg px-8 py-4">
                  Agendar Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                ✅ Sem compromisso • ✅ Suporte 24/7 • ✅ Garantia de 30 dias
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
