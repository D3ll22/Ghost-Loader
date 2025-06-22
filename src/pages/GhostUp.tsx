import { FileUpload } from '@/components/upload/FileUpload';

const GhostUp = () => {
  return (
    <div className="min-h-screen bg-ghost-gradient-dark">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold ghost-gradient-text mb-4">
            Ghost Up Premium
          </h1>
          <p className="text-gray-400 text-lg">
            Acelere seus uploads com nossa plataforma premium.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <FileUpload />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10">
            <h3 className="font-semibold text-xl text-white mb-2">
              Uploads Ilimitados
            </h3>
            <p className="text-sm text-gray-400">
              Envie quantos arquivos precisar, sem restrições.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10">
            <h3 className="font-semibold text-xl text-white mb-2">
              Velocidade Máxima
            </h3>
            <p className="text-sm text-gray-400">
              Servidores otimizados para uploads ultra-rápidos.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10">
            <h3 className="font-semibold text-xl text-white mb-2">
              Segurança Avançada
            </h3>
            <p className="text-sm text-gray-400">
              Proteção de dados com criptografia de ponta a ponta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GhostUp;
