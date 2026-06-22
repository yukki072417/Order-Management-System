export class GetOrderLogUseCase {
    constructor(orderLogRepository) {
        this.orderLogRepository = orderLogRepository;
    }

    async execute() {
        return await this.orderLogRepository.findAll();
    }
}
