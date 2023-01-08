/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    daisyui: {darkTheme: "dark"},
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};
