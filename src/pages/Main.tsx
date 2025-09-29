import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, createProject, deleteProject } from "../services/ApiService";
import { Trash2 } from "lucide-react";

interface Project {
  id: number;
  name: string;
}

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      getProjects(userId)
        .then((data) => {
          if (data.success) {
            setProjects(data.projects || []);
          } else {
            console.error(data.error);
          }
        })
        .catch((err) => console.error("Error cargando proyectos:", err));
    }
  }, [userId]);

  const openProject = (projectId: string) => {
    navigate(`/whiteboard/${projectId}`);
  };

  const handleCreateProject = async () => {

    if (!newProjectName.trim() || !userId) return;

    try {
      const created = await createProject(userId, newProjectName);
      if (created.success) {
        setProjects((prev) => [...prev, created.project]);
        setNewProjectName("");
      } else {
        console.error(created.error);
      }
    } catch (error) {
      console.error("Error creando proyecto:", error);
    }
  };

  const handleDeleteProject = async (projectId: Number) => {
    try {
      const deleted = await deleteProject(projectId);
      if (deleted.success) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
      } else {
        console.error(deleted.error);
      }
    } catch (error) {
      console.error("Error eliminando proyecto:", error);
    }
  };

  return (
    <div className="main-page p-6">
      <h1 className="text-2xl font-bold mb-4">Tus Proyectos</h1>
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleCreateProject}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onDoubleClick={() => openProject(String(proj.id))}
            className="relative border rounded-xl p-4 shadow-md bg-white cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{proj.name}</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProject(proj.id);
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
