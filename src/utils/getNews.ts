import { getRequest } from '@heptacode/http-request';
import { config } from '../config.js';
import { NewsPayload } from '../typings.js';

/**
 * 뉴스 가져오기
 * @returns {NewsPayload[]}
 */
export async function getNews(): Promise<NewsPayload[]> {
  const promises: NewsPayload[] = [];

  for (const category of config.categories) {
    promises.push({
      category: category,
      news: (
        await getRequest('https://news.daum.net/api/harmonydic/contents/news.json', {
          category,
          pageSize: config.pageSize,
        })
      ).data.list,
    });
  }

  return await Promise.all([...promises]);
}
