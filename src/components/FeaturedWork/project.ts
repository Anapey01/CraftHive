export type FeaturedProject = {
  name: string;
  description: string;
  img: string;
  route: string;
};

export const projects: FeaturedProject[] = [
  {
    name: "Citychild",
    description: "A quiet rebellion drawn in digital ink.",
    img: "/featured-work/carousel_6.jpg",
    route: "/sample-project",
  },
  {
    name: "Chrome Saint",
    description: "A reflective figure sculpted in synthetic light.",
    img: "/featured-work/carousel_4.jpg",
    route: "/sample-project",
  },
  {
    name: "Gunmetal Dream",
    description: "Tension, style, and a hint of cinematic noir.",
    img: "/featured-work/carousel_2.png",
    route: "/sample-project",
  },
  {
    name: "Stoneface",
    description: "Fragments of memory cast in mineral form.",
    img: "/featured-work/carousel_3.jpg",
    route: "/sample-project",
  },
  {
    name: "Amber Cloak",
    description: "A still frame between warmth and defiance.",
    img: "/featured-work/carousel_1.jpg",
    route: "/gallery",
  },
  {
    name: "Paper Blade",
    description: "A delicate strike between art and motion.",
    img: "/featured-work/carousel_7.jpg",
    route: "/gallery",
  },
  {
    name: "Paper Blade",
    description: "A delicate strike between art and motion.",
    img: "/featured-work/carousel_8.jpg",
    route: "/gallery",
  },
];
