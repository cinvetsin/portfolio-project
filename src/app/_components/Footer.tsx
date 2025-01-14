import Link from "next/link";
import { Github, Linkedin, Gitlab, Mail } from "lucide-react";

export default function Footer() {
  return (
    <div className="mt-4 w-full">
      <footer className="w-full bg-gray-100 py-6 dark:bg-gray-800">
        {/* Full-width black marker */}
        <div className="w-full h-1 bg-black dark:bg-white"></div>

        {/* Footer text */}
        <h4 className="text-lg mt-4 font-bold font-comingSoon text-gray-600 dark:text-gray-300 text-center">
          © 2025 Sasha Nabila Fortuna. All Rights Reserved.
        </h4>

        {/* Social media icons */}
        <div className="mt-4 flex flex-wrap justify-center space-x-6">
          {/* Email */}
          <Link href="mailto:sashanabilafortuna@gmail.com">
            <Mail className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-500" />
          </Link>

          {/* LinkedIn */}
          <Link href="https://linkedin.com/in/sasha-nabila-fortuna">
            <Linkedin className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-500" />
          </Link>

          {/* GitHub */}
          <Link href="https://github.com/cinvetsin">
            <Github className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-500" />
          </Link>

          {/* GitLab */}
          <Link href="https://gitlab.cs.ui.ac.id/sasha.nabila">
            <Gitlab className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-500" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
