/* tslint:disable */
/* eslint-disable */
/**
* @param {any} val
* @returns {any}
*/
export function calc_swap_exact_amount_in(val: any): any;
/**
* @param {any} val
* @returns {any}
*/
export function calc_swap_exact_amount_out(val: any): any;
/**
* @param {any} val
* @returns {any}
*/
export function calc_spot_price(val: any): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly calc_swap_exact_amount_in: (a: number, b: number) => void;
  readonly calc_swap_exact_amount_out: (a: number, b: number) => void;
  readonly calc_spot_price: (a: number, b: number) => void;
  readonly allocate: (a: number) => number;
  readonly deallocate: (a: number) => void;
  readonly requires_stargate: () => void;
  readonly requires_iterator: () => void;
  readonly interface_version_8: () => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
