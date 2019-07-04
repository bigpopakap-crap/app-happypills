type FuseAction = (...args: any[]) => void;
type FuseDelay = number;
export interface FuseHandle {
  id: number;
  action: FuseAction;
}

export function setFuse(action: FuseAction, delay: FuseDelay): FuseHandle {
  return {
    id: window.setTimeout(action, delay),
    action
  };
}

export function cancelFuse(fuseHandle?: FuseHandle | null): void {
  if (fuseHandle) {
    window.clearTimeout(fuseHandle.id);
  }
}

export function fastForwardFuse(fuseHandle?: FuseHandle | null): void {
  if (fuseHandle) {
    cancelFuse(fuseHandle);
    fuseHandle.action();
  }
}
