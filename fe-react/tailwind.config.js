export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: Array.from({ length: 500 }).reduce(
        (map, _, index) => {
          map[index] = `${index}px`;
          return map;
        },
        {
          0.1: "0.1px",
          0.2: "0.2px",
          0.5: "0.5px",
        }
      ),
    },
  },
  plugins: [],
};
