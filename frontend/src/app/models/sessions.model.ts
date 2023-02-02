export class Session {
  creationDate: Date;
  review: string;
  source: string;
  grade: number;
  creator: string;

  constructor(username: string, review: string, source: string, grade: number) {
    this.creationDate = new Date();
    this.review = review;
    this.source = source;
    this.grade = grade;
    this.creator = username;
  }
}
