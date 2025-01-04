import React, { useState } from "react";

function Avatar() {
  const gradients = [
    "linear-gradient(135deg, blue, red)",
    "linear-gradient(135deg, green, yellow)",
    "linear-gradient(135deg, purple, pink)",
    "linear-gradient(135deg, orange, cyan)",
    "linear-gradient(135deg, navy, lime)",
    "linear-gradient(135deg, teal, magenta)",
    "linear-gradient(135deg, crimson, skyblue)",
    "linear-gradient(135deg, coral, turquoise)",
    "linear-gradient(135deg, violet, lightgreen)",
    // "linear-gradient(135deg, maroon, aqua)",
    "linear-gradient(135deg, black, white)",
    "linear-gradient(135deg, royalblue, tomato)",
    "linear-gradient(135deg, peachpuff, slateblue)",
    "linear-gradient(135deg, hotpink, dodgerblue)",
    "linear-gradient(135deg, sandybrown, steelblue)",
  ];

  // Random gradient khi vào trang
  const getRandomGradient = () =>
    gradients[Math.floor(Math.random() * gradients.length)];

  const [avatar, setAvatar] = useState(getRandomGradient);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Tạo URL cho ảnh được upload
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="p-4">
      <div className="p-4 flex flex-col items-center min-h-screen">
        {/* justify-center */}
        {/* Vòng tròn Avatar */}
        <h1 className="text-black">Avatar</h1>
        <label
          htmlFor="file-upload"
          tabIndex={0}
          className="relative flex justify-center border-2 border-{gradients}
        items-center h-20 w-20 rounded-full transform transition-all
        hover:brightness-90 hover:brightness-80 focus:ring-1 focus:ring-black
        focus:outline-none overflow-hidden"
        >
          {avatar.includes("gradient") ? (
            <div
              style={{
                background: avatar,
                imageRendering: "smooth",
                width: "100%",
                height: "100%",
              }}
            ></div>
          ) : (
            <img
              src={avatar}
              alt="avatar"
              className="h-full w-full object-cover" // Thay đổi "object-contain" thành "object-cover" nếu muốn lấp đầy
            />
          )}
        </label>
        {/* Input Upload (ẩn) */}
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}

export default Avatar;
