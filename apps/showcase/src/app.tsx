import {
  Button,
  Collapsible,
  IconButton,
  LinkButton,
  Menu,
  ScrollArea,
  Tooltip,
  TooltipProvider,
} from "@astilba/ui";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";
const COPY_RESET_DELAY = 1400;

const ControlArrow = () => (
  <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} />
);

export const App = () => {
  const [copied, setCopied] = useState(false);
  const [menuAction, setMenuAction] = useState("No action selected");
  const [theme, setTheme] = useState<Theme>("dark");
  const copyResetTimer = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(
    () => () => {
      if (copyResetTimer.current !== null) {
        window.clearTimeout(copyResetTimer.current);
      }
    },
    []
  );

  const isDark = theme === "dark";

  return (
    <TooltipProvider>
      <a className="skip-link" href="#specimens">
        Skip to specimens
      </a>

      <header className="showcase-header">
        <a className="showcase-brand" href="/" aria-label="Astilba Interface">
          <span>Astilba</span>
          <span aria-hidden="true">/</span>
          <span>Interface</span>
        </a>

        <Tooltip label={isDark ? "Use light theme" : "Use dark theme"}>
          <IconButton
            label={isDark ? "Use light theme" : "Use dark theme"}
            onClick={() => {
              setTheme(isDark ? "light" : "dark");
            }}
          >
            {isDark ? (
              <Sun aria-hidden="true" size={16} strokeWidth={1.5} />
            ) : (
              <Moon aria-hidden="true" size={16} strokeWidth={1.5} />
            )}
          </IconButton>
        </Tooltip>
      </header>

      <main id="specimens" tabIndex={-1}>
        <section className="showcase-intro" aria-labelledby="showcase-title">
          <p className="showcase-kicker">Foundation / 01</p>
          <h1 id="showcase-title">Controls with less noise.</h1>
          <p>
            A compact shared layer for Astilba products. Native semantics,
            visible focus, static styles, and just enough motion to explain
            state.
          </p>
        </section>

        <section className="specimen-section" aria-labelledby="actions-title">
          <div className="section-heading">
            <div>
              <p>01</p>
              <h2 id="actions-title">Actions</h2>
            </div>
            <code>Button · LinkButton</code>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Hierarchy</h3>
              <p>Three appearances, one quiet interaction language.</p>
            </div>
            <div className="control-line">
              <Button appearance="primary">
                Continue
                <ControlArrow />
              </Button>
              <Button appearance="outline">Review</Button>
              <Button>Dismiss</Button>
            </div>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Navigation</h3>
              <p>
                Links keep anchor semantics even when they look like controls.
              </p>
            </div>
            <div className="control-line">
              <LinkButton appearance="primary" href="#tokens" size="large">
                Read the contract
                <ControlArrow />
              </LinkButton>
              <LinkButton appearance="outline" href="https://astilba.com">
                Astilba.com
              </LinkButton>
            </div>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Unavailable</h3>
              <p>Disabled controls remain legible without suggesting action.</p>
            </div>
            <div className="control-line">
              <Button appearance="primary" disabled>
                Not available
              </Button>
              <Button disabled>Not available</Button>
              <Button appearance="outline" disabled>
                Not available
              </Button>
            </div>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Scale</h3>
              <p>
                Large controls keep the same hierarchy with a roomier
                interaction target.
              </p>
            </div>
            <div className="control-line">
              <Button appearance="primary" size="large">
                Continue large
                <ControlArrow />
              </Button>
              <IconButton label="Large icon control" size="large">
                <Sun aria-hidden="true" size={18} strokeWidth={1.5} />
              </IconButton>
            </div>
          </div>
        </section>

        <section className="specimen-section" aria-labelledby="icons-title">
          <div className="section-heading">
            <div>
              <p>02</p>
              <h2 id="icons-title">Icon controls</h2>
            </div>
            <code>IconButton · Tooltip</code>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Named, not labelled</h3>
              <p>
                The visible icon stays small; its accessible name does the
                semantic work.
              </p>
            </div>
            <div className="control-line">
              <Tooltip
                active={copied}
                activeLabel="Copied!"
                label="Copy"
                onActiveDismiss={() => {
                  setCopied(false);
                }}
              >
                <IconButton
                  label="Copy"
                  onClick={() => {
                    setCopied(true);
                    if (copyResetTimer.current !== null) {
                      window.clearTimeout(copyResetTimer.current);
                    }
                    copyResetTimer.current = window.setTimeout(() => {
                      setCopied(false);
                    }, COPY_RESET_DELAY);
                  }}
                >
                  {copied ? (
                    <Check aria-hidden="true" size={16} strokeWidth={1.5} />
                  ) : (
                    <Copy aria-hidden="true" size={16} strokeWidth={1.5} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip label={isDark ? "Use light theme" : "Use dark theme"}>
                <IconButton
                  label={isDark ? "Use light theme" : "Use dark theme"}
                  onClick={() => {
                    setTheme(isDark ? "light" : "dark");
                  }}
                >
                  {isDark ? (
                    <Sun aria-hidden="true" size={16} strokeWidth={1.5} />
                  ) : (
                    <Moon aria-hidden="true" size={16} strokeWidth={1.5} />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </section>

        <section className="specimen-section" aria-labelledby="menus-title">
          <div className="section-heading">
            <div>
              <p>03</p>
              <h2 id="menus-title">Menus</h2>
            </div>
            <code>Menu</code>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Actions and navigation</h3>
              <p>
                Pointer hover stays quiet while keyboard movement receives an
                unmistakable focus signal.
              </p>
            </div>
            <div>
              <div className="control-line">
                <Menu.Root>
                  <Menu.Trigger className="showcase-menu-trigger">
                    More actions
                    <ChevronDown
                      aria-hidden="true"
                      size={14}
                      strokeWidth={1.5}
                    />
                  </Menu.Trigger>
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup className="showcase-menu-popup">
                        <Menu.Item
                          label="Update project"
                          onClick={() => {
                            setMenuAction("Project updated");
                          }}
                        >
                          <Menu.ItemLabel>Update project</Menu.ItemLabel>
                        </Menu.Item>
                        <Menu.Item
                          closeOnClick={false}
                          label="Keep menu open"
                          onClick={() => {
                            setMenuAction("Menu kept open");
                          }}
                        >
                          <Menu.ItemLabel>Keep menu open</Menu.ItemLabel>
                        </Menu.Item>
                        <Menu.Item disabled label="Archived action">
                          <Menu.ItemLabel>Archived action</Menu.ItemLabel>
                        </Menu.Item>
                        <Menu.LinkItem href="#tokens" label="View tokens">
                          <Menu.ItemLabel>View tokens</Menu.ItemLabel>
                          <Menu.ItemTrailing aria-hidden="true">
                            <ExternalLink size={12} strokeWidth={1.5} />
                          </Menu.ItemTrailing>
                        </Menu.LinkItem>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </div>
              <p className="showcase-status" aria-live="polite">
                {menuAction}
              </p>
            </div>
          </div>
        </section>

        <section
          className="specimen-section"
          aria-labelledby="disclosures-title"
        >
          <div className="section-heading">
            <div>
              <p>04</p>
              <h2 id="disclosures-title">Disclosures</h2>
            </div>
            <code>Collapsible</code>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Details in context</h3>
              <p>
                A disclosure explains its state without moving focus away from
                the decision that opened it.
              </p>
            </div>
            <Collapsible.Root className="showcase-collapsible">
              <Collapsible.Trigger className="showcase-collapsible-trigger">
                Deployment details
                <ChevronDown
                  aria-hidden="true"
                  className="showcase-collapsible-chevron"
                  size={14}
                  strokeWidth={1.5}
                />
              </Collapsible.Trigger>
              <Collapsible.Panel className="showcase-collapsible-panel">
                <p>
                  The release uses a verified artifact and retains native button
                  semantics.
                </p>
              </Collapsible.Panel>
            </Collapsible.Root>
          </div>
        </section>

        <section className="specimen-section" aria-labelledby="scroll-title">
          <div className="section-heading">
            <div>
              <p>05</p>
              <h2 id="scroll-title">Scroll areas</h2>
            </div>
            <code>ScrollArea</code>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Overflow in context</h3>
              <p>
                Edge fades explain position while the quiet scrollbar appears
                for pointer, keyboard, and active scrolling.
              </p>
            </div>
            <ScrollArea.Root
              className="showcase-scroll-area"
              data-testid="vertical-scroll-area"
            >
              <ScrollArea.Viewport
                className="showcase-scroll-area-viewport"
                data-testid="vertical-scroll-viewport"
                fade="block"
              >
                <ScrollArea.Content className="showcase-scroll-area-content">
                  {[
                    "Prepare release",
                    "Verify artifact",
                    "Publish package",
                    "Confirm provenance",
                    "Deploy consumer",
                    "Run smoke checks",
                    "Observe production",
                    "Record outcome",
                  ].map((step, index) => (
                    <a href={`#scroll-step-${index + 1}`} key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {step}
                    </a>
                  ))}
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar data-testid="vertical-scrollbar">
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>

          <div className="specimen-row">
            <div>
              <h3>Either axis</h3>
              <p>
                The same primitive supports wide content without changing its
                native scroll behaviour.
              </p>
            </div>
            <ScrollArea.Root
              className="showcase-scroll-area showcase-scroll-area--horizontal"
              data-testid="horizontal-scroll-area"
              direction="rtl"
            >
              <ScrollArea.Viewport
                className="showcase-scroll-area-viewport"
                data-testid="horizontal-scroll-viewport"
              >
                <ScrollArea.Content
                  className="showcase-scroll-area-strip"
                  dir="ltr"
                >
                  {[
                    "Node",
                    "Bun",
                    "Cloudflare Workers",
                    "React Router",
                    "Hono",
                  ].map((runtime) => (
                    <span key={runtime}>{runtime}</span>
                  ))}
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                data-testid="horizontal-scrollbar"
                orientation="horizontal"
              >
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
        </section>

        <section
          className="specimen-section token-section"
          id="tokens"
          aria-labelledby="tokens-title"
        >
          <div className="section-heading">
            <div>
              <p>06</p>
              <h2 id="tokens-title">Semantic base</h2>
            </div>
            <code>@astilba/tokens</code>
          </div>

          <dl className="token-list">
            <div>
              <dt>Canvas</dt>
              <dd>
                <span className="token-swatch token-swatch--canvas" />
                <code>colors.canvas</code>
              </dd>
            </div>
            <div>
              <dt>Ink</dt>
              <dd>
                <span className="token-swatch token-swatch--ink" />
                <code>colors.ink.default</code>
              </dd>
            </div>
            <div>
              <dt>Signal</dt>
              <dd>
                <span className="token-swatch token-swatch--signal" />
                <code>colors.signal</code>
              </dd>
            </div>
            <div>
              <dt>Control border</dt>
              <dd>
                <span className="token-swatch token-swatch--border" />
                <code>colors.border.control</code>
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="showcase-footer">
        <p>Private test harness · public packages</p>
        <p>Astilba interface foundation</p>
      </footer>
    </TooltipProvider>
  );
};
