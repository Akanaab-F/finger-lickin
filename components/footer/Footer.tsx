
import FooterContact from "./FooterContact";
import FooterCopyright from "./FooterCopyright";

const Footer = () => {
  return (
    <footer className="w-full py-5 bg-primary500 h-auto flex flex-col justify-center md:mb-32 gap-y-5">
      <FooterContact />
      <FooterCopyright />
    </footer>
  );
};

export default Footer;
