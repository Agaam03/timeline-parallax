import { Splash } from "next/font/google";
import { WeddingStory } from "./types";

export const WEDDING_STORY: WeddingStory = {
  intro: {
    names: {
      groom: "Ciputra Frida Pratama",
      bride: "Aimmatur Nur Azizah"
    },
    imageZero: "/chapter-0/0.jpg",
    imageSplash: "/chapter-2/2-2.png",
  },
  chapters: [
    {
      id: 'ch1',
      chapter: 'Chapter One',
      title: 'The Beginning',
      firstSection: {
        imageLeft: "/chapter-1/1-1.jpg",
        topTitleImage: "The First Encounter",
        bottomTitleImage: "Where Everything Started",
        maintext:
          "Every conversation became longer, every laugh sweeter, and every moment more meaningful",
        bottomMainText:
          "A message. A glance. A moment that felt strangely familiar—like destiny giving a gentle push. Nothing dramatic, no spotlight, just a simple connection that felt effortless and warm."
      },
      secondSection: {
        mainImage: "/chapter-1/1-2.jpg",
        bottomTitleLeftImage: "A Day We’ll Always Remember"
      },
      thridSection: {
        imageBottomLeft: "/chapter-1/1-3.jpg",
        titleImageBottomLeft: "Aimmatur Nur Azizah",
        imageRightTop: "/chapter-1/1-4.jpg",
        titleImageRightTop: "Ciputra Frida Pratama",
        mainText:
          "Every conversation became longer, every laugh sweeter, and every moment more meaningful.",
        subMainText:
          "We found comfort in each other's presence, even in silence. Slowly but surely, our hearts started choosing each other.",
        mainImageRight: "/chapter-1/1-5.jpg",
        titleMainImageRight: "Two Souls, One Journey"
      },
      fourthSection: {
        mainText:
          "From that first meeting to every memory we’ve created, everything felt like it was leading us here.",
        mainImageRight: "/chapter-1/1-6.jpg",
        titleMainImageRight: "The Beginning of Forever",
        descImageRight:
          "This chapter marks not just where we started, but where our hearts learned what home truly feels like."
      },
    },
    {
      id: 'ch2',
      chapter: 'Chapter Two',
      title: 'The Beginning',
      firstSection: {
        imageLeft: "/chapter-2/2-1.jpg",
        topTitleImage: "The First Encounter",
        bottomTitleImage: "Where Everything Started",
        maintext:
          "Every conversation became longer, every laugh sweeter, and every moment more meaningful",
        bottomMainText:
          "A message. A glance. A moment that felt strangely familiar—like destiny giving a gentle push. Nothing dramatic, no spotlight, just a simple connection that felt effortless and warm."
      },
      secondSection: {
        mainImage: "/chapter-2/2-2.png",
        bottomTitleLeftImage: "A Day We’ll Always Remember"
      },
      thridSection: {
        imageBottomLeft: "/chapter-2/2-3.jpg",
        titleImageBottomLeft: "Growing Closer",
        imageRightTop: "/chapter-2/2-4.jpg",
        titleImageRightTop: "Unexpected Feelings",
        mainText:
          "Every conversation became longer, every laugh sweeter, and every moment more meaningful.",
        subMainText:
          "We found comfort in each other's presence, even in silence. Slowly but surely, our hearts started choosing each other.",
        mainImageRight: "/chapter-2/2-5.jpg",
        titleMainImageRight: "Two Souls, One Journey"
      },
      fourthSection: {
        mainText:
          "From that first meeting to every memory we’ve created, everything felt like it was leading us here.",
        mainImageRight: "/chapter-2/2-6.jpg",
        titleMainImageRight: "The Beginning of Forever",
        descImageRight:
          "This chapter marks not just where we started, but where our hearts learned what home truly feels like."
      },
    },
  ]
};
