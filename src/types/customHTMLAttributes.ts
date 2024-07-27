import { HTMLAttributes } from "astro/types";

export default interface CustomHTMLAttributes extends HTMLAttributes<'div'> {
    slt?: string;
    b_style?: string;
    dly?: string;
  }