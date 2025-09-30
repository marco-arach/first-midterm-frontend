import React from "react";
import { Copy, Share2 } from "lucide-react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  const shareUrl = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Enlace copiado al portapapeles.");
    } catch (err) {
      console.error("Error al copiar", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          minWidth: "300px",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Share2 size={20} color="#333" /> Compartir
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <button
            className="p-2 hover:text-green-600"
            title="WhatsApp"
            style={{ cursor: "pointer" }}
          >
            <FaWhatsapp size={28} color="green" />
          </button>

          <button
            className="p-2 hover:text-blue-600"
            title="Correo"
            style={{ cursor: "pointer" }}
          >
            <FaEnvelope size={28} color="blue" />
          </button>

          <button
            onClick={handleCopy}
            className="p-2 hover:text-purple-600"
            title="Copiar enlace"
            style={{ cursor: "pointer" }}
          >
            <Copy size={28} color="purple" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
