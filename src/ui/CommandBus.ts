export type Command = 'new' | 'save' | 'run' | 'list';

export class CommandBus {
  private listeners: { [key: string]: (() => void)[] } = {};
  on(cmd: Command, handler: () => void) {
    (this.listeners[cmd] ??= []).push(handler);
  }
  emit(cmd: Command) {
    this.listeners[cmd]?.forEach(fn => fn());
  }
}