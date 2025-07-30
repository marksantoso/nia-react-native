interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: any;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "x-api-key": apiKey || "",
      apikey: apiKey || "",
    };
  }

  // Helper to build URL with query params
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  // Generic request method
  private async request<T>(
    method: string,
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { headers = {}, params, body } = options;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      }
      return response.text() as T;
    } catch (error: any) {
      throw new Error(`API request failed: ${error?.message}`);
    }
  }

  // HTTP method implementations
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", endpoint, options);
  }

  async post<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", endpoint, options);
  }

  async put<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", endpoint, options);
  }

  async patch<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("PATCH", endpoint, options);
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", endpoint, options);
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(process.env.API_BASE_URL || "");

// Export the class for testing or custom instances
export default ApiClient;
