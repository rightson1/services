/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.jsx", "./components/*.jsx"],
    theme: {
        extend: {
            width: {},
            colors: {
                blue: "rgba(29 161 242)",
            },
            boxShadow: {
                "3xl": "10px 0px 60px -10px rgba(0, 0, 0, 0.3)",
                "4xl": "10px 0px 10px 0px rgba(0, 0, 0, .5)",
            },
        },
    },
    plugins: [],
};