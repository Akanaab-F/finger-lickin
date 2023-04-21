const FooterCopyright = () => {
  return (
    <div className="grow w-full flex justify-center items-center text-white text-xl tablet:text-text-2xl text-center xs:mx-auto xs:text-center xs:w-[90%]">
      Copyright &copy; {new Date().getFullYear()}. All rights reserved. Made
      with love by Developers Zone Ltd.
    </div>
  );
};

export default FooterCopyright;
