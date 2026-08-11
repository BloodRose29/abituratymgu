/** Сквозной маршрут «Путь абитуриента» — 6 шагов. */

export interface RouteStep {
  num: number;
  label: string;
  title: string;
  to: string;
}

const BASE = [
  { id: 'perevod', label: 'Перевод', title: 'Перевод документов' },
  { id: 'registraciya', label: 'Учёт', title: 'Миграционный учёт' },
  { id: 'medosmotr', label: 'Медосмотр', title: 'Медосмотр' },
  { id: 'daktilo', label: 'Дактилоскопия', title: 'Дактилоскопия' },
  { id: 'prodl', label: 'Продление', title: 'Продление регистрации' },
  { id: 'sim', label: 'Сим-карта', title: 'Сим-карта и СНИЛС' },
];

/** Компактный маршрут (страница «Иностранцам») — короткие подписи. */
export const ROUTE_STEPS_COMPACT: RouteStep[] = BASE.map((s, i) => ({
  num: i + 1,
  label: s.label,
  title: s.title,
  to: `/foreign/${s.id}`,
}));

/** Маршрут на главной — полные подписи шагов. */
export const ROUTE_STEPS_HERO: RouteStep[] = BASE.map((s, i) => ({
  num: i + 1,
  label: s.title,
  title: s.title,
  to: `/foreign/${s.id}`,
}));