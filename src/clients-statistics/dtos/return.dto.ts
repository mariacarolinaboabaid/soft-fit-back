export class ReturnDTO {
  constructor(
    readonly totalCustomers: number,
    readonly totalDeliquentCustomers: number,
    readonly totalDeliquencyAmount: number,
    readonly totalRenewedEnrollments: number,
    readonly totalNewEnrollments: number,
    readonly totalCanceledEnrollments: number,
    readonly totalPremiumEnrollments: number,
    readonly totalBasicEnrollments: number,
  ) {}
}
