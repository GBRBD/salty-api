import { Document } from 'mongoose';

export interface Story extends Document {
  readonly title: string;
  readonly content: number;
}
