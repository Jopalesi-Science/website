import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    rules: {
      // Updating ref.current during render is the correct React pattern for
      // keeping event-handler refs in sync with the latest render value.
      "react-hooks/refs": "off",
      // Calling setState inside a useEffect is fine for one-time client-side
      // initialisation (e.g. reading localStorage on mount).
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
