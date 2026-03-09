export interface ScrapedEvent {
  name: string;
  date: string;
  time: string;
  link: string;
  organizer?: string;
  track?: string;
}

export type OrganizerFlag = 'motoekipa' | 'kirek' | '3mm' | 'robson';