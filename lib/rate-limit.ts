interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  interval: number; // milliseconds
  maxRequests: number;
}

export function createRateLimiter(config: RateLimitConfig) {
  return function rateLimit(identifier: string): boolean {
    const now = Date.now();
    const key = `rate-limit:${identifier}`;

    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + config.interval,
      };
      return true;
    }

    const record = store[key];

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + config.interval;
      return true;
    }

    if (record.count < config.maxRequests) {
      record.count++;
      return true;
    }

    return false;
  };
}

// Specific limiters
export const chatRateLimiter = createRateLimiter({
  interval: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 messages per minute per user
});

export const apiRateLimiter = createRateLimiter({
  interval: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute per IP
});

export function getRemainingTime(identifier: string): number {
  const key = `rate-limit:${identifier}`;
  const record = store[key];

  if (!record) {
    return 0;
  }

  const remaining = record.resetTime - Date.now();
  return remaining > 0 ? remaining : 0;
}
