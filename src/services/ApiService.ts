import type { RegistrationResponse, } from '../types/auth.types';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<RegistrationResponse> {

  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error en generateObjects:", err);
    return { success: false, error: "Error al conectar con el backend." };
  }
}