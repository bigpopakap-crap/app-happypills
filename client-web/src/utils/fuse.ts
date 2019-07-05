type FuseAction = (...args: any[]) => void;
type FuseDelay = number;

/**
 * Use this handle to refer to a specific fuse (ex. when
 * canceling it).
 *
 * A "fuse" is a wrapper around `setTimeout` callbacks, with the
 * added ability to cut short the delay time and run the action immediately.
 */
export interface FuseHandle {
  id: number;
  action: FuseAction;
}

/**
 * Like `setTimeout`, but returns a fuse instead.
 * @param action {FuseAction} the function to execute after the delay
 * @param delay {FuseDelay} the amount of time to wait before executing the
 *                          action, in milliseconds.
 * @returns {FuseHandle} a handle to refer to this fuse (ex. for canceling it)
 */
export function setFuse(action: FuseAction, delay: FuseDelay): FuseHandle {
  return {
    id: window.setTimeout(action, delay),
    action
  };
}

/**
 * Cancels a fuse and does not execute the action.
 *
 * Note that the action may have already executed. It is up to the caller
 * to manage this timing.
 *
 * @param fuseHandle {FuseHandle} the fuse to cancel
 */
export function cancelFuse(fuseHandle?: FuseHandle | null): void {
  if (fuseHandle) {
    window.clearTimeout(fuseHandle.id);
  }
}

/**
 * Executes the fuse immediately. It will run when this function is called, and
 * will not run after its delay time.
 *
 * Note that the action may have already executed. It is up to the caller
 * to manage this timing.
 *
 * @param fuseHandle
 */
export function fastForwardFuse(fuseHandle?: FuseHandle | null): void {
  if (fuseHandle) {
    cancelFuse(fuseHandle);
    fuseHandle.action();
  }
}
