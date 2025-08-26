import React, { createContext, useState, useEffect } from "react";

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
  // Load from localStorage first, otherwise use defaults
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem("homepageContent");
    return saved
      ? JSON.parse(saved)
      : {
          title: "Kaymilla",
          heading: "FilFi社区停止中文服务公告",
          paragraph:
            "Utilize Venice's permissionless API to build highly performant AI applications. Build global autonomous AI agents that leverage SOTA open-source models for uncensored inference, images, characters or code.",
        };
  });

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem("homepageContent", JSON.stringify(content));
  }, [content]);

  return (
    <TextContext.Provider value={{ content, setContent }}>
      {children}
    </TextContext.Provider>
  );
};
