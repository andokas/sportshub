import localFont from "next/font/local";

export const youngserifFont = localFont({
  src: [
    {
      path: "../fonts/youngserif/YoungSerif-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/youngserif/YoungSerif-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/youngserif/YoungSerif-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/youngserif/YoungSerif-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/youngserif/YoungSerif-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/youngserif/YoungSerif-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/youngserif/YoungSerif-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/youngserif/YoungSerif-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});

export const f1Font = localFont({
  src: [
    {
      path: "../fonts/f1/Alphacorsa.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/f1/Alphacorsa_Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});