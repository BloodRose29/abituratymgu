/** Типы контента: весь контент сайта — обычные данные (без разметки в JSX). */

export interface LinkItem {
  title: string;
  sub: string;
  url: string;
}

export interface TgItem {
  name: string;
  sub: string;
  url: string;
}

export interface TeamCard {
  avatar: string;
  photo?: string;
  imgClass?: string;
  name: string;
  role?: string;
  tg?: { user: string; url: string };
}

export type TableRow = (string | number | null)[];

export type Block =
  | { t: 'h2'; id?: string; text: string }
  | { t: 'h3'; id?: string; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'steps'; items: string[] }
  | { t: 'table'; head: string[]; rows: TableRow[] }
  | { t: 'tip' | 'warn' | 'danger'; text: string }
  | { t: 'adr'; text: string }
  | { t: 'links'; items: LinkItem[] }
  | { t: 'tggrid'; items: TgItem[] }
  | { t: 'team'; cards: TeamCard[] };

/** Вкладки длинной страницы (например, «Иностранцам»). */
export interface TabSection {
  id: string;
  label: string;
  icon: string;
  blocks: Block[];
}