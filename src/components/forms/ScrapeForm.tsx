
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, CheckCircle, XCircle } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { apiService, ScrapeResponse } from '@/services/api';
import { toast } from 'sonner';

export const ScrapeForm = () => {
  const [username, setUsername] = useState('');
  const { data, loading, error, execute } = useApi<ScrapeResponse>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error('Por favor, insira um nome de usuário');
      return;
    }

    console.log('Iniciando scraping para:', username);
    
    const response = await execute(() => apiService.scrape(username.trim()));
    
    if (response.success) {
      toast.success('Análise iniciada com sucesso!');
    } else {
      toast.error(response.message || 'Erro ao iniciar análise');
    }
  };

  return (
    <Card className="ghost-glass border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Search className="w-5 h-5 text-[#00ff88]" />
          Análise de Perfil Premium
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-300">
              Nome de Usuário
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Digite o username para análise..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ghost-input"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full ghost-btn-primary"
            disabled={loading || !username.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Iniciar Análise Premium
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">{error}</span>
          </div>
        )}

        {data && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-[#00ff88]" />
              <span className="text-sm text-[#00ff88]">Análise iniciada!</span>
            </div>
            
            <div className="space-y-2">
              <Badge className="ghost-badge-premium">
                Status: {data.status}
              </Badge>
              
              {data.task_id && (
                <Badge variant="outline" className="text-gray-300 border-gray-600">
                  Task ID: {data.task_id}
                </Badge>
              )}
              
              {data.progress !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Progresso</span>
                    <span>{data.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#00ff88] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${data.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
