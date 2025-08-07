export interface CardModel {
  url: string;
  title: string;
  img: string;
  alt: string;
  save?: string;
  price: {
    new: number;
    old?: number;
  }
}