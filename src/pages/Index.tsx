import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { Sparkles } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { BarChart4 } from "lucide-react";
import { FileVideo2 } from "lucide-react";
import { FileImage } from "lucide-react";
import { FileText } from "lucide-react";
import { ScrapeForm } from '@/components/forms/ScrapeForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-ghost-gradient-dark">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold ghost-gradient-text mb-4">
            Ghost Loader Premium
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            A plataforma definitiva para conversão, processamento e upload de mídia.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="ghost-btn-primary">
              <Rocket className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
            <Button variant="outline" className="ghost-btn-secondary">
              Saiba Mais
            </Button>
          </div>
        </div>

        {/* Main Conversion Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <ScrapeForm />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-ghost-gradient rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-xl text-white">Conversão Avançada</h3>
            </div>
            <p className="text-sm text-gray-400">
              Converta seus arquivos de mídia para diversos formatos com qualidade premium.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-ghost-gradient rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-xl text-white">Segurança Premium</h3>
            </div>
            <p className="text-sm text-gray-400">
              Proteção de dados com criptografia de ponta a ponta e anonimato garantido.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-ghost-gradient rounded-xl flex items-center justify-center">
                <BarChart4 className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-xl text-white">Analytics Integrado</h3>
            </div>
            <p className="text-sm text-gray-400">
              Acompanhe o desempenho de suas conversões e uploads com nosso painel de analytics.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Stat 1 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10">
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-8 h-8 bg-ghost-gradient rounded-lg flex items-center justify-center">
                <FileVideo2 className="w-4 h-4 text-black" />
              </div>
              <h4 className="font-medium text-lg text-white">Vídeos Convertidos</h4>
            </div>
            <p className="text-3xl font-bold text-white">12,345</p>
          </div>

          {/* Stat 2 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10">
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-8 h-8 bg-ghost-gradient rounded-lg flex items-center justify-center">
                <FileImage className="w-4 h-4 text-black" />
              </div>
              <h4 className="font-medium text-lg text-white">Imagens Processadas</h4>
            </div>
            <p className="text-3xl font-bold text-white">6,789</p>
          </div>

          {/* Stat 3 */}
          <div className="ghost-glass p-6 rounded-lg border border-white/10">
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-8 h-8 bg-ghost-gradient rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-black" />
              </div>
              <h4 className="font-medium text-lg text-white">Docs Analisados</h4>
            </div>
            <p className="text-3xl font-bold text-white">3,456</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold ghost-gradient-text mb-4">
            Pronto para turbinar sua mídia?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Experimente Ghost Loader Premium e eleve sua experiência de conversão e upload.
          </p>
          <Button className="ghost-btn-primary">
            Assinar Agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
