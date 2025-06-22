
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="ghost-glass border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-ghost-gradient rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl ghost-gradient-text">Ghost Loader</span>
                <span className="text-xs text-gray-400">Premium Hub</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Plataforma premium de conversão, processamento e upload de mídia com tecnologia avançada.
            </p>
            <Badge className="ghost-badge-premium">
              Created by Jonathan Edward
            </Badge>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Produtos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  Hub de Conversão
                </Link>
              </li>
              <li>
                <Link to="/ghost-cut" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  Ghost Cut Pro
                </Link>
              </li>
              <li>
                <Link to="/ghost-up" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  Ghost Up Premium
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  Tutoriais
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                  Suporte Premium
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Conecte-se</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 ghost-glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 ghost-glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 ghost-glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 ghost-glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500">
              Entre em contato para consultoria premium
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 Ghost Loader Premium. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
              Termos
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
