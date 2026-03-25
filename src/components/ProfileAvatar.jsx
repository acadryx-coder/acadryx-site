// ProfileAvatar.jsx

const ProfileAvatar = ({ src, name, size = 36 }) => {
  // Generate initials directly from name
  const getInitials = () => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials();
  const fontSize = size * 0.4;

  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0
        }}
        onError={(e) => {
          e.target.style.display = "none";
          const parent = e.target.parentNode;
          const fallback = document.createElement("div");
          fallback.style.cssText = `width: ${size}px; height: ${size}px; border-radius: 50%; background: #14b8a6; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: ${fontSize}px; flex-shrink: 0; text-transform: uppercase;`;
          fallback.textContent = initials;
          parent.replaceChild(fallback, e.target);
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#14b8a6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 600,
        fontSize: `${fontSize}px`,
        flexShrink: 0,
        textTransform: "uppercase"
      }}
    >
      {initials}
    </div>
  );
};

export default ProfileAvatar;
