import { socialLinks } from "../constants/constants";

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center">
      <div className="flex md:hidden items-center  justify-center space-x-10 pb-12 ">
        {socialLinks.map(({ icon: Icon, url }) => (
          <p
            onClick={() => window.open(url, "_blank")}
            key={url}
            className="text-xl cursor-pointer text-gray-500 hover:text-teal-300 duration-100"
          >
            <Icon />
          </p>
        ))}
      </div>
      <p className="text-xs pb-10 tracking-widest text-gray-400 poppins-regular">
        Designed & Built by Parth Pandey 
      </p>
    </footer>
  );
};

export default Footer;
