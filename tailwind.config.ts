import type { Config } from "tailwindcss";
// const withMT = require("@material-tailwind/react/utils/withMT");
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default withMT(config);
