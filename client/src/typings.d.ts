declare module '*.css';

declare module '*.css' {
  const classes: {[key: string]: string};
  export default classes;
}

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  // eslint-disable-next-line
  const value: any;
  export = value;
}

declare module '*.jpg' {
  // eslint-disable-next-line
  const value: any;
  export = value;
}

declare module '*.webp' {
  // eslint-disable-next-line
  const value: any;
  export = value;
}
