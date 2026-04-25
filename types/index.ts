export interface TimetableEntry {
  id: string;
  moduleCode: string;
  moduleName: string;
  lecturer: string;
  room: string;
  building: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  startTime: string; // "09:00"
  endTime: string;   // "10:00"
  type: "Lecture" | "Tutorial" | "Lab" | "Seminar";
  colour: string;    // tailwind bg class
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: "Academic" | "Events" | "Welfare" | "IT";
  date: string;
  urgent: boolean;
}

export interface QuickLink {
  id: string;
  label: string;
  href: string;
  icon: string;
  description: string;
}

// Society Events
export type SocietyCategory =
  | "Academic"
  | "Arts & Culture"
  | "Hobbies"
  | "Sports"
  | "Tech";

export interface SocietyEvent {
  id: string;
  title: string;
  societyName: string;
  category: SocietyCategory;
  date: string;        // "2026-05-12"
  time: string;        // "18:00"
  location: string;
  description: string;
  tags?: string[];
  featured?: boolean;
}