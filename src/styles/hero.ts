import { heroui } from "@heroui/react";
export default heroui({
    prefix: 'osu-theme',
    defaultTheme: "dark",
    layout: {

    },
    themes: {
        "osu-theme": {
            extend: "dark",
            colors: {
                primary: {
                DEFAULT: "#ff8bae",
                foreground: "#ffffff",
                },
                focus: "#ff8bae",
            },
            layout: {
                
            }
        }
    }
});