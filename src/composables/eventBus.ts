type EventName =
  | 'API:401'
  | 'API:403'
  | 'API:404'
  | 'API:500'
  | 'API:ECONNABORTED'
  | 'API:ERR_NETWORK'
  | 'API:UNKNOWN'

class EventBus {
  events: Map<EventName, Set<(...args: any[]) => void>>
  constructor() {
    this.events = new Map()
  }
  on(eventName: EventName, callback: (...args: any[]) => void) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set())
    }
    this.events.get(eventName)?.add(callback)
  }
  once(eventName: EventName, callback: (...args: any[]) => void) {
    const onceCallback = (...args: any[]) => {
      this.off(eventName, onceCallback)
      callback(...args)
    }
    this.on(eventName, onceCallback)
  }
  off(eventName: EventName, callback: (...args: any[]) => void) {
    if (!this.events.has(eventName)) {
      return
    }
    this.events.get(eventName)?.delete(callback)
  }
  emit(eventName: EventName, ...args: any[]) {
    if (!this.events.has(eventName)) {
      return
    }
    this.events.get(eventName)?.forEach((callback) => {
      callback(...args)
    })
  }
}
// 返回proxy的单例类
function singleton<T extends new (...args: any[]) => any>(cls: T) {
  let instance: InstanceType<T>
  const proxy = new Proxy(cls, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args)
      }
      return instance
    },
  })
  proxy.prototype.constructor = proxy
  return proxy
}

const SingletonEventBus = singleton(EventBus)

export const useEventBus = () => new SingletonEventBus()
