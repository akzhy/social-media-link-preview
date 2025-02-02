import Discord from "./Discord.svelte";
import Facebook from "./Facebook.svelte";
import LinkedIn from "./LinkedIn.svelte";
import X from "./X.svelte";

export const previewsList = [
  {
    title: "Facebook",
    component: Facebook,
    id: "facebook",
  },
  {
    title: "X",
    component: X,
    dataKey: "twitter",
    id: "x",
  },
  {
    title: "LinkedIn",
    component: LinkedIn,
    id: "linkedin",
  },
  {
    title: "Discord",
    component: Discord,
    id: "discord",
  },
];
