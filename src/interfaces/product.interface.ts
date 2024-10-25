interface IProduct {
  _id?: string;
  _userId: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  photo?: string;
}

export type { IProduct };
