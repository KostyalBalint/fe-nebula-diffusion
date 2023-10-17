export type Archives = {
  glb: {
    faceCount: number;
    size: number;
    textureCount: number;
    textureMaxResolution: number;
    type: string;
    vertexCount: number;
  };
  gltf: {
    faceCount: number;
    size: number;
    textureCount: number;
    textureMaxResolution: number;
    type: string;
    vertexCount: number;
  };
  source: {
    faceCount: null;
    size: number;
    textureCount: null;
    textureMaxResolution: null;
    type: string;
    vertexCount: null;
  };
  usdz: {
    faceCount: null;
    size: number;
    textureCount: null;
    textureMaxResolution: null;
    type: string;
    vertexCount: null;
  };
};

export type ThumbnailsImage = {
  height: number;
  size: number;
  uid: string;
  url: string;
  width: number;
};

export type Thumbnails = {
  images: ThumbnailsImage[];
};

export type UserAvatarImage = {
  height: number;
  size: number;
  url: string;
  width: number;
};

export type UserAvatar = {
  images: UserAvatarImage[];
  uri: string;
};

export type User = {
  account: string;
  avatar: UserAvatar;
  displayName: string;
  profileUrl: string;
  uid: string;
  uri: string;
  username: string;
};

export type SketchfabModel = {
  animationCount: number;
  archives: Archives;
  categories: string[];
  commentCount: number;
  createdAt: string;
  description: string;
  embedUrl: string;
  faceCount: number;
  isAgeRestricted: boolean;
  isDownloadable: boolean;
  license: string;
  likeCount: number;
  name: string;
  publishedAt: string;
  staffpickedAt: null;
  tags: string[];
  thumbnails: Thumbnails;
  uid: string;
  uri: string;
  user: User;
  vertexCount: number;
  viewCount: number;
  viewerUrl: string;
};
