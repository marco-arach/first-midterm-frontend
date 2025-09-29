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
    console.error("Error al intentar registrar usuario:", err);
    return { success: false, error: "Error al conectar con el backend." };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<RegistrationResponse> {

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    return { success: false, error: "Error al conectar con el backend." };
  }
}

export async function getProjects(userId: string) {
  try {
    const response = await fetch(`${BASE_URL}/projects/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error al obtener proyectos:", err);
    return { success: false, error: "Error al conectar con el backend." };
  }
}

export async function createProject(userId: string, name: string) {
  try {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId, name }),
    });
    return await response.json();
  } catch (err) {
    console.error("Error al crear proyecto:", err);
    return { success: false, error: "Error al conectar con el backend." };
  }
}

export async function deleteProject(projectId: Number) {
  try {
    const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("Error al eliminar proyecto:", err);
    return { success: false, error: "Error al conectar con el backend." };
  }
}