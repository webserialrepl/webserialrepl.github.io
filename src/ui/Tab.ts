import * as monaco from 'monaco-editor';

export interface TabState {
  id: number;
  name: string; // ファイル名（'<無題>' など含む）
  path?: string | null;
  isModified: boolean;
  model: monaco.editor.ITextModel;
}

export function displayName(tab: TabState): string {
  return (tab.isModified ? '*' : '') + tab.name;
}
