declare module "*.png" {
  const content: number;
  export default content;
}

declare module "*.jpg" {
  const content: number;
  export default content;
}

declare module "*.jpeg" {
  const content: number;
  export default content;
}

declare module "*.svg" {
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.ttf" {
  const content: FontSource;
  export default content;
}
