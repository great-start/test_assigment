import { appDataSource } from '../data-source';
import { ErrorHandler } from '../error';
import { Positions } from '../entity';

class PositionService {
    public getAllPositions() {
        try {
            return appDataSource.getRepository(Positions).find();

        } catch (e: any) {
            return new ErrorHandler(e.message);
        }
    }
}

export const positionService = new PositionService();
