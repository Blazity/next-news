type Func<A, B> = (a: A) => B | Promise<B>

export async function pipe<A>(a: A): Promise<A>
export async function pipe<A, B>(a: A, ab: Func<A, B>): Promise<B>
export async function pipe<A, B, C>(a: A, ab: Func<A, B>, bc: Func<B, C>): Promise<C>
export async function pipe<A, B, C, D>(a: A, ab: Func<A, B>, bc: Func<B, C>, cd: Func<C, D>): Promise<D>

export async function pipe(...args: any[]): Promise<any> {
  return await args.slice(1).reduce(async (accPromise, fn) => {
    const acc = await accPromise
    return fn(acc)
  }, Promise.resolve(args[0]))
}
