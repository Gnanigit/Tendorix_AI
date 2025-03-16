import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const loadScript = async () => {
      try {
        const { default: startBizbot } = await import(
          "https://widget.wisemelon.ai/plugin.js"
        );
        (window as any).botId = "67b6e1ba0a8ce929de2950b4";
        (window as any).productName = "Wisemelon";
        (window as any).baseUrl = "https://api.wisemelon.ai";
        startBizbot();
      } catch (error) {
        console.error("Failed to load Wisemelon bot script:", error);
      }
    };

    loadScript();
  }, []);

  return null; // No UI elements needed, just inject the bot script
};

export default Chatbot;
