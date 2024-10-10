export class ReturnBestRatedInstructorsDTO {
  constructor(
    readonly id: string,
    readonly fullName: string,
    readonly ratingValue: number,
    readonly ratingVotesQuantity: number,
  ) {}
}
