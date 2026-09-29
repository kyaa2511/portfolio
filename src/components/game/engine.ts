export type GameStatus = "idle" | "playing" | "paused" | "over";

export interface GameSnapshot {
  status: GameStatus;
  score: number;
  lives: number;
  level: number;
}

export interface Controls {
  left: boolean;
  right: boolean;
  thrust: boolean;
  fire: boolean;
}

export const MAX_LIVES = 3;

type Size = 1 | 2 | 3;

interface Ship {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  alive: boolean;
  invuln: number;
  respawn: number;
  fireCooldown: number;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface Asteroid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: Size;
  radius: number;
  angle: number;
  spin: number;
  shape: number[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

// The world is always 480 units tall; its width follows the canvas aspect ratio.
const WORLD_H = 480;
const TAU = Math.PI * 2;

const SHIP_RADIUS = 10;
const TURN_SPEED = 4.4;
const THRUST = 250;
const DRAG = 0.55;
const MAX_SPEED = 300;
const BULLET_SPEED = 520;
const BULLET_LIFE = 0.85;
const BULLET_RADIUS = 2.2;
const FIRE_INTERVAL = 0.2;
const MAX_BULLETS = 5;
const START_INVULN = 1.5;
const RESPAWN_INVULN = 2.4;
const RESPAWN_DELAY = 1.1;
const GAME_OVER_DELAY = 1;
const WAVE_DELAY = 1.3;
const MAX_STEP = 1 / 60;
const MAX_FRAME = 0.1;
const MAX_PARTICLES = 140;

const COLORS = {
  bg: "#0d0d0f",
  fg: "#efece5",
  muted: "#a5a39b",
  accent: "#ff7a3d",
  accentSoft: "#ff9160",
  hull: "#17171a",
} as const;

const ASTEROID_SPECS: Record<Size, { radius: number; points: number; speed: readonly [number, number] }> = {
  3: { radius: 42, points: 20, speed: [26, 50] },
  2: { radius: 25, points: 50, speed: [44, 80] },
  1: { radius: 14, points: 100, speed: [64, 112] },
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const wrap = (value: number, max: number) => ((value % max) + max) % max;

function wrappedDelta(a: number, b: number, size: number): number {
  let delta = a - b;
  if (delta > size / 2) delta -= size;
  else if (delta < -size / 2) delta += size;
  return delta;
}

function createShip(x: number, y: number): Ship {
  return { x, y, vx: 0, vy: 0, angle: 0, alive: true, invuln: 0, respawn: 0, fireCooldown: 0 };
}

function createAsteroid(x: number, y: number, size: Size, vx: number, vy: number): Asteroid {
  const vertices = 9 + Math.floor(rand(0, 4));
  return {
    x,
    y,
    vx,
    vy,
    size,
    radius: ASTEROID_SPECS[size].radius,
    angle: rand(0, TAU),
    spin: rand(-0.8, 0.8),
    shape: Array.from({ length: vertices }, () => rand(0.78, 1.14)),
  };
}

export class OrbitBreaker {
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly stars: { x: number; y: number; size: number; fill: string }[];

  private w = WORLD_H * (4 / 3);
  private readonly h = WORLD_H;
  private scale = 1;

  private status: GameStatus = "idle";
  private score = 0;
  private lives = MAX_LIVES;
  private level = 1;

  private ship: Ship;
  private bullets: Bullet[] = [];
  private asteroids: Asteroid[] = [];
  private particles: Particle[] = [];
  private controls: Controls = { left: false, right: false, thrust: false, fire: false };

  private shake = 0;
  private waveTimer: number | null = null;
  private reduceMotion = false;
  private destroyed = false;
  private raf = 0;
  private last = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly onChange: (snapshot: GameSnapshot) => void,
  ) {
    this.ctx = canvas.getContext("2d");
    this.ship = createShip(this.w / 2, this.h / 2);
    this.stars = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: rand(0.6, 1.4),
      fill: `rgba(239, 236, 229, ${rand(0.12, 0.45).toFixed(2)})`,
    }));
  }

  getStatus(): GameStatus {
    return this.status;
  }

  setReducedMotion(value: boolean): void {
    this.reduceMotion = value;
    if (value) {
      this.particles = [];
      this.shake = 0;
    }
  }

  setControl(control: keyof Controls, value: boolean): void {
    this.controls[control] = value;
  }

  releaseControls(): void {
    this.controls = { left: false, right: false, thrust: false, fire: false };
  }

  resize(cssWidth: number, cssHeight: number, dpr: number): void {
    if (this.destroyed || cssWidth <= 0 || cssHeight <= 0) return;
    this.canvas.width = Math.round(cssWidth * dpr);
    this.canvas.height = Math.round(cssHeight * dpr);
    this.scale = this.canvas.height / this.h;
    this.w = this.canvas.width / this.scale;
    if (this.status === "idle") this.spawnAttractScene();
    this.draw();
  }

  start(): void {
    if (this.destroyed) return;
    this.score = 0;
    this.lives = MAX_LIVES;
    this.level = 1;
    this.bullets = [];
    this.asteroids = [];
    this.particles = [];
    this.shake = 0;
    this.waveTimer = null;
    this.releaseControls();
    this.ship = createShip(this.w / 2, this.h / 2);
    this.ship.invuln = START_INVULN;
    this.spawnWave();
    this.status = "playing";
    this.emit();
    this.beginLoop();
  }

  pause(): void {
    if (this.status !== "playing") return;
    cancelAnimationFrame(this.raf);
    this.status = "paused";
    this.shake = 0;
    this.releaseControls();
    this.draw();
    this.emit();
  }

  resume(): void {
    if (this.destroyed || this.status !== "paused") return;
    this.status = "playing";
    this.emit();
    this.beginLoop();
  }

  destroy(): void {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
  }

  private emit(): void {
    this.onChange({ status: this.status, score: this.score, lives: this.lives, level: this.level });
  }

  private beginLoop(): void {
    cancelAnimationFrame(this.raf);
    this.last = 0;
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (time: number): void => {
    if (this.status !== "playing" || this.destroyed) return;
    const dt = this.last === 0 ? 0 : Math.min((time - this.last) / 1000, MAX_FRAME);
    this.last = time;
    this.advance(dt);
    this.draw();
    if (this.status === "playing") this.raf = requestAnimationFrame(this.frame);
  };

  // Simulation runs in small time slices so speed is identical at any frame
  // rate and fast bullets cannot skip over small asteroids.
  private advance(dt: number): void {
    if (dt <= 0) return;
    const steps = Math.ceil(dt / MAX_STEP);
    const slice = dt / steps;
    for (let i = 0; i < steps && this.status === "playing"; i++) this.update(slice);
  }

  private update(dt: number): void {
    this.updateShip(dt);

    for (const bullet of this.bullets) {
      bullet.x = wrap(bullet.x + bullet.vx * dt, this.w);
      bullet.y = wrap(bullet.y + bullet.vy * dt, this.h);
      bullet.life -= dt;
    }
    this.bullets = this.bullets.filter((bullet) => bullet.life > 0);

    for (const asteroid of this.asteroids) {
      asteroid.x = wrap(asteroid.x + asteroid.vx * dt, this.w);
      asteroid.y = wrap(asteroid.y + asteroid.vy * dt, this.h);
      asteroid.angle += asteroid.spin * dt;
    }

    if (this.particles.length > 0) {
      const drag = Math.exp(-2.2 * dt);
      for (const particle of this.particles) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vx *= drag;
        particle.vy *= drag;
        particle.life -= dt;
      }
      this.particles = this.particles.filter((particle) => particle.life > 0);
    }

    this.resolveBulletHits();
    this.resolveShipHit();
    this.updateWave(dt);
    this.shake = Math.max(0, this.shake - dt * 30);
  }

  private updateShip(dt: number): void {
    const ship = this.ship;

    if (!ship.alive) {
      ship.respawn -= dt;
      if (ship.respawn <= 0) {
        if (this.lives > 0) this.respawnShip();
        else this.finish();
      }
      return;
    }

    const c = this.controls;
    ship.angle += ((c.right ? 1 : 0) - (c.left ? 1 : 0)) * TURN_SPEED * dt;

    if (c.thrust) {
      ship.vx += Math.sin(ship.angle) * THRUST * dt;
      ship.vy -= Math.cos(ship.angle) * THRUST * dt;
    }

    const drag = Math.exp(-DRAG * dt);
    ship.vx *= drag;
    ship.vy *= drag;
    const speed = Math.hypot(ship.vx, ship.vy);
    if (speed > MAX_SPEED) {
      ship.vx *= MAX_SPEED / speed;
      ship.vy *= MAX_SPEED / speed;
    }

    ship.x = wrap(ship.x + ship.vx * dt, this.w);
    ship.y = wrap(ship.y + ship.vy * dt, this.h);
    ship.invuln = Math.max(0, ship.invuln - dt);
    ship.fireCooldown = Math.max(0, ship.fireCooldown - dt);

    if (c.fire && ship.fireCooldown === 0 && this.bullets.length < MAX_BULLETS) {
      const dx = Math.sin(ship.angle);
      const dy = -Math.cos(ship.angle);
      this.bullets.push({
        x: wrap(ship.x + dx * 15, this.w),
        y: wrap(ship.y + dy * 15, this.h),
        vx: dx * BULLET_SPEED + ship.vx * 0.4,
        vy: dy * BULLET_SPEED + ship.vy * 0.4,
        life: BULLET_LIFE,
      });
      ship.fireCooldown = FIRE_INTERVAL;
    }
  }

  private overlaps(ax: number, ay: number, ar: number, bx: number, by: number, br: number): boolean {
    const dx = wrappedDelta(ax, bx, this.w);
    const dy = wrappedDelta(ay, by, this.h);
    const reach = ar + br;
    return dx * dx + dy * dy <= reach * reach;
  }

  private resolveBulletHits(): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      for (let j = this.asteroids.length - 1; j >= 0; j--) {
        const asteroid = this.asteroids[j];
        if (this.overlaps(bullet.x, bullet.y, BULLET_RADIUS, asteroid.x, asteroid.y, asteroid.radius)) {
          this.bullets.splice(i, 1);
          this.asteroids.splice(j, 1);
          this.breakAsteroid(asteroid);
          break;
        }
      }
    }
  }

  private breakAsteroid(asteroid: Asteroid): void {
    this.score += ASTEROID_SPECS[asteroid.size].points;
    this.burst(asteroid.x, asteroid.y, asteroid.size * 3 + 2, COLORS.muted);
    this.emit();

    if (asteroid.size === 1) return;

    const size = (asteroid.size - 1) as Size;
    const heading = Math.atan2(asteroid.vy, asteroid.vx);
    const [minSpeed, maxSpeed] = ASTEROID_SPECS[size].speed;
    for (const side of [-1, 1]) {
      const direction = heading + side * rand(0.5, 1.1);
      const speed = rand(minSpeed, maxSpeed) * this.speedMultiplier();
      this.asteroids.push(
        createAsteroid(asteroid.x, asteroid.y, size, Math.cos(direction) * speed, Math.sin(direction) * speed),
      );
    }
  }

  private resolveShipHit(): void {
    const ship = this.ship;
    if (!ship.alive || ship.invuln > 0) return;
    for (const asteroid of this.asteroids) {
      if (this.overlaps(ship.x, ship.y, SHIP_RADIUS, asteroid.x, asteroid.y, asteroid.radius)) {
        this.destroyShip();
        return;
      }
    }
  }

  private destroyShip(): void {
    const ship = this.ship;
    ship.alive = false;
    this.lives -= 1;
    ship.respawn = this.lives > 0 ? RESPAWN_DELAY : GAME_OVER_DELAY;
    this.burst(ship.x, ship.y, 18, COLORS.accent);
    if (!this.reduceMotion) this.shake = 8;
    this.emit();
  }

  private respawnShip(): void {
    this.ship = createShip(this.w / 2, this.h / 2);
    this.ship.invuln = RESPAWN_INVULN;
  }

  private finish(): void {
    cancelAnimationFrame(this.raf);
    this.status = "over";
    this.shake = 0;
    this.releaseControls();
    this.draw();
    this.emit();
  }

  private updateWave(dt: number): void {
    if (this.asteroids.length > 0) {
      this.waveTimer = null;
      return;
    }
    this.waveTimer = (this.waveTimer ?? WAVE_DELAY) - dt;
    if (this.waveTimer <= 0) {
      this.waveTimer = null;
      this.level += 1;
      this.spawnWave();
      this.emit();
    }
  }

  // Each wave adds asteroids and makes them faster, up to a cap.
  private speedMultiplier(): number {
    return 1 + Math.min(this.level - 1, 10) * 0.09;
  }

  private spawnWave(): void {
    const count = Math.min(2 + this.level, 8);
    const [minSpeed, maxSpeed] = ASTEROID_SPECS[3].speed;
    for (let i = 0; i < count; i++) {
      let x = 0;
      let y = 0;
      for (let attempt = 0; attempt < 12; attempt++) {
        x = rand(0, this.w);
        y = rand(0, this.h);
        const dx = wrappedDelta(x, this.ship.x, this.w);
        const dy = wrappedDelta(y, this.ship.y, this.h);
        if (Math.hypot(dx, dy) > 160) break;
      }
      const direction = rand(0, TAU);
      const speed = rand(minSpeed, maxSpeed) * this.speedMultiplier();
      this.asteroids.push(createAsteroid(x, y, 3, Math.cos(direction) * speed, Math.sin(direction) * speed));
    }
  }

  private spawnAttractScene(): void {
    this.ship = createShip(this.w / 2, this.h / 2);
    this.asteroids = ([3, 3, 2, 2, 1, 1] as const).map((size) =>
      createAsteroid(rand(0, this.w), rand(0, this.h), size, 0, 0),
    );
  }

  private burst(x: number, y: number, count: number, color: string): void {
    if (this.reduceMotion) return;
    for (let i = 0; i < count && this.particles.length < MAX_PARTICLES; i++) {
      const direction = rand(0, TAU);
      const speed = rand(30, 130);
      const life = rand(0.35, 0.7);
      this.particles.push({
        x,
        y,
        vx: Math.cos(direction) * speed,
        vy: Math.sin(direction) * speed,
        life,
        maxLife: life,
        color,
      });
    }
  }

  private draw(): void {
    const ctx = this.ctx;
    if (!ctx || this.destroyed) return;
    const { canvas, scale } = this;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const shaking = this.shake > 0 && !this.reduceMotion;
    const offsetX = shaking ? (Math.random() - 0.5) * 2 * this.shake * scale : 0;
    const offsetY = shaking ? (Math.random() - 0.5) * 2 * this.shake * scale : 0;
    ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (const star of this.stars) {
      ctx.fillStyle = star.fill;
      ctx.fillRect(star.x * this.w, star.y * this.h, star.size, star.size);
    }

    for (const asteroid of this.asteroids) {
      this.drawWrapped(asteroid.x, asteroid.y, asteroid.radius * 1.15, (x, y) =>
        this.drawAsteroid(ctx, asteroid, x, y),
      );
    }

    ctx.fillStyle = COLORS.accentSoft;
    for (const bullet of this.bullets) {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, BULLET_RADIUS, 0, TAU);
      ctx.fill();
    }

    if (this.ship.alive) {
      this.drawWrapped(this.ship.x, this.ship.y, 22, (x, y) => this.drawShip(ctx, x, y));
    }

    for (const particle of this.particles) {
      ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x - 1, particle.y - 1, 2, 2);
    }
    ctx.globalAlpha = 1;
  }

  private drawWrapped(x: number, y: number, radius: number, paint: (x: number, y: number) => void): void {
    const xs = [x];
    if (x < radius) xs.push(x + this.w);
    else if (x > this.w - radius) xs.push(x - this.w);
    const ys = [y];
    if (y < radius) ys.push(y + this.h);
    else if (y > this.h - radius) ys.push(y - this.h);
    for (const px of xs) for (const py of ys) paint(px, py);
  }

  private drawAsteroid(ctx: CanvasRenderingContext2D, asteroid: Asteroid, x: number, y: number): void {
    const { shape, radius } = asteroid;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(asteroid.angle);
    ctx.beginPath();
    shape.forEach((factor, index) => {
      const angle = (index / shape.length) * TAU;
      const px = Math.cos(angle) * radius * factor;
      const py = Math.sin(angle) * radius * factor;
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(239, 236, 229, 0.04)";
    ctx.fill();
    ctx.strokeStyle = COLORS.muted;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  private drawShip(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const ship = this.ship;
    const invulnerable = ship.invuln > 0;
    // Steady dim ship under reduced motion; otherwise a gentle blink.
    const alpha = invulnerable
      ? this.reduceMotion
        ? 0.6
        : Math.floor(ship.invuln * 10) % 2 === 0
          ? 0.35
          : 1
      : 1;

    ctx.save();
    ctx.translate(x, y);

    if (invulnerable) {
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = COLORS.accent;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.globalAlpha = alpha;
    ctx.rotate(ship.angle);

    if (this.controls.thrust) {
      const length = this.reduceMotion ? 10 : 8 + Math.random() * 7;
      ctx.fillStyle = COLORS.accent;
      ctx.beginPath();
      ctx.moveTo(-4, 7);
      ctx.lineTo(0, 7 + length);
      ctx.lineTo(4, 7);
      ctx.closePath();
      ctx.fill();
    }

    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(10, 11);
    ctx.lineTo(0, 6);
    ctx.lineTo(-10, 11);
    ctx.closePath();
    ctx.fillStyle = COLORS.hull;
    ctx.fill();
    ctx.strokeStyle = COLORS.accent;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(0, 2);
    ctx.strokeStyle = COLORS.fg;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
  }
}
