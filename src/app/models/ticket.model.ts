export class Ticket {
  constructor(
    public id: string,
    public title: string,
    public tags: string[],
    public startDate: Date,
    public endDate: Date
  ) {}
}
