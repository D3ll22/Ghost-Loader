
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ScrapeRequest {
  username: string;
}

export interface ScrapeResponse {
  status: string;
  result?: any;
  data?: any;
  message?: string;
}

export interface HealthResponse {
  status: string;
  timestamp?: string;
  services?: Record<string, string>;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Endpoint principal de scraping conforme backend Flask
  async scrape(username: string): Promise<ApiResponse<ScrapeResponse>> {
    return this.request<ScrapeResponse>('/scrape', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
  }

  // Health check conforme backend Flask
  async getHealth(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/health');
  }

  // Documentação dos endpoints
  async getDocs(): Promise<ApiResponse<any>> {
    return this.request<any>('/api/docs');
  }

  // Endpoints placeholder para funcionalidades futuras
  async upload(file: File): Promise<ApiResponse<any>> {
    console.log('Upload endpoint não implementado no backend ainda');
    return {
      success: false,
      message: 'Upload endpoint ainda não disponível no backend Flask',
    };
  }

  async getStatus(taskId: string): Promise<ApiResponse<any>> {
    console.log('Status endpoint não implementado no backend ainda');
    return {
      success: false,
      message: 'Status endpoint ainda não disponível no backend Flask',
    };
  }

  async getLogs(): Promise<ApiResponse<any[]>> {
    console.log('Logs endpoint não implementado no backend ainda');
    return {
      success: false,
      message: 'Logs endpoint ainda não disponível no backend Flask',
    };
  }

  async getMetrics(): Promise<ApiResponse<any>> {
    console.log('Metrics endpoint não implementado no backend ainda');
    return {
      success: false,
      message: 'Metrics endpoint ainda não disponível no backend Flask',
    };
  }

  async getFiles(): Promise<ApiResponse<any[]>> {
    console.log('Files endpoint não implementado no backend ainda');
    return {
      success: false,
      message: 'Files endpoint ainda não disponível no backend Flask',
    };
  }

  async processMedia(data: any): Promise<ApiResponse<any>> {
    console.log('Process media endpoint não implementado no backend ainda');
    return {
      success: false,
      message: 'Process media endpoint ainda não disponível no backend Flask',
    };
  }
}

export const apiService = new ApiService();
