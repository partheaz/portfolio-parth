const RightMail = () => {
  return (
    <div className="hidden fixed md:block right-16  -bottom-1 poppins-regular text-gray-400 rotate-90 origin-right">
      <div className="flex  items-center space-x-4">
        <a
          href="mailto:parthpandey678@gmail.com"
          className="hover:text-teal-300 text-[10px] tracking-[4px]"
        >
          parthpandey678@gmail.com
        </a>
        <div className="border-t w-20"></div>
      </div>
    </div>
  );
};

export default RightMail;
