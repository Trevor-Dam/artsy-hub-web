import axios from "axios";
import { cookies } from "next/headers";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5074/api"
});

export default apiClient;
export async function fetchData(endpoint: string, token: string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
: Promise<any> {
  const response = await apiClient.get(endpoint, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function postData(endpoint: string, data: object, token: string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
: Promise<any> {
  const response = await apiClient.post(endpoint, data, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function putData(endpoint: string, data: object, token: string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
: Promise<any> {
  const response = await apiClient.put(endpoint, data, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
export async function deleteData(endpoint: string, token: string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
: Promise<any> {
  const response = await apiClient.delete(endpoint, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function postFormData(endpoint: string, formData: FormData, token: string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
: Promise<any> {
  const response = await apiClient.post(endpoint, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    },
  });
  return response.data;
};

export async function putFormData(endpoint: string, formData: FormData, token: string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
: Promise<any> {
  const response = await apiClient.put(endpoint, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    },
  });
  return response.data;
};

export async function postWithoutToken(endpoint: string, data: object)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
: Promise<any> {
  try {
      const response = await apiClient.post(endpoint, data, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response.data;
  } catch (error) {
      console.error("Error posting data:", error);
      throw error;
  }
};

export async function fetchWithoutToken(endpoint: string)  // eslint-disable-next-line @typescript-eslint/no-explicit-any   
: Promise<any> {
  const response = await apiClient.get(endpoint, {
    headers: {
        'Content-Type': 'application/json',
    },
  });
  return response.data; 
};

export async function fetchFromQuery(endpoint: string, query: string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
: Promise<any> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
  const response = await apiClient.get(`${endpoint}?${query}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
}