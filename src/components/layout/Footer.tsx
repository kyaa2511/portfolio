import { siteConfig, socialLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted">{siteConfig.role}</p>
        </div>

        <nav aria-label="Social and contact">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {socialLinks.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  item.href.startsWith("https://") ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link inline-flex min-h-11 items-center text-sm"
                    >
                      {item.label}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <a href={item.href} className="link inline-flex min-h-11 items-center text-sm">
                      {item.label}
                    </a>
                  )
                ) : (
                  <span className="inline-flex min-h-11 items-center gap-2 text-sm text-subtle">
                    {item.label}
                    <span className="font-mono text-[0.6875rem] uppercase tracking-wider">
                      Soon
                    </span>
                    <span className="sr-only">(link coming soon)</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="container-page py-6 font-mono text-xs text-subtle">
          &copy; {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
