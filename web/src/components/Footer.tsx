export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
        <div className="section py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-center">
                <p>&copy; {new Date().getFullYear()} TMS ESTATES. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="mailto:info@tmsestates.com" className="hover:text-gold transition-colors">info@tmsestates.com</a>
                    <a href="tel:+1234567890" className="hover:text-gold transition-colors">Phone: (123) 456-7890</a>
                </div>
            </div>
        </div>
    </footer>
  );
}