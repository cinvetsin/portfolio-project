import Link from "next/link";
import { Github, Linkedin, Gitlab, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="mt-10 text-center">
      <h4 className="text-2xl font-bold text-blue-500 dark:text-blue-400 font-comingSoon">
        Feel free to contact me!
      </h4>
      <div className="mt-4 flex font-comingSoon font-bold justify-center space-x-4">
        {/* Email */}
        <Link
          href="mailto:sashanabilafortuna@gmail.com"
          className="flex items-center bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-black dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <Mail className="w-5 h-5" />
          <span className="ml-2">Email</span>
        </Link>

        {/* LinkedIn */}
        <Link
          href="https://linkedin.com/in/sasha-nabila-fortuna"
          className="flex items-center bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-black dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <Linkedin className="w-5 h-5" />
          <span className="ml-2">LinkedIn</span>
        </Link>

        {/* GitHub */}
        <Link
          href="https://github.com/cinvetsin"
          className="flex items-center bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-black dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <Github className="w-5 h-5" />
          <span className="ml-2">GitHub</span>
        </Link>

        {/* GitLab */}
        <Link
          href="https://gitlab.cs.ui.ac.id/sasha.nabila"
          className="flex items-center bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-black dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <Gitlab className="w-5 h-5" />
          <span className="ml-2">GitLab</span>
        </Link>
      </div>
    </section>
  );
}