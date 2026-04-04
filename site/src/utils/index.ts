import { AppStore, ToastPosition } from "@/types";

export const generateProviderCode = (state: Partial<AppStore>) => {
  const {
    animationEase = "spring",
    dismissable = false,
    icons = "visible",
    position = "top-center",
    toastDuration = 5,
    toastsLimit = 10,
    style = null,
  } = state;

  return `
import { PingsToastsProvider } from 'react-pings';
import '../node_modules/react-pings/dist/index.css';

createRoot(document.getElementById('root')!).render(
  <PingsToastsProvider
    position="${position}"
    toastDuration={${toastDuration}}
    animationEase="${animationEase}"
    dismissable={${dismissable}}
    icons="${icons}"
    toastLimit={${toastsLimit}}
  >
    <App />
  </PingsToastsProvider>
);`;
};

export const generateUsageCode = (state: Partial<AppStore>) => {
  const toastType = state.toastType || "success";

  const templates: Record<string, string> = {
    success: `ping.success("Success Toast")`,
    error: `ping.error("Error Toast")`,
    info: `ping.info("Info Toast")`,
    warning: `ping.warning("Warning Toast")`,
    blank: `ping("Blank Toast")`,
    promise: `ping.promise(new Promise((rej, res) => {
      setTimeout(Math.random() > 0.5 ? rej : res, 1000); // example promise
    }), {
      loading: "Saving...",
      success: "Saved successfully",
      error: "Error in saving"
    })`,
    jsx: `ping.success(<p>Hello world</p>) // any jsx valid`,
    "custom icon": `// same for all toast, except promise
      ping.success("Wow", {
        icon: "😎"
      })`,
    function: `ping.error(() => "Function Error")`,
    "custom style": `// same for all toasts
      ping("Custom styles", {
        style: {
          backgroundColor: "indigo",
        }
      })`,
  };

  const codeSnippet = templates[toastType];

  return `import { usePings } from "react-pings";

  const MyComponent = () => {
    const ping = usePings();
  
    const showToast = () => {
      ${codeSnippet}
    };
  
    return <button onClick={showToast}>Show Toast</button>;
  };`;
};

export const generateAllCodes = (state: Partial<AppStore>) => {
  return {
    providerCode: generateProviderCode(state),
    usageCode: generateUsageCode(state),
  };
};

export const getClassNames = (toastPosition: ToastPosition) => {
  switch (toastPosition) {
    case "top-left":
      return "border-t-2 border-b-transparent! border-r-transparent! border-l-2";
    case "top-center":
      return "border-t-2 border-b-transparent! border-r-transparent! border-l-transparent!";
    case "top-right":
      return "border-t-2 border-b-transparent! border-r-2 border-l-transparent!";
    case "bottom-left":
      return "border-t-transparent! border-b-2 border-r-transparent! border-l-2";
    case "bottom-center":
      return "border-t-transparent! border-b-2 border-r-transparent! border-l-transparent!";
    case "bottom-right":
      return "border-t-transparent! border-b-2 border-r-2 border-l-transparent!";
  }
};
