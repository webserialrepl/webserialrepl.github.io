import * as monaco from 'monaco-editor';

export interface TabState {
  id: number;
  disp_name: string; // 表示用ファイル名（'<無題>' など含む）
  file_path?: string | null; // ファイルのパス
  isModified: boolean;
  model: monaco.editor.ITextModel;
}

export function displayName(tab: TabState): string {
  return (tab.isModified ? '*' : '') + tab.disp_name;
}
