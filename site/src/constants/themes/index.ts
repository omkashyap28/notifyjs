export const chatgptTheme = {
  dark: {
    'code[class*="language-"]': {
      color: "#e5e7eb",
      background: "#0d1117",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: "13.5px",
      lineHeight: "1.6",
    },
    'pre[class*="language-"]': {
      color: "#e5e7eb",
      background: "#0d1117",
      margin: 0,
      padding: "16px",
      overflow: "auto",
    },

    comment: { color: "#6b7280" },
    prolog: { color: "#6b7280" },
    doctype: { color: "#6b7280" },
    cdata: { color: "#6b7280" },

    punctuation: { color: "#9ca3af" },

    property: { color: "#f87171" },
    tag: { color: "#f87171" },
    boolean: { color: "#f87171" },
    number: { color: "#f87171" },
    constant: { color: "#f87171" },

    selector: { color: "#34d399" },
    attrName: { color: "#34d399" },
    string: { color: "#34d399" },
    char: { color: "#34d399" },
    builtin: { color: "#34d399" },

    operator: { color: "#9ca3af" },
    entity: { color: "#9ca3af" },

    url: { color: "#60a5fa" },
    function: { color: "#60a5fa" },

    keyword: { color: "#c084fc" },

    regex: { color: "#fbbf24" },
    important: { color: "#fbbf24" },
  },

  light: {
    'code[class*="language-"]': {
      color: "#111827",
      background: "#ffffff",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: "13.5px",
      lineHeight: "1.6",
    },
    'pre[class*="language-"]': {
      color: "#111827",
      background: "#ffffff",
      margin: 0,
      padding: "16px",
      overflow: "auto",
    },

    comment: { color: "#6b7280" },
    prolog: { color: "#6b7280" },
    doctype: { color: "#6b7280" },
    cdata: { color: "#6b7280" },

    punctuation: { color: "#374151" },

    property: { color: "#dc2626" },
    tag: { color: "#dc2626" },
    boolean: { color: "#dc2626" },
    number: { color: "#dc2626" },
    constant: { color: "#dc2626" },

    selector: { color: "#059669" },
    attrName: { color: "#059669" },
    string: { color: "#059669" },
    char: { color: "#059669" },
    builtin: { color: "#059669" },

    operator: { color: "#374151" },
    entity: { color: "#374151" },

    url: { color: "#2563eb" },
    function: { color: "#2563eb" },

    keyword: { color: "#7c3aed" },

    regex: { color: "#d97706" },
    important: { color: "#d97706" },
  },
};

export const chatgptTerminalThemes = {
  dark: {
    background: "#0d1117",
    foreground: "#e5e7eb",
    cursor: "#e5e7eb",
    cursorAccent: "#0d1117",
    selection: "#1f2937",

    black: "#111827",
    red: "#f87171",
    green: "#34d399",
    yellow: "#fbbf24",
    blue: "#60a5fa",
    magenta: "#c084fc",
    cyan: "#22d3ee",
    white: "#e5e7eb",

    brightBlack: "#6b7280",
    brightRed: "#fb7185",
    brightGreen: "#4ade80",
    brightYellow: "#facc15",
    brightBlue: "#93c5fd",
    brightMagenta: "#d8b4fe",
    brightCyan: "#67e8f9",
    brightWhite: "#ffffff",
  },

  light: {
    background: "#ffffff",
    foreground: "#111827",
    cursor: "#111827",
    cursorAccent: "#ffffff",
    selection: "#e5e7eb",

    black: "#111827",
    red: "#dc2626",
    green: "#059669",
    yellow: "#d97706",
    blue: "#2563eb",
    magenta: "#7c3aed",
    cyan: "#0891b2",
    white: "#f9fafb",

    brightBlack: "#6b7280",
    brightRed: "#ef4444",
    brightGreen: "#10b981",
    brightYellow: "#f59e0b",
    brightBlue: "#3b82f6",
    brightMagenta: "#8b5cf6",
    brightCyan: "#06b6d4",
    brightWhite: "#ffffff",
  },
};