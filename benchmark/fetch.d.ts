export type FetchType = (...args: Parameters<typeof fetch>)=> Promise<any>
