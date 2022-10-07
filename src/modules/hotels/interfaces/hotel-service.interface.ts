import { Hotel } from '../../../database/schemas/hotel.schema';

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: string): Promise<Hotel>;
  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]>;
}
