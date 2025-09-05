import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const Footer = () => {
  const productLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Documentation', href: '#docs' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Status Page', href: '#status' }
  ];

  const companyLinks = [
    { name: 'About', href: '#about' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' }
  ];

  return (
    <footer className="footer-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src={syncSureLogo} 
                alt="SyncSure" 
                className="h-8 w-8 mr-3 filter brightness-0 invert"
              />
              <span className="text-xl font-semibold">
                SyncSure <span className="text-blue-400 font-normal">cloud</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional OneDrive monitoring for MSPs and businesses worldwide.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 SyncSure. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

