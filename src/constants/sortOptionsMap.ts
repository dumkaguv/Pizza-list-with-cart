const SORT_OPTIONS_MAP: Record<number, string> = {
  0: "rating&order=desc",
  1: "rating&order=asc",
  2: "prices&order=desc",
  3: "prices&order=asc",
  4: "title&order=desc",
  5: "title&order=asc",
};

export const sortOptions: string[] = [
  "Популярности ↓",
  "Популярности ↑",
  "Цене ↓",
  "Цене ↑",
  "Алфавиту ↓",
  "Алфавиту ↑",
];

export const OptionToIndexMap: Record<string, number> = {
  "rating&order=desc": 0,
  "rating&order=asc": 1,
  "prices&order=desc": 2,
  "prices&order=asc": 3,
  "title&order=desc": 4,
  "title&order=asc": 5,
};

export default SORT_OPTIONS_MAP;
