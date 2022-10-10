import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { Stock } from './stock.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StockService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheService: Cache
    ) {}

    async getTime(): Promise<Object> {

        const time = await this.cacheService.get('time');
        
        if (time) {
            return time;
        }

        const response = await firstValueFrom(this.httpService.get('http://localhost:5000'));        

        await this.cacheService.set('time', response.data, {ttl: 10});

        return response.data;
    }
}
