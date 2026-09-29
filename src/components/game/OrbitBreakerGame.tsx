"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ArrowUp, Crosshair, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { readBestScore, saveBestScore, subscribeBestScore } from "./bestScore";
import { MAX_LIVES, OrbitBreaker, type Controls, type GameSnapshot } from "./engine";

const INITIAL_SNAPSHOT: GameSnapshot = { status: "idle", score: 0, lives: MAX_LIVES, level: 1 };

const KEY_CONTROLS: Record<string, keyof Controls> = {
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  ArrowUp: "thrust",
  KeyW: "thrust",
  Space: "fire",
};

// Touch-first layouts get on-screen buttons; a mouse-and-keyboard desktop gets a key hint instead.
const DESKTOP_ONLY = "[@media(hover:hover)_and_(pointer:fine)_and_(min-width:768px)]";

type SetControl = (control: keyof Controls, value: boolean) => void;

interface TouchButtonProps {
  control: keyof Controls;
  label: string;
  caption: string;
  icon: ReactNode;
  onControl: SetControl;
  primary?: boolean;
}

function TouchButton({ control, label, caption, icon, onControl, primary }: TouchButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex h-[4.5rem] min-w-0 flex-1 touch-none flex-col items-center justify-center gap-1 rounded-xl border bg-surface-raised text-[0.6875rem] font-medium select-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] active:bg-accent active:text-accent-fg ${
        primary ? "border-accent/60 text-accent" : "border-line-strong text-fg"
      }`}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        onControl(control, true);
      }}
      onPointerUp={() => onControl(control, false)}
      onPointerCancel={() => onControl(control, false)}
      onLostPointerCapture={() => onControl(control, false)}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.repeat) onControl(control, true);
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter") onControl(control, false);
      }}
      onContextMenu={(event) => event.preventDefault()}
    >
      {icon}
      <span aria-hidden="true">{caption}</span>
    </button>
  );
}

function LifeIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="-12 -17 24 31" className="h-4 w-3.5" aria-hidden="true">
      <path
        d="M0 -15 L10 11 L0 6 L-10 11Z"
        fill={filled ? "var(--accent)" : "none"}
        stroke={filled ? "var(--accent)" : "var(--line-strong)"}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Overlay({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-y-auto bg-bg/85 p-4 text-center sm:gap-4 sm:p-6">
      {children}
    </div>
  );
}

export function OrbitBreakerGame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const restartRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<OrbitBreaker | null>(null);

  const [snapshot, setSnapshot] = useState<GameSnapshot>(INITIAL_SNAPSHOT);
  const best = useSyncExternalStore(subscribeBestScore, readBestScore, () => 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const root = rootRef.current;
    if (!canvas || !stage || !root) return;

    const game = new OrbitBreaker(canvas, (next) => {
      setSnapshot(next);
      if (next.status === "over") saveBestScore(next.score);
    });
    gameRef.current = game;

    const fit = () => {
      const rect = stage.getBoundingClientRect();
      game.resize(rect.width, rect.height, window.devicePixelRatio || 1);
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(stage);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) game.pause();
      },
      { threshold: 0.25 },
    );
    intersectionObserver.observe(root);

    const onVisibilityChange = () => {
      if (document.hidden) game.pause();
    };
    const onWindowBlur = () => {
      game.releaseControls();
      game.pause();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => game.setReducedMotion(motionQuery.matches);
    onMotionChange();
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      motionQuery.removeEventListener("change", onMotionChange);
      game.destroy();
      gameRef.current = null;
    };
  }, []);

  const { status } = snapshot;

  useEffect(() => {
    if (status === "over") restartRef.current?.focus();
  }, [status]);

  const setControl = useCallback<SetControl>((control, value) => {
    gameRef.current?.setControl(control, value);
  }, []);

  const play = () => {
    gameRef.current?.start();
    rootRef.current?.focus();
  };

  const resume = () => {
    gameRef.current?.resume();
    rootRef.current?.focus();
  };

  const togglePause = () => {
    const game = gameRef.current;
    if (!game) return;
    if (game.getStatus() === "playing") game.pause();
    else game.resume();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const game = gameRef.current;
    if (!game || event.ctrlKey || event.altKey || event.metaKey) return;
    const current = game.getStatus();

    if (event.code === "KeyP" && (current === "playing" || current === "paused")) {
      event.preventDefault();
      if (!event.repeat) togglePause();
      return;
    }

    if (current !== "playing") return;
    const control = KEY_CONTROLS[event.code];
    if (!control) return;
    event.preventDefault();
    game.setControl(control, true);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    const game = gameRef.current;
    const control = KEY_CONTROLS[event.code];
    if (!game || !control) return;
    game.setControl(control, false);
    // Stops a focused button from also "clicking" when Space is released mid-game.
    if (game.getStatus() === "playing") event.preventDefault();
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && event.currentTarget.contains(next)) return;
    const game = gameRef.current;
    game?.releaseControls();
    if (next) game?.pause();
  };

  const announcement =
    status === "over"
      ? `Game over. Final score ${snapshot.score}.`
      : status === "paused"
        ? "Game paused."
        : "";

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Orbit Breaker game"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      className="rounded-2xl border border-line bg-surface p-2 sm:p-4"
    >
      <div className="flex items-center justify-between gap-3 pb-2 font-mono text-xs tracking-[0.08em] text-subtle uppercase sm:pb-3">
        <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-5">
          <div>
            <dt className="inline">Score </dt>
            <dd className="inline text-fg tabular-nums">{snapshot.score}</dd>
          </div>
          <div>
            <dt className="inline">Best </dt>
            <dd className="inline text-fg tabular-nums">{best}</dd>
          </div>
          <div>
            <dt className="inline">Wave </dt>
            <dd className="inline text-fg tabular-nums">{snapshot.level}</dd>
          </div>
        </dl>

        <div className="flex items-center gap-3">
          <span
            role="img"
            aria-label={`Lives: ${snapshot.lives} of ${MAX_LIVES}`}
            className="flex items-center gap-1"
          >
            {Array.from({ length: MAX_LIVES }, (_, index) => (
              <LifeIcon key={index} filled={index < snapshot.lives} />
            ))}
          </span>
          <button
            type="button"
            className="btn btn-secondary min-h-11 gap-1.5 px-3 text-xs"
            disabled={status !== "playing" && status !== "paused"}
            onClick={togglePause}
          >
            {status === "paused" ? (
              <Play className="size-3.5" aria-hidden="true" />
            ) : (
              <Pause className="size-3.5" aria-hidden="true" />
            )}
            {status === "paused" ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative aspect-square max-h-[75svh] w-full overflow-hidden rounded-xl border border-line bg-[#0d0d0f] md:aspect-[4/3]"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Orbit Breaker game screen"
          className="absolute inset-0 size-full"
        />

        {status === "idle" ? (
          <Overlay>
            <h3 className="type-subtitle">Orbit Breaker</h3>
            <ul className="max-w-md space-y-1.5 text-sm text-muted">
              <li>Shoot the asteroids and dodge the rest. You have three lives.</li>
              <li>Keyboard: &larr; &rarr; or A / D to turn, &uarr; or W to thrust, Space to shoot.</li>
              <li>Touch: use the buttons under the screen.</li>
            </ul>
            <button type="button" className="btn btn-primary btn-lg" onClick={play}>
              <Play className="size-4" aria-hidden="true" />
              Play
            </button>
          </Overlay>
        ) : null}

        {status === "paused" ? (
          <Overlay>
            <h3 className="type-subtitle">Paused</h3>
            <button type="button" className="btn btn-primary btn-lg" onClick={resume}>
              <Play className="size-4" aria-hidden="true" />
              Resume
            </button>
          </Overlay>
        ) : null}

        {status === "over" ? (
          <Overlay>
            <h3 className="type-subtitle">Game over</h3>
            <p className="text-lg tabular-nums">
              Score <span className="font-semibold text-accent">{snapshot.score}</span>
            </p>
            {snapshot.score > 0 && snapshot.score === best ? (
              <p className="font-mono text-xs tracking-[0.08em] text-muted uppercase">New best score</p>
            ) : null}
            <button ref={restartRef} type="button" className="btn btn-primary btn-lg" onClick={play}>
              <Play className="size-4" aria-hidden="true" />
              Play Again
            </button>
          </Overlay>
        ) : null}
      </div>

      <div className={`mt-2 flex items-center gap-4 sm:mt-3 ${DESKTOP_ONLY}:hidden`}>
        <div className="flex flex-1 gap-2">
          <TouchButton
            control="left"
            label="Rotate left"
            caption="Left"
            icon={<RotateCcw className="size-6" aria-hidden="true" />}
            onControl={setControl}
          />
          <TouchButton
            control="right"
            label="Rotate right"
            caption="Right"
            icon={<RotateCw className="size-6" aria-hidden="true" />}
            onControl={setControl}
          />
        </div>
        <div className="flex flex-1 gap-2">
          <TouchButton
            control="thrust"
            label="Thrust"
            caption="Thrust"
            icon={<ArrowUp className="size-6" aria-hidden="true" />}
            onControl={setControl}
          />
          <TouchButton
            control="fire"
            label="Shoot"
            caption="Shoot"
            icon={<Crosshair className="size-6" aria-hidden="true" />}
            onControl={setControl}
            primary
          />
        </div>
      </div>

      <p className={`mt-3 hidden text-center font-mono text-xs text-subtle ${DESKTOP_ONLY}:block`}>
        &larr; &rarr; / A D rotate &middot; &uarr; / W thrust &middot; Space shoot &middot; P pause
      </p>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
