export type IconName =
  | 'calculator'
  | 'chat'
  | 'aleph'
  | 'child'
  | 'teen'
  | 'graduate'
  | 'people'
  | 'monitor'
  | 'coins'
  | 'clipboard'
  | 'arrow'
  | 'chevron'
  | 'menu'
  | 'close'
  | 'globe'
  | 'wallet'
  | 'check'
  | 'mail'
  | 'phone'
  | 'download'
  | 'play'
  | 'book'
  | 'file'
  | 'star'
  | 'info'
  | 'sparkle';

/** Stroke icons on a 24x24 grid, drawn to match the rounded, flat reference design. */
export const ICON_PATHS: Record<IconName, string> = {
  calculator:
    '<rect x="4.5" y="3" width="15" height="18" rx="2.5"/><rect x="7.5" y="6" width="9" height="3.5" rx="1"/><path d="M8.5 13h0M12 13h0M15.5 13h0M8.5 17h0M12 17h0M15.5 17h0"/>',
  chat: '<path d="M20.5 11.5a7.5 7.5 0 0 1-7.5 7.5H9l-4.5 3v-4.2A7.5 7.5 0 0 1 13 4a7.5 7.5 0 0 1 7.5 7.5Z"/><path d="M9.5 11h7M9.5 14h4"/>',
  aleph: '',
  child:
    '<circle cx="12" cy="8" r="4.2"/><path d="M4.8 20.5a7.2 7.2 0 0 1 14.4 0"/><path d="M10 7.6h0M14 7.6h0"/>',
  teen: '<circle cx="12" cy="8" r="4.2"/><path d="M4.8 20.5a7.2 7.2 0 0 1 14.4 0"/><path d="M8.2 5.6c1.6 1.6 6 1.6 7.6 0"/>',
  graduate:
    '<path d="M2.8 9 12 4.6 21.2 9 12 13.4 2.8 9Z"/><path d="M6.6 11v5.1c0 1.7 2.4 3.1 5.4 3.1s5.4-1.4 5.4-3.1V11"/><path d="M20.4 9.6v4.6"/>',
  people:
    '<circle cx="9" cy="8.4" r="3.4"/><path d="M3.2 19.6a5.8 5.8 0 0 1 11.6 0"/><path d="M16.2 5.4a3.4 3.4 0 0 1 0 6.6"/><path d="M17.4 14.6a5.8 5.8 0 0 1 3.4 5"/>',
  monitor: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M9 20.5h6M12 16.5v4"/>',
  coins:
    '<ellipse cx="12" cy="6.5" rx="7" ry="2.8"/><path d="M5 6.5v4c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-4"/><path d="M5 10.5v4c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-4"/>',
  clipboard:
    '<rect x="5" y="4.5" width="14" height="16" rx="2"/><rect x="9" y="2.6" width="6" height="3.6" rx="1.2"/><path d="M9 11h6M9 15h4"/>',
  arrow: '<path d="M4 12h15"/><path d="m13.5 6.5 6 5.5-6 5.5"/>',
  chevron: '<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  globe:
    '<circle cx="12" cy="12" r="8.6"/><path d="M3.6 12h16.8"/><path d="M12 3.4c2.2 2.4 3.3 5.4 3.3 8.6s-1.1 6.2-3.3 8.6c-2.2-2.4-3.3-5.4-3.3-8.6S9.8 5.8 12 3.4Z"/>',
  wallet:
    '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h13a2 2 0 0 1 0 5H3"/><path d="M6.5 6V5a2 2 0 0 1 2.6-1.9l8 2.4"/>',
  check: '<path d="m5 12.8 4.4 4.2L19 7"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.8 7 7.2 5.4a1.7 1.7 0 0 0 2 0L20.2 7"/>',
  phone:
    '<path d="M7.6 3.5h-.9A2.7 2.7 0 0 0 4 6.2C4 13.9 10.1 20 17.8 20a2.7 2.7 0 0 0 2.7-2.7v-.9l-4-1.7-2 2a12.5 12.5 0 0 1-5.2-5.2l2-2-1.7-4Z"/>',
  download: '<path d="M12 3.6v11.2"/><path d="m7.4 10.6 4.6 4.6 4.6-4.6"/><path d="M4.5 19.5h15"/>',
  play: '<circle cx="12" cy="12" r="8.6"/><path d="M10.2 8.6 16 12l-5.8 3.4V8.6Z"/>',
  book: '<path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H19v15H6.2A2.2 2.2 0 0 0 4 20.2V5.2Z"/><path d="M19 18v3H6.2A2.2 2.2 0 0 1 4 18.8"/><path d="M8 7.5h7"/>',
  file: '<path d="M14 3.2H7.5A2.2 2.2 0 0 0 5.3 5.4v13.2A2.2 2.2 0 0 0 7.5 20.8h9a2.2 2.2 0 0 0 2.2-2.2V8l-4.7-4.8Z"/><path d="M13.8 3.4V8h4.8"/>',
  star: '<path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9-4.3-4.1 5.9-.8L12 3.6Z"/>',
  info: '<circle cx="12" cy="12" r="8.6"/><path d="M12 11v5.4M12 7.8h0"/>',
  sparkle: '<path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z"/>',
};
