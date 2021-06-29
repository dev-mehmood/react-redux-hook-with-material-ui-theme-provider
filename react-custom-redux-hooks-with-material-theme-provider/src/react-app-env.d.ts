/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />
import * as createPalette from "@material-ui/core/styles/createPalette";
import { ThemeOptions, Theme } from "@material-ui/core/styles";
interface IExtras {
  footerBgColor: string;
}
declare module "@material-ui/core/styles/createPalette" {
  export interface PaletteOptions {
    extras?: Partial<IExtras>;
  }
}
declare module "@material-ui/core/styles/createMuiTheme" {
  export interface Theme {
    extras?: Partial<IExtras>;
  }
  export interface ThemeOptions {
    extras?: Partial<IExtras>;
  }
}
declare module "react-location-picker";

declare module firebase {
  export const functios: any;
}
