export class Session {
  creationDate: Date;
  review: string | undefined;
  source: string | undefined;
  grade: number | null;

  constructor() {
    this.creationDate = new Date();
    this.review = '';
    this.source = '';
    this.grade = null;
  }
}
