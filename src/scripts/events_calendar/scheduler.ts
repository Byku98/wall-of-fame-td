import * as cron from 'node-cron';
import { main as runScraper } from './jobs';

let isRunning = false;

async function runJob(source: 'startup' | 'cron'): Promise<void> {
  if (isRunning) {
    console.log(`[scheduler] Skip ${source}, previous run still active`);
    return;
  }

  isRunning = true;

  try {
    console.log(`[scheduler] Starting ${source}`);
    const events = await runScraper();
    console.log(`[scheduler] Done, events: ${events.length}`);
  } catch (error) {
    console.error('[scheduler] Error:', error);
  } finally {
    isRunning = false;
  }
}

cron.schedule(
  '0 0 * * *',
  () => {
    void runJob('cron');
  },
  { timezone: 'Europe/Warsaw' },
);

void runJob('startup');