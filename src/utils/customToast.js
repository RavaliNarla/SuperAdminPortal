import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";

const iconMap = {
  success: {
    icon: <FiCheckCircle size={22} />,
    color: "#16a34a",
    bg: "#ecfdf5",
    title: "Success",
  },

  error: {
    icon: <FiAlertCircle size={22} />,
    color: "#dc2626",
    bg: "#fef2f2",
    title: "Error",
  },

  warning: {
    icon: <FiAlertTriangle size={22} />,
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "Warning",
  },

  info: {
    icon: <FiInfo size={22} />,
    color: "#2563eb",
    bg: "#eff6ff",
    title: "Information",
  },
};

export const showToast = ({
  type = "success",
  message = "",
  duration = 5000,
}) => {
  const current = iconMap[type] || iconMap.success;

  toast.custom(
    (t) => (
      <div
        style={{
          width: 390,
          background: "#fff",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          boxShadow: "0 15px 35px rgba(0,0,0,.12)",
          animation: t.visible
            ? "toast-enter 0.25s ease"
            : "toast-leave 0.2s ease forwards",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: current.bg,
              color: current.color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {current.icon}
          </div>

          <div
            style={{
              marginLeft: 14,
              flex: 1,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#111827",
                fontSize: 15,
              }}
            >
              {current.title}
            </div>

            <div
              style={{
                marginTop: 5,
                color: "#6b7280",
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              {message}
            </div>
          </div>

          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#6b7280",
              padding: 4,
              marginLeft: 10,
            }}
          >
            <FiX size={18} />
          </button>
        </div>

        <div
          style={{
            height: 4,
            background: current.color,
            animation: `toastProgress ${duration}ms linear forwards`,
          }}
        />
      </div>
    ),
    {
      duration,
    },
  );
};
