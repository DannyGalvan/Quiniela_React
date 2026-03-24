import { createTheme } from 'react-data-table-component';

// ── Tema OSCURO ───────────────────────────────────────────────
createTheme('wc2026Dark', {
  text:       { primary: '#F1F5F9', secondary: '#94A3B8' },
  background: { default: '#0C1829' },
  context:    { background: '#1E3A8A', text: '#FFFFFF' },
  divider:    { default: 'rgba(241,245,249,0.07)' },
  button:     { default: '#3B82F6', focus: 'rgba(59,130,246,0.3)', hover: 'rgba(59,130,246,0.2)', disabled: 'rgba(241,245,249,0.3)' },
  sortFocus:  { default: '#3B82F6' },
  selected:   { default: 'rgba(59,130,246,0.12)', text: '#F1F5F9' },
  highlightOnHover: { default: 'rgba(59,130,246,0.08)', text: '#F1F5F9' },
  striped:    { default: 'rgba(241,245,249,0.02)', text: '#F1F5F9' },
}, 'dark');

// ── Tema CLARO ────────────────────────────────────────────────
createTheme('wc2026Light', {
  text:       { primary: '#0F172A', secondary: '#475569' },
  background: { default: '#FFFFFF' },
  context:    { background: '#1E3A8A', text: '#FFFFFF' },
  divider:    { default: 'rgba(15,23,42,0.08)' },
  button:     { default: '#1E3A8A', focus: 'rgba(30,58,138,0.2)', hover: 'rgba(30,58,138,0.1)', disabled: 'rgba(15,23,42,0.2)' },
  sortFocus:  { default: '#1E3A8A' },
  selected:   { default: 'rgba(30,58,138,0.08)', text: '#0F172A' },
  highlightOnHover: { default: 'rgba(59,130,246,0.06)', text: '#0F172A' },
  striped:    { default: 'rgba(15,23,42,0.02)', text: '#0F172A' },
}, 'light');

// ── CustomStyles compartidos (modern flat design) ─────────────
const sharedCustomStyles = (isDark) => ({
  table: {
    style: {
      borderRadius: '14px',
      overflow: 'hidden',
      border: isDark
        ? '1px solid rgba(241,245,249,0.08)'
        : '1px solid rgba(15,23,42,0.10)',
      boxShadow: isDark
        ? '0 4px 18px rgba(0,0,0,0.50)'
        : '0 4px 18px rgba(15,23,42,0.10)',
    },
  },
  header: {
    style: {
      background: isDark
        ? 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)'
        : 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
      color: '#FFFFFF',
      fontWeight: '800',
      fontSize: '1.1rem',
      letterSpacing: '-0.01em',
      minHeight: '60px',
      paddingLeft: '20px',
      borderBottom: 'none',
    },
  },
  subHeader: {
    style: {
      backgroundColor: isDark ? '#0C1829' : '#FFFFFF',
      paddingLeft: '0',
      paddingRight: '0',
    },
  },
  headRow: {
    style: {
      background: isDark
        ? 'linear-gradient(135deg, #1B3A8A 0%, #1E40AF 100%)'
        : 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
      borderBottom: 'none',
      minHeight: '48px',
    },
  },
  headCells: {
    style: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      paddingLeft: '16px',
      paddingRight: '16px',
      // Sin separadores verticales
      '&:not(:last-of-type)': {
        borderRight: 'none',
      },
    },
  },
  rows: {
    style: {
      minHeight: '56px',
      fontSize: '0.9rem',
      fontWeight: '500',
      borderBottom: isDark
        ? '1px solid rgba(241,245,249,0.06)'
        : '1px solid rgba(15,23,42,0.07)',
      transition: 'all 0.2s ease',
    },
    highlightOnHoverStyle: {
      backgroundColor: isDark
        ? 'rgba(59,130,246,0.10)'
        : 'rgba(59,130,246,0.06)',
      transitionDuration: '0.15s',
      transitionProperty: 'background-color',
      outlineStyle: 'none',
      borderBottomColor: 'transparent',
    },
    stripedStyle: {
      backgroundColor: isDark
        ? 'rgba(241,245,249,0.02)'
        : 'rgba(15,23,42,0.015)',
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
      // Sin separadores verticales
      '&:not(:last-of-type)': {
        borderRight: 'none',
      },
    },
  },
  expanderRow: {
    style: {
      backgroundColor: isDark ? '#0A1422' : '#F8FAFC',
      borderBottom: isDark
        ? '1px solid rgba(241,245,249,0.06)'
        : '1px solid rgba(15,23,42,0.07)',
    },
  },
  expanderButton: {
    style: {
      color: isDark ? '#3B82F6' : '#1E3A8A',
      backgroundColor: 'transparent',
      '&:hover:not(:disabled)': {
        backgroundColor: isDark
          ? 'rgba(59,130,246,0.12)'
          : 'rgba(30,58,138,0.08)',
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: isDark ? '#0C1829' : '#FFFFFF',
      color: isDark ? '#94A3B8' : '#475569',
      fontSize: '0.82rem',
      fontWeight: '600',
      borderTop: isDark
        ? '1px solid rgba(241,245,249,0.08)'
        : '1px solid rgba(15,23,42,0.08)',
      minHeight: '52px',
    },
    pageButtonsStyle: {
      borderRadius: '8px',
      height: '34px',
      width: '34px',
      padding: '4px',
      margin: '2px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: isDark ? '#94A3B8' : '#475569',
      fill: isDark ? '#94A3B8' : '#475569',
      backgroundColor: 'transparent',
      '&:disabled': { opacity: 0.4, cursor: 'unset' },
      '&:hover:not(:disabled)': {
        backgroundColor: isDark
          ? 'rgba(59,130,246,0.15)'
          : 'rgba(30,58,138,0.08)',
        color: isDark ? '#60A5FA' : '#1E3A8A',
        fill: isDark ? '#60A5FA' : '#1E3A8A',
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: isDark
          ? 'rgba(59,130,246,0.20)'
          : 'rgba(30,58,138,0.12)',
      },
    },
  },
  noData: {
    style: {
      backgroundColor: isDark ? '#0C1829' : '#FFFFFF',
      color: isDark ? '#94A3B8' : '#475569',
      padding: '2rem',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
  },
  progress: {
    style: {
      backgroundColor: isDark ? '#0C1829' : '#FFFFFF',
      color: isDark ? '#3B82F6' : '#1E3A8A',
    },
  },
});

// Columnas de posición con medallas
export const posicionStyle = (isDark) => ({
  color: '#F59E0B',
  fontWeight: '800',
  fontSize: '0.95rem',
});

// Columnas de punteo
export const punteoStyle = (isDark) => ({
  color: isDark ? '#F87171' : '#DC2626',
  fontWeight: '800',
  fontSize: '0.95rem',
});

// Exporta el objeto de customStyles según el tema actual
export const getTableStyles = (isDark) => sharedCustomStyles(isDark);

// Nombre del tema DT según el modo
export const getTableTheme = (isDark) => isDark ? 'wc2026Dark' : 'wc2026Light';

// ── Legacy export — no borrar para no romper otros imports ─────
export const compactGrid = sharedCustomStyles(true);
export const customStyles = sharedCustomStyles(false);
