
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Cuidamet</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-500 hover:text-teal-500">About Us</a></li>
              <li><a href="#" className="text-slate-500 hover:text-teal-500">Careers</a></li>
              <li><a href="#" className="text-slate-500 hover:text-teal-500">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-500 hover:text-teal-500">Help Center</a></li>
              <li><a href="#" className="text-slate-500 hover:text-teal-500">Trust & Safety</a></li>
              <li><a href="#" className="text-slate-500 hover:text-teal-500">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-500 hover:text-teal-500">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 hover:text-teal-500">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Follow Us</h3>
             <div className="flex justify-center md:justify-start space-x-4">
               {/* Placeholder for social icons */}
              <a href="#" className="text-slate-500 hover:text-teal-500">FB</a>
              <a href="#" className="text-slate-500 hover:text-teal-500">IG</a>
              <a href="#" className="text-slate-500 hover:text-teal-500">TW</a>
            </div>
          </div>
        </div>
        <div className="text-center text-slate-500 border-t border-slate-200 mt-8 pt-6">
          <p>&copy; {new Date().getFullYear()} Cuidamet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
