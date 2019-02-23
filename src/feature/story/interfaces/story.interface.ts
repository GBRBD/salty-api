import { Document } from 'mongoose';

export interface Story extends Document {
  readonly _id: string;
  readonly title: string;
  readonly content: number;
}
