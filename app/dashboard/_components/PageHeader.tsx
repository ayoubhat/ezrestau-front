import React from "react";

const PageHeader = ({
  title,
  description,
}: {
  title: String;
  description: String;
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default PageHeader;
