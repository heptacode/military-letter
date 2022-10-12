import dayjs from 'dayjs';
import { NewsPayload, Trainee } from '../typings.js';
import { writeLetter } from './writeLetter.js';

/**
 * 공군 훈련병에게 뉴스 보내기
 * @param {Trainee} trainee
 * @param {NewsPayload} newsItem
 * @returns {void} void
 */
export async function sendNews(trainee: Trainee, newsItem: NewsPayload): Promise<void> {
  let content = ``;
  for (const news of newsItem.news) {
    content += `# ${news.title}\n${
      news.summary ? news.summary.slice(0, news.summary.indexOf('다.') + 1) : ''
    }\n\n`;
  }

  await writeLetter(trainee, {
    author: dayjs().format('YYYY-MM-DD'),
    title: newsItem.category.toUpperCase(),
    content: content,
  });
}
