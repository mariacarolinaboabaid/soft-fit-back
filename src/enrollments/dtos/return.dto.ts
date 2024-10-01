export class ReturnEnrollmentDTO {
  constructor(
    readonly id: string,
    readonly enrollment: string,
    readonly monthlyFee: number,
  ) {}
}
