const SectionLayout = ({
  title,
  description,
  children,
  bgColor,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  bgColor?: string;
}) => {
  return (
    <section
      className={`flex flex-col justify-center items-center p-2 sm:p-6 w-full ${bgColor}`}
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
          {title}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          {description}
        </p>
      </div>
      <div className="w-full max-w-6xl">{children}</div>
    </section>
  );
};

export default SectionLayout;
