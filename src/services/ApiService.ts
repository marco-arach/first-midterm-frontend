import type { RegistrationResponse, } from '../types/auth.types';
import { UMLClass } from "../models/UMLClass";
import { UMLRelationship } from "../models/UMLRelationship";
import { generatePayload } from "../utils/generatePayload";
import { getTimestampedName } from "../utils/dateFormatter";
export type UMLObject = UMLClass | UMLRelationship;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<RegistrationResponse> {

  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
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
    const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
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
    const response = await fetch(`${BASE_URL}/api/v1/projects/${userId}`, {
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
    const response = await fetch(`${BASE_URL}/api/v1/projects`, {
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
    const response = await fetch(`${BASE_URL}/api/v1/projects/${projectId}`, {
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

export async function generateDiagram(
  image: File
): Promise<{ success: boolean; objetos?: UMLObject[]; error?: string }> {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${BASE_URL}/api/v1/ai/generate-diagram`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error en generateDiagram:", err);
    return { success: false, error: "Error al conectar con el backend" };
  }
}

export async function generateObjects(
  prompt: string,
  objetos: UMLObject[]
): Promise<{ success: boolean; objetos?: UMLObject[]; error?: string }> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/ai/generate-objects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, objetos }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error en generateObjects:", err);
    return { success: false, error: "Error al conectar con el backend" };
  }
}

export async function generateAndDownloadProject(objetos: any[]) {
  const payload = generatePayload(objetos);

  const response = await fetch(`${BASE_URL}/api/v1/generate/generate-project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = getTimestampedName("spring-project", "zip");
  a.click();
  URL.revokeObjectURL(url);
}