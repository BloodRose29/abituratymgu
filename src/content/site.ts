/** Общие данные сайта: бренд, навигация, футер, призывы. */

export const BRAND = {
  logo: 'ТюмГУ',
  name: 'Абитуриенту ТюмГУ',
  tagline: 'всё для поступления и жизни в Тюмени',
  hint: '💬 Справка по сайту — в помощнике справа',
};

export interface NavItem {
  label: string;
  to: string;
}

export const NAV: NavItem[] = [
  { label: 'Главная', to: '/' },
  { label: 'Иностранцам', to: '/foreign' },
  { label: 'Студентам', to: '/student' },
  { label: 'Общежитие', to: '/dorm' },
  { label: 'О нас', to: '/about' },
];

export const FOOTER = {
  about:
    'Неофициальный справочник для абитуриентов и иностранных студентов Тюменского государственного университета.',
  sections: [
    { label: 'Иностранным студентам', to: '/foreign' },
    { label: 'Студентам', to: '/student' },
    { label: 'Общежитие', to: '/dorm' },
    { label: 'О нас', to: '/about' },
  ],
  help: [
    { label: 'Главная страница', to: '/' },
    { label: 'Официальные ссылки ТюмГУ', to: '/student/official' },
    { label: 'Помощники — на странице «О нас»', to: '/about/helpers' },
  ],
  bottom:
    'Материалы подготовлены на основе памяток абитуриентов. Цены указаны на 2025 год и могут меняться — всегда уточняйте на месте.',
};

export interface Cta {
  title: string;
  text: string;
  button: string;
}

export const CTA_MAIN: Cta = {
  title: 'Не нашли ответ?',
  text: 'Спросите встроенного помощника — он ответит и откроет нужный раздел.',
  button: '💬 Спросить помощника',
};

export const CTA_DORM: Cta = {
  title: 'Остались вопросы по общаге?',
  text: 'Спросите встроенного помощника — он ответит и откроет нужный раздел.',
  button: '💬 Спросить помощника',
};