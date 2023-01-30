export class Session {
  creationDate: Date;
  review: string | undefined;
  source: string | undefined;
  grade: number | null;

  constructor(review: string, source: string, grade: number) {
    this.creationDate = new Date();
    this.review = review;
    this.source = source;
    this.grade = grade;
  }
}
