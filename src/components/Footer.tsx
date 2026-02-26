const Footer = () => {
  return (
    <footer className="bg-surface-dark border-t border-white/10 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-extrabold text-surface-dark-foreground">
              KUDO <span className="text-primary">UZ</span>
            </span>
            <p className="text-sm text-surface-dark-foreground/60 mt-1">
              Avtomobil ehtiyot qismlari va avtokimyo
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="tel:+998997364444"
              className="text-sm text-surface-dark-foreground hover:text-primary transition-colors"
            >
              +998 99 736-44-44
            </a>
            <a
              href="https://t.me/kudouz_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-surface-dark-foreground hover:text-primary transition-colors"
            >
              Telegram
            </a>
            <a
              href="https://www.instagram.com/kudo.uzbekistan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-surface-dark-foreground hover:text-primary transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-surface-dark-foreground/50">
            © {new Date().getFullYear()} KUDO Uzbekistan. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
