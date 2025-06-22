
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  task_id?: string;
}

export interface ScrapeRequest {
  username: string;
}

export interface ScrapeResponse {
  status: string;
  result?: any;
  task_id?: string;
  progress?: number;
}

export interface UploadResponse {
  status: string;
  url?: string;
  file_id?: string;
}

export interface StatusResponse {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  result?: any;
  error?: string;
}

export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
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
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async scrape(username: string): Promise<ApiResponse<ScrapeResponse>> {
    return this.request<ScrapeResponse>('/api/scrape', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
  }

  async upload(file: File): Promise<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<UploadResponse>('/api/upload', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async getStatus(taskId: string): Promise<ApiResponse<StatusResponse>> {
    return this.request<StatusResponse>(`/api/status?task_id=${taskId}`);
  }

  async getHealth(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/api/health');
  }

  async getLogs(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/logs');
  }

  async getMetrics(): Promise<ApiResponse<any>> {
    return this.request<any>('/api/metrics');
  }

  async getFiles(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/files');
  }

  async processMedia(data: any): Promise<ApiResponse<any>> {
    return this.request<any>('/api/process', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
