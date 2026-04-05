import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    __pwaInstallPrompt: BeforeInstallPromptEvent | null;
  }
}

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(
      () => window.__pwaInstallPrompt ?? null,
    );
  const [isInstalled, setIsInstalled] = useState(
    window.matchMedia("(display-mode: standalone)").matches,
  );

  useEffect(() => {
    if (isInstalled) return;

    // Pick up already-captured global prompt
    if (window.__pwaInstallPrompt) {
      setInstallPrompt(window.__pwaInstallPrompt);
    }

    function onReady() {
      if (window.__pwaInstallPrompt)
        setInstallPrompt(window.__pwaInstallPrompt);
    }
    function onInstalled() {
      setIsInstalled(true);
      setInstallPrompt(null);
      window.__pwaInstallPrompt = null;
    }

    window.addEventListener("pwaInstallReady", onReady);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("pwaInstalled", onInstalled);

    return () => {
      window.removeEventListener("pwaInstallReady", onReady);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("pwaInstalled", onInstalled);
    };
  }, [isInstalled]);

  async function promptInstall() {
    const prompt = installPrompt ?? window.__pwaInstallPrompt;
    if (!prompt) return;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "accepted") {
      setIsInstalled(true);
      setInstallPrompt(null);
      window.__pwaInstallPrompt = null;
    }
  }

  return {
    canInstall: !!(installPrompt ?? window.__pwaInstallPrompt) && !isInstalled,
    isInstalled,
    promptInstall,
  };
}
