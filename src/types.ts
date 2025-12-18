
export interface ChapterZeroData {
  names: {
    groom: string;
    bride: string;
  };
  imageZero: string,
  imageSplash: string,
}

export interface ChapterData {
  id: string;
  chapter: string;
  title: string;

  firstSection: {
    imageLeft: string;
    topTitleImage: string;
    bottomTitleImage: string;
    maintext: string;
    bottomMainText: string;
  };

  secondSection: {
    mainImage: string;
    bottomTitleLeftImage: string;
  };

  thridSection: {
    imageBottomLeft: string;
    titleImageBottomLeft: string;
    imageRightTop: string;
    titleImageRightTop: string;
    mainText: string;
    subMainText: string;
    mainImageRight: string;
    titleMainImageRight: string;
  };

  fourthSection: {
    mainText: string;
    mainImageRight: string;
    titleMainImageRight: string;
    descImageRight: string;
  };
}

export interface WeddingStory {
  intro: ChapterZeroData;
  chapters: ChapterData[];
}
