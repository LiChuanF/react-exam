import {
    defineConfig,
    presetAttributify,
    presetWind3,
    presetTypography,
} from "unocss";
import presetIcons from "@unocss/preset-icons";
export default defineConfig({
    presets: [
        presetAttributify(), //属性化模式
        presetWind3(), //wind3预设
        presetTypography(), // 排版预设
        presetIcons({
            collections: {
                mdi: () =>
                    import("@iconify-json/mdi/icons.json").then(
                        (i) => i.default
                    ),
            },
        }),
    ],
    safelist: ["mdi-github"], // safelist 白名单
    theme: {
        colors: {
            primary: "var(--color-primary)",
        },
        animation: {
            blob: "blob 7s infinite",
        },
        keyframes: {
            blob: {
                "0%": {
                    transform: "translate(0px, 0px) scale(1)",
                },
                "33%": {
                    transform: "translate(30px, -50px) scale(1.1)",
                },
                "66%": {
                    transform: "translate(-20px, 20px) scale(0.9)",
                },
                "100%": {
                    transform: "translate(0px, 0px) scale(1)",
                },
            },
        },
    },
    rules: [
        [
            /^animation-delay-(\d+)$/,
            ([, d]) => ({ "animation-delay": `${d}ms` }),
        ],
    ],
});
