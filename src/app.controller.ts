import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Client } from '@elastic/elasticsearch';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const matchAllQuery = {
      index: '_search', // Replace with your index name
      body: {
        query: {
          match_all: {},
        },
      },
    };
    const client = new Client({
      node: 'http://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'changeme',
      },
    });
    try {
      const response = await client.search(matchAllQuery);
      console.log('Match All query results:', response.body.hits.hits);
    } catch (error) {
      console.error('Error performing Match All query:', error);
    } finally {
      // Close the Elasticsearch client when done
      await client.close();
    }
    return this.appService.getHello();
  }
}
